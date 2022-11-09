import axios from 'axios';

const urlBase = 'http://localhost:8080';

export const retrievePosts = async email => {
  try {
    if (!email) return;

    const data = await fetch(`${urlBase}/posts/${email}`);
    const posts = await data.json();

    return posts;
  } catch (err) {
    console.error(err);
  }
};

export const createNewPost = async post => {
  try {
    if (post) {
      const fd = new FormData();
      for (const name in post) {
        fd.append(name, post[name]);
      }

      const data = await fetch(`${urlBase}/posts`, {
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

export const retrieveUser = async userEmail => {
  try {
    if (!userEmail) return;
    const data = await fetch(`${urlBase}/user/${userEmail}`);
    const newUser = await data.json();

    return newUser;
  } catch (err) {
    console.error(err);
  }
};

export const storeUser = async body => {
  try {
    const data = await fetch(`${urlBase}/user`, {
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

export const updateUserInfo = async (id, info) => {
  try {
    if (!id) return;

    if (info) {
      const formData = new FormData();
      for (const name in info) {
        formData.append(name, info[name]);
      }

      const data = await axios.put(`${urlBase}/user/${id}`, formData);

      const userUpdated = data.data;
      return userUpdated;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSinglePostData = async id => {
  try {
    if (!id) return;

    const singlePost = await axios.get(`${urlBase}/posts/single-post/${id}`);

    if (singlePost.status === 200) return singlePost.data;
    else return null;
  } catch (err) {
    console.error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const data = await fetch(`${urlBase}/listPosts`);

    const allPosts = await data.json();

    if (allPosts.length) return allPosts;
    else return null;
  } catch (err) {
    console.error(err);
  }
};
