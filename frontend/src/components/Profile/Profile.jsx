import { useState, useEffect } from 'react';

import './Profile.css';

import { useAuth0 } from '@auth0/auth0-react';
import { retrievePosts } from '../../services/fetchData';
import { RotatingLines } from 'react-loader-spinner';

export const Profile = () => {
  const { user } = useAuth0();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      retrievePosts(user.email).then(data => setPosts(data));
    }
  }, [user]);

  console.log(posts);

  return (
    <section className="profileSection">
      <div className="profileContainer">
        {user ? (
          <div className="singleFlexProp">
            <img className="profileInfo__image" src={user.picture} alt={user.nickname} />

            <div className="profileInfo__user">
              <div className="userInfo__container">
                <h2 className="userInfo__username">{user.nickname}</h2>
                <button className="editButtonInfo" type="button">
                  Edit profile
                </button>
              </div>
              <div className="statsInfo">
                <p className="statistics">
                  <span className="individualStats">200</span> posts
                </p>
                <p className="statistics">
                  <span className="individualStats">5</span> wins
                </p>
              </div>
              <p className="user__fullName">{user.name}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="200" visible={true} />
          </div>
        )}
      </div>
    </section>
  );
};