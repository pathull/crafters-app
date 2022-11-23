import { env } from '../helpers/env';

export const createNewComment = async (newComment:{idPost: number, idUser: number, comment:string}) => {
  try {
    if (newComment) {
      const data = await fetch(`${env.urlBase}/comments`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      const res = await data.json();
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getCommentsByPost = async (id: string | number | undefined) => {
  try {
    if (!isNaN(Number(id))) {
      const allComments = await fetch(`${env.urlBase}/comments/${id}`, {
        method: 'GET',
        mode: 'cors',
      });

      return await allComments.json();
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (idComment:number) => {
  try {
    if (!isNaN(Number(idComment))) {
      const data = await fetch(`${env.urlBase}/comments/delete/${idComment}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      return await data.json();
    }
  } catch (err) {
    console.error(err);
  }
};
