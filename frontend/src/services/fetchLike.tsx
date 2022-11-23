import { env } from '../helpers/env';

export const getSingleLike = async (/** @type {number} */ idUser: number, /** @type {any} */ idPost: any) => {
  try {
    const data = await fetch(`${env.urlBase}/likes/user/${idUser}/post/${idPost}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};

export const addLikeToPost = async (
  /** @type {{ idPost: any; idUser: number; }} */ body: { idPost: any; idUser: number }
) => {
  try {
    const data = await fetch(`${env.urlBase}/likes`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteLike = async (/** @type {any} */ id: any) => {
  try {
    const res = await fetch(`${env.urlBase}/likes/delete/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
