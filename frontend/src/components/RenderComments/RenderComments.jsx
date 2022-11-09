import moment from 'moment';
import './RenderComments.css';

export const RenderComments = ({ user, comment }) => {
  return (
    <div className="detailInfo__user commentContainer">
      <img src={user.userPicUrl} alt={user.username} />
      <div className="commentInfo">
        <p>
          <span>{user.username}</span> {comment.description}
        </p>
        <span className="timeFormat__comments">{moment(comment.updatedAt).fromNow()}</span>
      </div>
    </div>
  );
};
