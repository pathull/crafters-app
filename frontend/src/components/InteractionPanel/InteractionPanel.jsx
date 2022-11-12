import { useContext } from 'react';

import './InteractionPanel.css';

import { UserContext } from '../../context/UserContext';
import { paymentApi } from '../../services/fetchPayment';

export const InteractionPanel = ({ post }) => {
  const { userData } = useContext(UserContext);

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

  return (
    <div className="sectionPanel__container">
      <div className="sectionPanel__elements">
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
