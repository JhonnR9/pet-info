import { toast } from "./toast.js";
import { registerRequest } from "./requests.js";
import { LOG_TYPES } from "./contantes.js";

const handleRedirectButton = () => {
    const redirectButton = document.querySelector('#redirect__button');

    redirectButton.addEventListener('click', e => {
        e.preventDefault();

        location.replace('../../index.html');

    });

}

const showRegisterError = (error) => {
    toast(error.message, LOG_TYPES.ERROR);
}

const handleRegister = () => {
    const registerForm = document.querySelector('.form__container');
    const inputs = registerForm.querySelectorAll('input');
    const registerButton = registerForm.querySelector('#register__submit');

    registerButton.addEventListener('click', async event => {
    event.preventDefault();

    const requestBody = {};
    let emptyInput;

    inputs.forEach( input => {
        requestBody[input.name] = input.value;

        if(input.required && input.value === '') emptyInput = input.name;
    });


    if(!emptyInput){
        try {
            const response = await registerRequest(requestBody);
            toast('conta criada com sucesso', LOG_TYPES.WARNING);
            inputs.forEach( input => {
                input.value = '';
    
            });
        
        }
        catch (error){
            showRegisterError(error);
        }
      
    } else {
        showRegisterError(new Error(`O campo de ${emptyInput} deve ser preenchido`));
    }
   });
}

handleRedirectButton();
handleRegister();