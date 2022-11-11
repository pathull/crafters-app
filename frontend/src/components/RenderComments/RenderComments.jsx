import { useContext } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import moment from 'moment';

import './RenderComments.css';

import { UserContext } from '../../context/UserContext';
import { deleteComment, getCommentsByPost } from '../../services/fetchComments';

export const RenderComments = ({ user, comment, setComments, post }) => {
  const { userData } = useContext(UserContext);

  if (comment) {
    if (comment.description === '') return null;
  }

  const deleteSingleComment = async () => {
    const res = await deleteComment(comment.id);

    if (!res.error) {
      const allComments = await getCommentsByPost(comment.idPost);
      setComments(allComments);
    }
  };

  return (
    <div className="commentArea">
      <div className="detailInfo__user commentContainer">
        <img src={user.userPicUrl} alt={user.username} />
        <div className="commentInfo">
          <p>
            <span>{user.username}</span> {comment.description || comment.comment}
          </p>
          <span className="timeFormat__comments">{moment(comment.updatedAt).fromNow()}</span>
        </div>
      </div>

      {comment.comment ? (
        post.user.email === userData.email ? (
          <button onClick={deleteSingleComment}>
            <MdOutlineClear className="dotsForComments" />
          </button>
        ) : comment.user.email === userData.email ? (
          <button onClick={deleteSingleComment}>
            <MdOutlineClear className="dotsForComments" />
          </button>
        ) : null
      ) : null}
    </div>
  );
};
