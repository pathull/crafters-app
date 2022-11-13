const urlBase = 'http://localhost:8080';

export const createNewOrder = async (idUser, idPost) => {
  try {
    const result = await fetch(`${urlBase}/orders/create-order/user/${idUser}/post/${idPost}`, {
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
