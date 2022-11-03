import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

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
    <div className="p-7">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="titlePost">Title</label>
          <input type="text" name="title" id="titlePost" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descriptionPost">Description</label>
          <input
            type="text"
            name="description"
            id="descriptionPost"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postPicture">Image</label>
          <input
            type="file"
            name="postPicture"
            id="postPicture"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <button type="submit">Create New Post</button>
        </div>
      </form>
    </div>
  );
};
