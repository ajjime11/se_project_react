import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ card, isOpen, onClose, onDeleteClick, onCardLike }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const isLiked = card.likes?.some((id) => id === currentUser?._id) || false;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleLikeClick = () => {
    if (isLoggedIn) {
      onCardLike(card._id, isLiked);
    } else {
      console.log("User must be logged in to like items.");
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_image">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__item-info">
            <h3 className="modal__item-name">{card.name}</h3>
            <p className="modal__item-weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__actions">
            {isLoggedIn && (
              <button
                type="button"
                className={`modal__like-button ${
                  isLiked ? "modal__like-button_active" : ""
                }`}
                onClick={handleLikeClick}
                aria-label={isLiked ? "Unlike item" : "Like item"}
              />
            )}
            {isOwn ? (
              <button
                className="modal__delete-button"
                onClick={onDeleteClick}
                type="button"
              >
                Delete item
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
