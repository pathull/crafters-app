import { MdOutlineClear } from 'react-icons/md';
import moment from 'moment';

import './RenderComments.css';

import { deleteComment, getCommentsByPost } from '../../services/fetchComments';

export const RenderComments = ({ user, comment, setComments }) => {
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
        <button onClick={deleteSingleComment}>
          <MdOutlineClear className="dotsForComments" />
        </button>
      ) : null}
    </div>
  );
};
