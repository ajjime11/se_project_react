import "./ItemModal.css";

const ItemModal = ({ card, isOpen, onClose }) => {
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
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__text modal__title">{card.name}</p>
          <p className="modal__text">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
