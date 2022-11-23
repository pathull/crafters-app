import { env } from '../helpers/env';

export const getSingleWish = async (/** @type {number} */ idUser: number, /** @type {number} */ idPost: number) => {
  try {
    const data = await fetch(`${env.urlBase}/wishlist/user/${idUser}/post/${idPost}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};

export const addPostToWishList = async (
  /** @type {{ idUser: number; idPost: 0; }} */ body: { idUser: number; idPost: number }
) => {
  try {
    const data = await fetch(`${env.urlBase}/wishlist`, {
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

export const deleteWish = async (/** @type {number | undefined} */ id: number | undefined) => {
  try {
    const res = await fetch(`${env.urlBase}/wishlist/delete/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getListWishListByUser = async (/** @type {number} */ idUser: number) => {
  try {
    const data = await fetch(`${env.urlBase}/wishlist/${idUser}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};

export const getNumberOfFavs = async (/** @type {number} */ idUser: number) => {
  try {
    const data = await fetch(`${env.urlBase}/wishlist/number-favs/${idUser}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};
