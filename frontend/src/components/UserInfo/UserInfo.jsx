import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.css';

import { UserContext } from '../../context/UserContext';

export const UserInfo = ({ user, postNumber }) => {
  const { userData } = useContext(UserContext);

  return (
    <div className="singleFlexProp">
      <div className="profileInfo__image">
        <img
          loading="lazy"
          src={userData && userData.userPicUrl ? userData.userPicUrl : user.picture}
          alt={userData && userData.username ? userData.username : user.nickname}
        />
      </div>

      <div className="profileInfo__user">
        <div className="userInfo__container">
          <h2 className="userInfo__username">{userData && userData.username ? userData.username : user.nickname}</h2>
          <Link to="/update-profile" className="editButtonInfo">
            Edit profile
          </Link>
        </div>
        <div className="statsInfo">
          <p className="statistics">
            <span className="individualStats">{postNumber}</span> posts
          </p>
          <p className="statistics">
            <span className="individualStats">{userData && userData.auction_wins ? userData.auction_wins : 0} </span>{' '}
            wins
          </p>
        </div>
        <p className="user__fullName">{userData && userData.name ? userData.name : user.name}</p>
      </div>
    </div>
  );
};
