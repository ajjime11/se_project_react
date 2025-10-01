import "./ItemCard.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const ItemCard = ({ item, onCardClick, onCardLike }) => {
  const itemWithId = item._id ? item : { ...item, _id: item.id };
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked =
    itemWithId.likes?.some((id) => id === currentUser?._id) || false;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      onCardLike(itemWithId._id, isLiked);
    }
  };

  return (
    <div className="item-card" onClick={() => onCardClick(itemWithId)}>
      <div className="item-card__info">
        <h3 className="item-card__name">{itemWithId.name}</h3>
        <img
          src={itemWithId.imageUrl}
          alt={itemWithId.name}
          className="item-card__image"
        />
        {isLoggedIn && (
          <button
            type="button"
            className={`item-card__like-button${
              isLiked ? " item-card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
