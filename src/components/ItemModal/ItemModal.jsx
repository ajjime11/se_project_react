import "./ItemModal.css";

const ItemModal = ({ card, isOpen, onClose, onDeleteClick }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
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
          <button className="modal__delete-button" onClick={onDeleteClick}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
