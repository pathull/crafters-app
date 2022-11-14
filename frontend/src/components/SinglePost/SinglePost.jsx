import { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

import './SinglePost.css';

import { UserContext } from '../../context/UserContext';
import { getSingleWish, addPostToWishList, deleteWish, getListWishListByUser } from '../../services/fetchWishList';

export const SinglePost = ({ post, setPostList }) => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [star, setStar] = useState({ wishlist: false });

  useEffect(() => {
    if (post && userData) {
      getSingleWish(userData.id, post.id).then(info => {
        if (!info.error) {
          setStar(info);
        }
      });
    }
  }, [post, userData]);

  const addToWishList = async () => {
    const added = await addPostToWishList({ idUser: userData.id, idPost: post.id });

    if (!added.error) {
      setStar(added);
    }
  };

  const removeToWishList = async () => {
    const res = await deleteWish(star.id);

    if (!res.error) {
      if (res.message === 'Deleted') setStar({ wishlist: false });
    }

    if (location.pathname === '/wishlist' && setPostList) {
      const newList = await getListWishListByUser(userData.id);
      setPostList(newList);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="singlePostContainer relative"
    >
      <Link to={`/details-post/${post.id}`}>
        <div className="singlePicture__container">
          <img loading="lazy" className="singlePost__image" src={post.postPicUrl} alt={post.title} />
        </div>
      </Link>

      <button onClick={star.wishlist ? removeToWishList : addToWishList}>
        <BsFillStarFill className={`wishListStar ${star.wishlist ? 'isActive' : ''}`} />
      </button>
    </motion.div>
  );
};
