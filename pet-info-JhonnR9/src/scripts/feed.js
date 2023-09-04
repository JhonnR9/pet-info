import { renderAllPosts } from "./render.js";
import { getCurrentUserInfo, createNewPostRequest } from "./requests.js";
import { localStorageKeys, LOG_TYPES } from "./contantes.js";
import { toast } from "./toast.js";

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });
}

function main() {
  handleRedirect();
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  renderAllPosts();
  addUserUniquename();
  addNewPostButtonEvent();
  addCloseModalEvent();
  addLogoutEvent();
  createNewPost();


}

const addUserUniquename = async () => {
  const userUniquenameElement = document.querySelector('.user__uniquename');
  const currentUserInfo = await getCurrentUserInfo();

  userUniquenameElement.innerText = currentUserInfo.username;
}

const addNewPostButtonEvent = () => {
  const userNewPostButton = document.querySelector('#user__newpost');
  const modal = document.querySelector('#new-post-creator__modal');
  userNewPostButton.addEventListener('click', (e) => {
    e.preventDefault();
      modal.showModal();
  });
}

const addCloseModalEvent = () => {
  const buttonCloseModal = document.querySelector('#close-modal__creator');
  const modal = document.querySelector('#new-post-creator__modal');

  buttonCloseModal.addEventListener('click', e => {
    e.preventDefault();
    modal.close();
  });

  const buttonCancel = document.querySelector('#button__cancel');

  buttonCancel.addEventListener('click', (e) => {
    e.preventDefault();

    const postTitle = document.querySelector('#post__title');
    const postDiscription = document.querySelector('#post__content');

    postTitle.value = "";
    postDiscription.value = "";
    
    const modal = document.querySelector('#new-post-creator__modal');
    modal.close();
  });
}

const addLogoutEvent = () => {
  const loguotButton = document.querySelector('.logout__button');

  loguotButton.addEventListener('click', e => {
    localStorage.removeItem(localStorageKeys.token);

    location.replace('../../index.html');
  })
}

const handleRedirect = () => {
  if(!localStorage.getItem(localStorageKeys.token)){
    location.replace('../../index.html');
  }
}

const showPostError = (error) => {
  const errorFeadback = document.querySelector('#new-post-creator__error-feadback');

  errorFeadback.classList.remove('hidden');
  errorFeadback.classList.add('show');
  errorFeadback.innerText = error.message;
}

const createNewPost = () => {
  const buttonCreatePost = document.querySelector('#button__publish');

  buttonCreatePost.addEventListener('click', e =>{
    e.preventDefault();

    const postTitle = document.querySelector('#post__title');
    const postDiscription = document.querySelector('#post__content');

    const requestBody = {title: postTitle.value, content: postDiscription.value};

    if(postTitle.value != "" && postDiscription.value != ""){
      try {
        createNewPostRequest(requestBody);
        toast("Post creado com sucesso", LOG_TYPES.WARNING);

        postTitle.value = "";
        postDiscription.value = "";

        const modal = document.querySelector('#new-post-creator__modal');
        modal.close()
      }
      catch(error){
        showPostError(error);

      }
    }
    else {
      showPostError(new Error('Voce deve preencher todos os campos'))
    }

  });
}



main();

