import { localStorageKeys } from "./contantes.js";

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Desenvolva as funcionalidades de requisições aqui

export const getPostById = async (postId) =>{
  const requestOptions = {
    method: 'POST',
    headers: requestHeaders,
  
  }
  const request = await fetch(`${baseUrl}/posts/${postId}`, requestOptions )
  .then(async res => {
    const resConverted = await res.json();

    if(res.ok){
      return resConverted;

    }
    else{
      throw new Error(resConverted.message);
    }

  })
  .catch(err => {
    throw new Error(err.message);
  });
}

export const loginRequest = async (requestBody) => {
  const completeUrl = `${baseUrl}/login`;
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
  
    },
    body: JSON.stringify(requestBody)
    
  }

  const request = await fetch (completeUrl, requestOptions).then(async res => {
    const resConverted = await res.json();

    if(res.ok){
      localStorage.setItem(localStorageKeys.token, resConverted.token);

    }else {
      throw new Error(resConverted.message);
    }

    return resConverted;

  }).catch(err => {
    throw new Error(err.message);

  });

}

export const registerRequest = async (requestBody) => {
  const completeUrl = `${baseUrl}/users/create`;
  const requestOptions = {
    method: 'Post',
    headers: { 
      'Content-Type': 'application/json',
  
    },
    body: JSON.stringify(requestBody)
    
  }

  const request = await fetch (completeUrl, requestOptions).then(async res => {
    const resConverted = await res.json();

    if(res.ok){
     return resConverted;

    } else{
      throw new Error(resConverted.message);
    }
  }).catch(err => {
    throw new Error(err.message);

  });
}

export const createNewPostRequest = async (requestBody) => {
  const completeUrl = `${baseUrl}/posts/create`;
  const requestOptions = {
    method: 'Post',
    headers: requestHeaders,
    body: JSON.stringify(requestBody)
    
  }

  const request = await fetch (completeUrl, requestOptions).then(async res => {
    const resConverted = await res.json();

    if(res.ok){
     return resConverted;

    } else{
      throw new Error(resConverted.message);
    }
  }).catch(err => {
    throw new Error(err.message);

  });
}

