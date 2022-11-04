import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './NewPost.css';

import { createNewPost } from '../../services/fetchData';

export const NewPost = () => {
  const { user } = useAuth0();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    if (title !== '' && image) {
      const post = {
        userEmail: user.email,
        title,
        description,
        postPicture: image,
      };

      createNewPost(post);
      setTitle('');
      setDescription('');
      setImage(null);
    }
  };

  return (
    <section className="createNewPost__container">
      <div className="formContainer">
        <div className="p-7 formContainer__div">
          <form className="formContainer__details" onSubmit={submitHandler}>
            <div className="formContainer__title">
              <input
                className="formTitle__input focus:ring-0"
                type="text"
                name="title"
                id="titlePost"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder=" "
              />
              <label className="formTitle__label" htmlFor="titlePost">
                Title
              </label>
            </div>
            <div className="formContainer__title">
              <input
                className="formTitle__input focus:ring-0"
                type="text"
                name="description"
                id="descriptionPost"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder=" "
              />
              <label className="formTitle__label" htmlFor="descriptionPost">
                Description
              </label>
            </div>
            <div className="formContainer__image">
              <label htmlFor="postPicture">Image</label>
              <input
                type="file"
                name="postPicture"
                id="postPicture"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
            <div className="formContainer__btn">
              <button className="submitButton__newPost" type="submit">
                Create New Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
