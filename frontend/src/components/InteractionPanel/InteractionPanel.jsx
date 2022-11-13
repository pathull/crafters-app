import { useContext, useState, useEffect } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

import './InteractionPanel.css';

import { UserContext } from '../../context/UserContext';
import { paymentApi } from '../../services/fetchPayment';
import { getSingleLike, addLikeToPost, deleteLike } from '../../services/fetchLike';

export const InteractionPanel = ({ post }) => {
  const { userData } = useContext(UserContext);
  const [likeStatus, setLikeStatus] = useState({ like: false });

  useEffect(() => {
    getSingleLike(userData.id, post.id).then(res => {
      if (!res.error) {
        setLikeStatus(res);
      }
    });
  }, [userData, post]);

  const handleCheckout = async () => {
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
        <button className="likeIcon" onClick={likeStatus.like ? removeLike : likePost}>
          {likeStatus.like ? <AiFillLike /> : <AiOutlineLike />}
        </button>

        <button onClick={handleCheckout} className="panelPurchase__btn">
          Buy for{' '}
          <span className="font-bold">
            {(post.price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </button>
      </div>
    </div>
  );
};
