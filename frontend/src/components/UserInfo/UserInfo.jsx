import { useEffect, useState } from 'react';

import './UserInfo.css';

import { retrieveUser, storeUser } from '../../services/fetchData';

export const UserInfo = ({ user, postNumber }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user && !userInfo) {
      retrieveUser(user.email).then(data => {
        if (data) {
          setUserInfo(data);
        } else {
          const newUser = {
            email: user.email,
            bio: '',
            username: user.nickname,
            name: '',
          };

          storeUser(newUser).then(info => {
            if (!info.error) {
              setUserInfo(info);
            }
          });
        }
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(userInfo);

  return (
    <div className="singleFlexProp">
      <img
        className="profileInfo__image"
        src={userInfo && userInfo.userPicUrl ? userInfo.userPicUrl : user.picture}
        alt={userInfo && userInfo.username ? userInfo.username : user.nickname}
      />

      <div className="profileInfo__user">
        <div className="userInfo__container">
          <h2 className="userInfo__username">{userInfo && userInfo.username ? userInfo.username : user.nickname}</h2>
          <button className="editButtonInfo" type="button">
            Edit profile
          </button>
        </div>
        <div className="statsInfo">
          <p className="statistics">
            <span className="individualStats">{postNumber}</span> posts
          </p>
          <p className="statistics">
            <span className="individualStats">{userInfo && userInfo.auction_wins ? userInfo.auction_wins : 0} </span>{' '}
            wins
          </p>
        </div>
        <p className="user__fullName">{userInfo && userInfo.name ? userInfo.name : user.name}</p>
      </div>
    </div>
  );
};
