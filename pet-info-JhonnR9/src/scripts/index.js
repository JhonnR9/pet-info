import { loginRequest } from "./requests.js"
import { toast } from "./toast.js"
import { localStorageKeys, LOGIN_ERRORS, LOG_TYPES } from "./contantes.js";1

const handleRedirect = () => {
    if(localStorage.getItem(localStorageKeys.token)){
      location.replace('./src/pages/feed.html');
    }
}

const showLoginError =  error => {
    const wongEmailFeadback = document.querySelector('#wrong-email');
    const wongPasswordFeadback = document.querySelector('#wrong-password');

    if(error.message === LOGIN_ERRORS.EMAIL || error.message === LOGIN_ERRORS.EMPTY_EMAIL){
        wongEmailFeadback.innerText = error.message;
        wongEmailFeadback.classList.remove('hidden');

    } else if(error.message === LOGIN_ERRORS.PASSWORD || error.message === LOGIN_ERRORS.EMPTY_PASSWORD) {
        wongPasswordFeadback.innerText = error.message;
        wongPasswordFeadback.classList.remove('hidden');

    } 

    toast(error.message, LOG_TYPES.ERROR);
}

const hiddenMessageError = () => {
    const wongEmailFeadback = document.querySelector('#wrong-email');
    const wongPasswordFeadback = document.querySelector('#wrong-password');

    wongEmailFeadback.classList.add('hidden');
    wongPasswordFeadback.classList.add('hidden');


}


const handleLogin = () => {
    const buttonLogin = document.querySelector('#login__submit');
   
    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault();

        const inputs = document.querySelector('.form__container').querySelectorAll('input');
        let inputEmpty;
        const requestBody = {};

        inputs.forEach(input => {
            if(input.required && input.value === '') inputEmpty = input.name;

            requestBody[input.name] = input.value;

            input.addEventListener ('focus', () => {
                hiddenMessageError();
            });

        });

        if(!inputEmpty){
            try {
                const reponse = await loginRequest(requestBody);
                location.replace('./src/pages/feed.html');
            } catch (error) {
               showLoginError(error);

            }
            
        } else {
            if(inputEmpty === 'email'){
                showLoginError(new Error(LOGIN_ERRORS.EMPTY_EMAIL));
            }else {
                showLoginError(new Error(LOGIN_ERRORS.EMPTY_PASSWORD));
            }
        }
       
    });
        
}

const handleRegisterButton = () => {
    const registerButton = document.querySelector('#register__button');

    registerButton.addEventListener('click', e => {
        e.preventDefault();

        location.replace('./src/pages/register.html');

    })

}

handleRedirect();
handleLogin();
handleRegisterButton();