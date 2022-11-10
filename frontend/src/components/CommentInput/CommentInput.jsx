import { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

import './CommentInput.css';

import { createNewComment, getCommentsByPost } from '../../services/fetchComments';

export const CommentInput = ({ idUser, idPost, setComments }) => {
  const [comment, setComment] = useState('');
  const [height, setHeight] = useState(40);

  const keyUpHandler = e => {
    let scHeight = e.target.scrollHeight;
    if (height < 64) {
      if (scHeight < 64) setHeight(scHeight);
      else setHeight(64);
    }

    if (comment === '') setHeight(40);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newComment = { comment: comment.trim(), idUser, idPost };
    const res = await createNewComment(newComment);
    if (!res.error) {
      const allComments = await getCommentsByPost(idPost);
      setComments(allComments);
    } else {
      alert(res.message);
    }

    setComment('');
    setHeight(40);
  };

  return (
    <div className="commentInput__container">
      <form onSubmit={handleSubmit} className="flex items-center bg-light-grey rounded">
        <textarea
          value={comment}
          style={{ height: `${height}px`, maxHeight: '88px' }}
          onChange={e => setComment(e.target.value)}
          onKeyUp={keyUpHandler}
          className="w-full focus:ring-0 addComment__input"
          type="text"
          placeholder="Add a comment..."
          required
        ></textarea>
        <button className="addComment__btn" disabled={comment | (comment === '')}>
          <FaTelegramPlane />
        </button>
      </form>
    </div>
  );
};
