import React from "react";
import { useState } from "react";
import "./App.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");

  const handleOpenModal = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <Header onAddClick={handleOpenModal} />
      <Main clothingItems={clothingItems} />
      <Footer />
      <ModalWithForm
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        title="New garment"
        buttonText="Add garment"
      >
        <label className="modal__label">Name</label>
        <input type="text" placeholder="Name" className="modal__input" />
        <label className="modal__label">Image URL</label>
        <input type="url" placeholder="Image URL" className="modal__input" />
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-group">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
            />
            <label className="modal__label" htmlFor="hot">
              Hot
            </label>
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
            />
            <label className="modal__label" htmlFor="warm">
              Warm
            </label>
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
            />
            <label className="modal__label" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
