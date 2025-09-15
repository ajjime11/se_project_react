import "./ConfirmDeleteModal.css";

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
      <div className="modal__content modal__content-confirm">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__confirm-text-container">
          <p className="modal__confirm-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirm-text modal__confirm-text">
            This action is irreversible.
          </p>
        </div>
        <div className="modal__confirm-buttons">
          <button
            className="modal__confirm-button modal__confirm-button_delete"
            type="button"
            onClick={onDelete}
          >
            Yes, delete item
          </button>
          <button
            className="modal__confirm-button modal__confirm-button_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
