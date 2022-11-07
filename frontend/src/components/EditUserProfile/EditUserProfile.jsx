import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './EditUserProfile.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { UserContext } from '../../context/UserContext';
import { updateUserInfo } from '../../services/fetchData';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export const EditUserProfile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState([]);

  useEffect(() => {
    if (!userData) {
      navigate('/profile');
    } else {
      setName(userData.name);
      setBio(userData.bio);
      setUsername(userData.username);
    }
  }, [navigate, userData]);

  const handleSubmit = async e => {
    e.preventDefault();

    const userUpdate = {
      username,
      name,
      bio,
    };

    if (picture.length) {
      userUpdate.userPic = picture[0].file;
    } else {
      userUpdate.userPic = '';
    }

    const info = await updateUserInfo(userData.id, userUpdate);
    setName('');
    setUsername('');
    setBio('');
    setPicture([]);

    if (!info.code) {
      setUserData(info);
      navigate('/profile');
    } else {
      console.log('Error in the operation');
    }
  };

  return (
    <section className="profileSection">
      {userData ? (
        <div className="profileContainer">
          <div className="p-7 formContainer__div">
            <form className="formContainer__details" onSubmit={handleSubmit}>
              <div className="fileInput__filepond">
                <FilePond
                  files={picture}
                  allowReorder={true}
                  allowMultiple={false}
                  onupdatefiles={setPicture}
                  allowFileTypeValidation={true}
                  acceptedFileTypes={['image/*']}
                />
              </div>
              <div className="formContainer__title">
                <input
                  className="formTitle__input focus:ring-0 cursor-not-allowed"
                  type="text"
                  name="email"
                  id="emailInput"
                  placeholder=" "
                  value={userData ? userData.email : ''}
                  disabled
                />
                <label className="formTitle__label" htmlFor="emailInput">
                  Email
                </label>
              </div>
              <div className="formContainer__title">
                <input
                  value={username}
                  className="formTitle__input focus:ring-0"
                  type="text"
                  name="username"
                  id="usernameInput"
                  onChange={e => setUsername(e.target.value)}
                  placeholder=" "
                />
                <label className="formTitle__label" htmlFor="usernameInput">
                  Username
                </label>
              </div>
              <div className="formContainer__title">
                <input
                  value={name}
                  className="formTitle__input focus:ring-0"
                  type="text"
                  name="name"
                  id="fullNameInput"
                  onChange={e => setName(e.target.value)}
                  placeholder=" "
                />
                <label className="formTitle__label" htmlFor="fullNameInput">
                  Name
                </label>
              </div>
              <div className="formContainer__title">
                <textarea
                  onChange={e => setBio(e.target.value)}
                  className="formTitle__input focus:ring-0"
                  name="bio"
                  id="bioInput"
                  placeholder=" "
                  value={bio}
                ></textarea>
                <label className="formTitle__label" htmlFor="bioInput">
                  Bio
                </label>
              </div>
              <div className="formContainer__btn">
                <button className="submitButton__newPost" type="submit" disabled={!name}>
                  Update user
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="200" visible={true} />
        </div>
      )}
    </section>
  );
};
