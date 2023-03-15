const form = document.getElementById('comentForm');
const bookTitle=document.title;
const postGrade=document.getElementById('postGrade');
const loadComents = () => {
    var book=localStorage.getItem(bookTitle);
    if(!book){
        postGrade.style.display="none";
        return;
    }
    var data=JSON.parse(book);
    var averageGrade=0;
    var count=0;
    //проверка дали книгата е оценявана
    if(data.grade){
            data.grade.forEach(element => {
            averageGrade+=Number(element);
            count++;
        });    
        averageGrade=averageGrade/count;
        postGrade.innerHTML="Product grade is:"+averageGrade.toString();
        data.averageGrade=averageGrade;
    }else{
        postGrade.innerHTML="Product grade is:0";
        data.averageGrade=0;    
    }
    var json=JSON.stringify(data);
    localStorage.setItem(bookTitle,json);
    var email=sessionStorage.getItem("is_active");
    // проверка дали потребителя е писал коментар на съответния продукт
    if(email){
        email=email.split("@");
        const nickName=email[0];
        console.log(nickName);
        data.comentPack.forEach(element =>{
            if(element.name === nickName){
                form.style.display="none";
            }
        });
    }
    // Показване на коментарите на книгата
    var output = "";
    data.comentPack.forEach(element => {
        output += `
        <li id=coment>
            <h3>${element.name} : ${element.date.slice(0,25)}</h3>
            <p>${element.coment}</p>
        </li>
        `;
    });
    document.querySelector("#listComents").innerHTML = output;
};


loadComents();


form.addEventListener('submit', e => {
    e.preventDefault();
    var bookGrade = document.getElementById("grade").value;
    var coment=document.getElementById("comment");
    var email=sessionStorage.getItem("is_active");
    // проверка дали потребителя е логнат
    if(!email){
        setError(coment,"Only logged users can write comments!");
        return;
    }else if(!coment.value){
        setError(coment,"Empty coment is not allowed!");
        return;
    }
    email=email.split("@");
    var nickName=email[0];
    var book=localStorage.getItem(bookTitle);
    const d = new Date();
    let text = d.toString();
    var comentPackage={
        coment:coment.value,
        name:nickName,
        date:text
    };
    // проверка дали книгата има коментари
    // ако няма записвам в базата дании обект с атрибути заглавието на книгата ,  масив от обекти с атрибути: 
    // името на протребителя , коментара и дата на създаване на коментара , и масив с оценката
    if(book==null){
        var book={
            title:bookTitle,
            comentPack:
            [
                {
                coment:coment.value,
                name:nickName,
                date:text
                }
            ],
            grade:
            [
                bookGrade
            ]
        };
        var json=JSON.stringify(book);
        localStorage.setItem(bookTitle,json);
    } else{
        // ако има коментари просто добавям  обекта comentPackage в масива на обекта  и добавям оценката в масива с оценки
        var data=JSON.parse(book);
        data.comentPack.push(comentPackage);
        if(bookGrade!="0"){
            data.grade.push(bookGrade);
        }
        var json=JSON.stringify(data);
        localStorage.setItem(bookTitle,json);
    }
    loadComents();
    form.style.display="none";
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
}

