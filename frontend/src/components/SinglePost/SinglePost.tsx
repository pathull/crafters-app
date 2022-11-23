import React, { useEffect, useContext, useState, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './SinglePost.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { UserContext } from '../../context/UserContext';
import { postData } from '../../types/Post';
import { postDetails } from '../../types/Post';
import { env } from '../../helpers/env';
import { getSingleWish, addPostToWishList, deleteWish, getListWishListByUser } from '../../services/fetchWishList';

type SinglePostProps = {
  post: postDetails
  setPostList: (arg: postDetails[]) => void;
}

export const SinglePost: FC<SinglePostProps> = ({ post, setPostList }) => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [star, setStar] = useState<postData>({ wishlist: false });

  useEffect(() => {
    if (post && userData) {
      getSingleWish(userData.id, post.id).then((info:postData) => {
        if (info) {
          setStar(info);
        }
      });
    }
  }, [post, userData]);

  const addToWishList = async () => {
    const added = await addPostToWishList({ idUser: userData.id, idPost: post.id });

    if (added) {
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
          <LazyLoadImage
            loading="lazy"
            className="singlePost__image"
            src={post.postPicUrl}
            alt={post.title}
            effect="blur"
            height={250}
            width={200}
            placeholderSrc={env.imagePlaceHolder}
          />
        </div>
      </Link>

      <button data-testid="wish-button" onClick={star.wishlist ? removeToWishList : addToWishList}>
        <BsFillStarFill data-testid="wish-button-star" className={`wishListStar ${star.wishlist ? 'isActive' : ''}`} />
      </button>
    </motion.div>
  );
};
