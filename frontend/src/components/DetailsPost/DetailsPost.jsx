import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';
import moment from 'moment';
import Swal from 'sweetalert2';

import './DetailsPost.css';

import { getSinglePostData, deleteSinglePost } from '../../services/fetchData';
import { getCommentsByPost } from '../../services/fetchComments';
import { UserContext } from '../../context/UserContext';
import { RenderComments } from '../RenderComments/RenderComments';
import { CommentInput } from '../CommentInput/CommentInput';

export const DetailsPost = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (userData) {
      getSinglePostData(id).then(info => setPost(info));
      getCommentsByPost(id).then(data => setComments(data));
    } else {
      navigate('/profile');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deletePost = () => {
    Swal.fire({
      title: 'Are your sure to delete this Post!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#002244',
      cancelButtonColor: '#d63031',
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await deleteSinglePost(post.id);
        if (res.message === 'Deleted') {
          navigate('/profile');
        }
      }
    });
  };

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

                <button onClick={deletePost}>
                  <FiDelete className="dotsIcon" />
                </button>
              </div>
              <div className="listComments__container">
                {post.description || comments.length !== 0 ? (
                  <>
                    {post.description ? <RenderComments user={userData} comment={post} /> : null}
                    {comments.map(comment => (
                      <RenderComments
                        key={comment.id}
                        user={comment.user}
                        setComments={setComments}
                        comment={comment}
                      />
                    ))}
                  </>
                ) : (
                  <div className="noCommentContainer">
                    <div>
                      <h4 className="noComments__title">No comments yet</h4>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <CommentInput idUser={userData.id} idPost={post.id} setComments={setComments} />
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
