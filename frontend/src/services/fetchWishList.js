const urlBase = 'http://localhost:8080';

export const getSingleWish = async (idUser, idPost) => {
  try {
    const data = await fetch(`${urlBase}/wishlist/user/${idUser}/post/${idPost}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};

export const addPostToWishList = async body => {
  try {
    const data = await fetch(`${urlBase}/wishlist`, {
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

export const deleteWish = async id => {
  try {
    const res = await fetch(`${urlBase}/wishlist/delete/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getListWishListByUser = async idUser => {
  try {
    const data = await fetch(`${urlBase}/wishlist/${idUser}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await data.json();
  } catch (err) {
    console.error(err);
  }
};
