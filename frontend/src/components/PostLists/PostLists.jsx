import { Link, useLocation } from 'react-router-dom';

import './PostLists.css';

import { SinglePost } from '../SinglePost/SinglePost';

export const PostLists = ({ postsList, setPostList }) => {
  const location = useLocation();

  return (
    <div className="postLists__container">
      {postsList.length ? (
        postsList.map(post => <SinglePost post={post} key={post.id} setPostList={setPostList} />)
      ) : location.pathname === '/profile' ? (
        <div className="button__container">
          <Link className="button__createPost" to="/create/post">
            Create Post
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-5xl font-bold noPostsClass">No posts inserted yet</h1>
        </div>
      )}
    </div>
  );
};
