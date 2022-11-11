import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import './SinglePost.css';

export const SinglePost = ({ post }) => {
  return (
    <Link to={`/details-post/${post.id}`}>
      <div className="singlePostContainer relative">
        <div className="singlePicture__container">
          <img className="singlePost__image" src={post.postPicUrl} alt={post.title} />
        </div>

        <button>
          <BsFillStarFill className="wishListStar isActive" />
        </button>
      </div>
    </Link>
  );
};
