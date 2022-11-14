import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { BallTriangle } from 'react-loader-spinner';

import './NewPost.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

import { createNewPost } from '../../services/fetchData';

export const NewPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState(0);
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleInputNumberChange = e => {
    if (e.target.value >= 0) {
      if (/^\d*\.?\d{0,2}$/.test(e.target.value)) setPrice(e.target.value);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    setToggleBtn(true);

    if (title !== '' && image) {
      const post = {
        userEmail: user.email,
        title,
        price,
        description,
        postPicture: image[0].file,
      };

      const res = await createNewPost(post);
      setTitle('');
      setDescription('');
      setImage(null);
      setPrice(0);

      if (res.id) {
        navigate('/profile');
      } else {
        setToggleBtn(true);
      }
    }
  };

  if (toggleBtn) {
    return (
      <section className="createNewPost__container">
        <div className="h-screen flex justify-center items-center">
          <BallTriangle
            height={200}
            width={200}
            radius={5}
            color="#002244"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="createNewPost__container">
      <div className="formContainer">
        <div className="p-7 formContainer__div">
          <form className="formContainer__details" onSubmit={submitHandler}>
            <div className="formContainer__title">
              <input
                className="formTitle__input focus:ring-0"
                required
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
            <div className="formContainer__title">
              <input
                className="formTitle__input focus:ring-0"
                type="number"
                min="0"
                step="0.01"
                id="priceInput"
                name="price"
                onChange={handleInputNumberChange}
                value={price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                placeholder=" "
                pattern="^\d*\.?\d{0,2}$"
              />
              <label className="formTitle__label" htmlFor="priceInput">
                Price
              </label>
            </div>
            {/* <div className="formContainer__image">
              <label htmlFor="postPicture">Image</label>
              <input
                type="file"
                name="postPicture"
                id="postPicture"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
              />
            </div> */}
            <div className="formContainer__image">
              <FilePond
                files={image}
                allowReorder={true}
                allowMultiple={false}
                onupdatefiles={setImage}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                labelIdle="Drag & Drop your files or <span class=filepond--label-action>Browse</span>"
              />
            </div>
            <div className="formContainer__btn">
              <button
                className={`submitButton__newPost ${!title || !image.length || toggleBtn ? 'cursor-no-drop' : ''}`}
                type="submit"
                disabled={!title || !image.length}
              >
                Create New Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
