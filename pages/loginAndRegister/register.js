
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('repassword');

form.addEventListener('submit', e => {
    e.preventDefault();

    if(validateInputs()){

        var user={
            email:email.value,
            password:password.value,
        };

        var json=JSON.stringify(user);
        localStorage.setItem(email.value,json);
        console.log("user-added");
        window.location="login.html";
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
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    var isValidEmail=null;
    var isValidPassword=null;
    var isValidPassword2=null;

    var user=localStorage.getItem(email.value);

    if(emailValue === '') {
        setError(email, 'Email is required!');
    } else if (!isValidEmailfunc(emailValue)) {
        setError(email, 'Provide a valid email address!');
        isValidEmail=false;
    } else if (user!=null){
        // проверка дали има такъв имейл
        setError(email, 'Email is already exist!');
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
    } else {
        setSuccess(password);
        isValidPassword=true;
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password!');
        isValidPassword2=false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match!");
        isValidPassword2=false;
    } else {
        setSuccess(password2);
        isValidPassword2=true;
    }

    if(isValidPassword && isValidEmail && isValidPassword2){
        return true;
    }else{
        return false;
    }
};


// function signup(e){
// event.preventDefault();
// // console.log("working");
// var email=document.getElementById("email").value;
// var password=document.getElementById("password").value;

// var user={
//     email:email,
//     password:password
// };

// var json=JSON.stringify(user);
// localStorage.setItem(email,json);
// console.log("user-added");
// }

