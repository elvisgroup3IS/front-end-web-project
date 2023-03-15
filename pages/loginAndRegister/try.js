const app = {
    init: () => {
        document.addEventListener('DOMContentLoaded', app.load);
        console.log('HTML loaded');
    },
    load: () => {
        app.getData();
    },
    // showLoading: () => {
    //     let ul = document.querySelector('.list');
    //     let li = document.createElement('li');
    //     li.textContent = 'Loading...';
    //     li.className = 'loading-list';
    //     ul.appendChild(li);
    // },
    getData: () => {
        //based on the current page...
        let page = document.body.id;
        switch (page) {
            case 'login':
                if(app.validateLogin()){
                    window.location="../catalog/catalog.html";
                }
                //  window.location="../catalog/catalog.html";
                // app.setLoginDesable();
                break;
            case 'index':
                // app.getUsers();
                // window.location="../catalog/catalog.html";
                break;
        }
    },
    validateLogin: () => {
    const form = document.querySelector('#form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', e => {
        e.preventDefault();
        if(validateInputs()){
            return true;
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
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmailfunc = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
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
        } else if (user==null){
            setError(email, 'Wrong email!');
            isValidEmail=false;
        } else {
            setSuccess(email);
            isValidEmail=true;
        }
        console.log(user.password);

        if(passwordValue === '') {
            setError(password, 'Password is required!');
            isValidPassword=false;
        } else if (passwordValue.length < 8 ) {
            setError(password, 'Password must be at least 8 character!');
            isValidPassword=false;
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
        },
        afterValidate: () => {
        },
    }
app.init();