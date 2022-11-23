import axios from 'axios';

import { env } from '../helpers/env';
import { postData, postDetails } from '../types/Post';
import { user } from '../types/User';

export const retrievePosts = async (email:string) => {
  try {
    if (!email) return;

    const data = await fetch(`${env.urlBase}/posts/${email}`, {
      method: 'GET',
      mode: 'cors',
    });
    const posts = await data.json();

    return posts;
  } catch (err) {
    console.error(err);
  }
};

export const createNewPost = async (post: {
  postPicture: any;
  title: string;
  description: string;
  price: number;
  userEmail: string | undefined;
}) => {
  try {
    if (post) {
      const fd = new FormData();
      for (const name in post) {
        fd.append(name, post[name]);
      }

      const data = await fetch(`${env.urlBase}/posts`, {
        method: 'POST',
        body: fd,
      });

      const resp = await data.json();
      return resp;
    }
  } catch (err) {
    console.error(err);
  }
};

export const retrieveUser = async (userEmail: string | undefined) => {
  try {
    if (!userEmail) return;
    const data = await fetch(`${env.urlBase}/user/${userEmail}`, {
      method: 'GET',
      mode: 'cors',
    });
    const newUser = await data.json();

    return newUser;
  } catch (err) {
    console.error(err);
  }
};

export const storeUser = async (body:user) => {
  try {
    const data = await fetch(`${env.urlBase}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const res = await data.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const updateUserInfo = async (id: number, info: { [x: string]: string | Blob; }) => {
  try {
    if (!id) return;

    if (info) {
      const formData = new FormData();
      for (const name in info) {
        formData.append(name, info[name]);
      }

      const data = await axios.put(`${env.urlBase}/user/${id}`, formData);

      const userUpdated = data.data;
      return userUpdated;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSinglePostData = async (id: string | undefined) => {
  try {
    if (!id) return;

    const singlePost = await axios.get(`${env.urlBase}/posts/single-post/${id}`, {
      method: 'GET',
      //@ts-ignore
      mode: 'cors',
    });

    if (singlePost.status === 200) return singlePost.data;
    else return null;
  } catch (err) {
    console.error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const data = await fetch(`${env.urlBase}/listPosts`, {
      method: 'GET',
      mode: 'cors',
    });

    const allPosts = await data.json();

    return allPosts;
  } catch (err) {
    console.error(err);
  }
};

export const deleteSinglePost = async (idPost: number) => {
  try {
    if (!isNaN(Number(idPost))) {
      const data = await fetch(`${env.urlBase}/posts/delete-post/${idPost}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      return await data.json();
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateStateOfPost = async (idPost:string) => {
  try {
    if (!isNaN(Number(idPost))) {
      const data = await fetch(`${env.urlBase}/posts/update-post/${idPost}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sold: true }),
      });

      return await data.json();
    }
  } catch (err) {
    console.error(err);
  }
};
