import { Link } from 'react-router-dom';

import './PostLists.css';

import { SinglePost } from '../SinglePost/SinglePost';

export const PostLists = ({ postsList }) => {
  console.log(postsList);

  return (
    <div className="postLists__container">
      {postsList.length ? (
        postsList.map(post => <SinglePost post={post} key={post.id} />)
      ) : (
        <div className="button__container">
          <Link className="button__createPost" to="/create/post">
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
};
