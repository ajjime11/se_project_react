import React from "react";
import "../ItemModal/ItemModal.css";
import x from "../../assets/x.png";

const ModalWithForm = ({
  children,
  buttonText = "Submit",
  title,
  isOpen,
  onClose,
}) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

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
      <div className="modal__container modal__container_type_form">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button modal__close-button_type_form"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={handleFormSubmit}>
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
