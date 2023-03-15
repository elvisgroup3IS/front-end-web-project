const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    if(validateInputs()){
        var user=localStorage.getItem(email.value);
        var data=JSON.parse(user);
        var json=JSON.stringify(data);
        localStorage.setItem(email.value,json);
        sessionStorage.setItem("is_active",email.value);
        // пренасочвам към основната страница
        window.location="../catalog/catalog.html";
    }
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
};

const isValidEmailfunc = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    // trim премахва спейсовете от двете страни
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    var isValidEmail=null;
    var isValidPassword=null;
    var user=localStorage.getItem(email.value);
    var data=JSON.parse(user);

    if(emailValue === '') {
        setError(email, 'Email is required!');
    } else if (!isValidEmailfunc(emailValue)) {
        setError(email, 'Provide a valid email address!');
        isValidEmail=false;
        // проверка дали има такъв потребител
    } else if (user==null){
        setError(email, 'Wrong email!');
        isValidEmail=false;
    } else {
        setSuccess(email);
        isValidEmail=true;
    }

    if(passwordValue === '') {
        setError(password, 'Password is required!');
        isValidPassword=false;
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character!');
        isValidPassword=false;
        // проверка дали паролата е същата
    } else if(data.password != passwordValue){
        setError(password, 'Wrong password!');
        isValidPassword=false;
    }else {
        setSuccess(password);
        isValidPassword=true;
    }

    if(isValidPassword && isValidEmail){
        return true;
    }else{
        return false;
    }
};



