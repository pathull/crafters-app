import { Link, useLocation } from 'react-router-dom';
import React, { FC } from 'react';

import './PostLists.css';

import { SinglePost } from '../SinglePost/SinglePost';
import { postDetails } from '../../types/Post';

type PostListsProps = {
  postsList: postDetails[],
  setPostList?: (arg: postDetails[] ) => void
}

export const PostLists: FC<PostListsProps> = ({ postsList, setPostList = (arg: postDetails[] ) => {}}) => {
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
