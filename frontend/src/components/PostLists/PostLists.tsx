import { Link, useLocation } from 'react-router-dom';

import './PostLists.css';

import { SinglePost } from '../SinglePost/SinglePost';
import { postDetails } from '../../types/Post';

type Props = {
  postsList: any;
  setPostList: any;
};

// type Post = {
//   createdAt: string,
//   description:string,
//   id: string,
//   postPicUrl: string,
//   price: string,
//   public_image_id: string,
//   sold: boolean,
//   title: string,
//   updatedAt: string,
//   userEmail: string
// }

export const PostLists = ({ postsList, setPostList }: Props) => {
  const location = useLocation();

  return (
    <div className="postLists__container">
      {postsList.length ? (
        postsList.map((post: postDetails) => <SinglePost post={post} key={post.id} setPostList={setPostList} />)
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
