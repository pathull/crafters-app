import { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

import './CommentInput.css';

export const CommentInput = () => {
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

  const handleSubmit = e => {
    e.preventDefault();

    console.log(comment);

    setComment('');
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
        ></textarea>
        <button className="addComment__btn">
          <FaTelegramPlane />
        </button>
      </form>
    </div>
  );
};
