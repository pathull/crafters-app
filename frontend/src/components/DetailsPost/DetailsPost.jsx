import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import moment from 'moment';

import './DetailsPost.css';

import { getSinglePostData } from '../../services/fetchData';
import { UserContext } from '../../context/UserContext';
import { RenderComments } from '../RenderComments/RenderComments';
import { CommentInput } from '../CommentInput/CommentInput';

export const DetailsPost = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (userData) {
      getSinglePostData(id).then(info => setPost(info));
    } else {
      navigate('/profile');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="profileSection">
      {post ? (
        <div className="detailsPost">
          <div className="detailsPost__container">
            <div className="singlePostContainer__image">
              <img src={post.postPicUrl} alt={post.title} />
            </div>
            <div className="detailsPost__infoContainer">
              <div className="detailsInfo">
                <div className="detailInfo__user">
                  <img src={userData.userPicUrl} alt={userData.username} />
                  <div>
                    <h4 className="userInfo__username">{userData.username}</h4>
                    <span className="timeFormat__comments">{moment(post.updatedAt).fromNow()}</span>
                  </div>
                </div>

                <BsThreeDots className="dotsIcon" />
              </div>
              <div className="listComments__container">
                <RenderComments user={userData} comment={post} />
              </div>

              <div>
                <CommentInput />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="missingPost__container">
          <div className="missingPost__container--div">
            <h1>Sorry Post does not exist</h1>
          </div>
        </div>
      )}
    </section>
  );
};
