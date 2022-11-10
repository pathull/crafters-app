import { BsThreeDots } from 'react-icons/bs';
import moment from 'moment';
import './RenderComments.css';

export const RenderComments = ({ user, comment }) => {
  if (comment) {
    if (comment.description === '') return null;
  }

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
        <button>
          <BsThreeDots className="dotsForComments" />
        </button>
      ) : null}
    </div>
  );
};
