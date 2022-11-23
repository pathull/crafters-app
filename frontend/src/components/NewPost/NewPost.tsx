import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { BallTriangle } from 'react-loader-spinner';
import { motion } from 'framer-motion';

import './NewPost.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

import { createNewPost } from '../../services/fetchData';

const initialPostState = {
  title: '',
  description: '',
  price: 0,
};

export const NewPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth0<any>();
  const [state, setState] = useState<any>(initialPostState);
  const [image, setImage] = useState<any>([]);
  const [toggleBtn, setToggleBtn] = useState<any>(false);

  const handleInputNumberChange = (e: any) => {
    if (e.target.value >= 0) {
      if (/^\d*\.?\d{0,2}$/.test(e.target.value)) setState({ ...state, price: e.target.value });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setToggleBtn(true);

    if (state.title !== '' && image) {
      const post = {
        userEmail: user.email,
        ...state,
        postPicture: image[0].file,
      };

      const res = await createNewPost(post);
      setState(initialPostState);
      setImage(null);

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
          <motion.div className="cursor-grabbing" drag dragConstraints={{ top: -70, left: -70, right: 70, bottom: 70 }}>
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="#002244"
              ariaLabel="ball-triangle-loading"
              visible={true}
            />
          </motion.div>
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
                value={state.title}
                onChange={handleChange}
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
                value={state.description}
                onChange={handleChange}
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
                value={state.price.toLocaleString('en-US', {
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
            <motion.div className="formContainer__btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <button
                className={`submitButton__newPost ${
                  !state.title || !image.length || toggleBtn ? 'cursor-no-drop' : ''
                }`}
                type="submit"
                disabled={!state.title || !image.length}
              >
                Create New Post
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
};
