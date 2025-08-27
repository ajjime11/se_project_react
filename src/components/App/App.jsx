// TODO - apply all styles from the Figma to all the components
// TODO - set up the fonts
// TODO - implement footer
// TODO - modals

import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "../../index.css";
import "./App.css";
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

  // App.jsx
  // ... (imports and state are the same)

  return (
    <div className="app">
      <Header onAddClick={handleOpenModal} />
      <Main clothingItems={clothingItems} />
      <Footer />
      <ModalWithForm
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <label>Name</label>
        <input type="text" placeholder="Name" />
        <label>Image URL</label>
        <input type="url" placeholder="Image URL" />
        <fieldset>
          <legend>Select the weather type:</legend>
          <input type="radio" id="hot" name="weather" value="hot" />
          <label htmlFor="hot">Hot</label>
          <input type="radio" id="warm" name="weather" value="warm" />
          <label htmlFor="warm">Warm</label>
          <input type="radio" id="cold" name="weather" value="cold" />
          <label htmlFor="cold">Cold</label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
