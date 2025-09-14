import "../ItemModal/ItemModal.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
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
      <div className="modal__container modal__container_type_confirm">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="modal__confirm-title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__confirm-text">This action is irreversible.</p>
        <div className="modal__confirm-buttons">
          <button className="modal__confirm-button_delete" onClick={onDelete}>
            Yes, delete item
          </button>
          <button className="modal__confirm-button_cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
