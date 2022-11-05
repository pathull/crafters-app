import './SinglePost.css';

export const SinglePost = ({ post }) => {
  return (
    <div className="singlePostContainer">
      <div className="singlePicture__container">
        <img className="singlePost__image" src={post.postPicUrl} alt={post.title} />
      </div>
    </div>
  );
};
