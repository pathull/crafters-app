import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.css';

// import { retrieveUser, storeUser } from '../../services/fetchData';
import { UserContext } from '../../context/UserContext';

export const UserInfo = ({ user, postNumber }) => {
  // const [userInfo, setUserInfo] = useState(null);
  const { userData } = useContext(UserContext);

  // useEffect(() => {
  //   if (user && !userData) {
  //     retrieveUser(user.email).then(data => {
  //       if (data) {
  //         setUserData(data);
  //       } else {
  //         const newUser = {
  //           email: user.email,
  //           bio: '',
  //           username: user.nickname,
  //           name: '',
  //         };

  //         storeUser(newUser).then(info => {
  //           if (!info.error) {
  //             setUserData(info);
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(userData);

  return (
    <div className="singleFlexProp">
      <img
        className="profileInfo__image"
        src={userData && userData.userPicUrl ? userData.userPicUrl : user.picture}
        alt={userData && userData.username ? userData.username : user.nickname}
      />

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
