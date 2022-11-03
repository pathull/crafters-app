const urlBase = 'http://localhost:8080';

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
      console.log(resp);
    }
  } catch (err) {
    console.error(err);
  }
};
