import { env } from '../helpers/env';

export const createNewOrder = async (
  /** @type {string | null} */ idUser: string | null,
  /** @type {string | null} */ idPost: string | null
) => {
  try {
    const result = await fetch(`${env.urlBase}/orders/create-order/user/${idUser}/post/${idPost}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return await result.json();
  } catch (err) {
    console.error(err);
  }
};
