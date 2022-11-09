import { Link } from 'react-router-dom';

import './SinglePost.css';

export const SinglePost = ({ post }) => {
  return (
    <Link to={`/details-post/${post.id}`}>
      <div className="singlePostContainer">
        <div className="singlePicture__container">
          <img className="singlePost__image" src={post.postPicUrl} alt={post.title} />
        </div>
      </div>
    </Link>
  );
};
