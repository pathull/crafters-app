const urlBase = 'http://localhost:8080';

export const createNewComment = async newComment => {
  try {
    if (newComment) {
      const data = await fetch(`${urlBase}/comments`, {
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

export const getCommentsByPost = async id => {
  try {
    if (!isNaN(Number(id))) {
      const allComments = await fetch(`${urlBase}/comments/${id}`, {
        method: 'GET',
        mode: 'cors',
      });

      return await allComments.json();
    }
  } catch (err) {
    console.error(err);
  }
};
