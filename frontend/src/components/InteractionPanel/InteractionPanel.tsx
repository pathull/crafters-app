import React, { useContext, useState, useEffect, FC } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './InteractionPanel.css';

import { UserContext } from '../../context/UserContext';
import { paymentApi } from '../../services/fetchPayment';
import { getSingleLike, addLikeToPost, deleteLike } from '../../services/fetchLike';
import { postDetails, likeStatus } from '../../types/Post';

type InteractionPanelProps = {
  post: postDetails
}

export const InteractionPanel: FC<InteractionPanelProps> = ({ post }) => {
  const { userData } = useContext(UserContext);
  const [likeStatus, setLikeStatus] = useState<likeStatus>({ like: false, id: 0 });
  const [togglePurchaseBtn, setTogglePurchaseBtn] = useState<boolean>(false);

  useEffect(() => {
    getSingleLike(userData.id, post.id).then(res => {
      if (!res.error) {
        setLikeStatus(res);
      }
    });
  }, [userData, post]);

  const handleCheckout = async () => {
    setTogglePurchaseBtn(true);
    const item = {
      id: post.id,
      name: post.title,
      description: post.description,
      price: post.price,
      image: post.postPicUrl,
    };

    const body = { item, userId: userData.id };

    const res = await paymentApi(body);
    if (res.url) {
      window.location.href = res.url;
    }
  };

  const likePost = async () => {
    if (likeStatus.like === false) {
      if (!isNaN(post.id) && !isNaN(userData.id)) {
        const newLike = await addLikeToPost({ idPost: post.id, idUser: userData.id });

        setLikeStatus(newLike);
      }
    }
  };

  const removeLike = async () => {
    if (likeStatus.like === true && likeStatus.id && !isNaN(likeStatus.id)) {
      const likeRemoved = await deleteLike(likeStatus.id);

      if (likeRemoved.message === 'Deleted') setLikeStatus({ like: false });
    }
  };

  return (
    <div className="sectionPanel__container">
      <div className="sectionPanel__elements">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="likeIcon"
          onClick={likeStatus.like ? removeLike : likePost}
        >
          {likeStatus.like ? <AiFillLike /> : <AiOutlineLike />}
        </motion.button>

        {userData.id !== post.user.id && !post.sold && post.price !== 0 ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCheckout}
            className={`panelPurchase__btn ${togglePurchaseBtn ? 'cursor-no-drop' : ''}`}
            disabled={togglePurchaseBtn}
          >
            Buy for{' '}
            <span className="font-bold">
              {(post.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </motion.button>
        ) : null}
      </div>
    </div>
  );
};
