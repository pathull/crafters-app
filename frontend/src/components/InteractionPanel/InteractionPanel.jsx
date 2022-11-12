import './InteractionPanel.css';

export const InteractionPanel = ({ post }) => {
  return (
    <div className="sectionPanel__container">
      <div className="sectionPanel__elements">
        <button className="panelPurchase__btn">
          Buy for <span className="font-bold">$ {post.price / 100}</span>
        </button>
      </div>
    </div>
  );
};
