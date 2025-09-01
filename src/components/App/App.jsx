import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { apiKey } from "../../utils/constants";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState({ temperature: 75, city: "Tempe" });

  const handleOpenModal = () => {
    setActiveModal("add-garment");
  };

  const handleOpenItemModal = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tempe&appid=${apiKey}&units=imperial`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.main.temp),
          city: data.name,
        });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div className="app">
      <Header onAddClick={handleOpenModal} city={weather.city} />
      <Main
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
        weather={weather}
      />
      <Footer />
      <ModalWithForm
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        title="New garment"
        buttonText="Add garment"
      >
        <div className="modal__form-field">
          <label className="modal__label">Name</label>
          <input type="text" placeholder="Name" className="modal__input" />
        </div>
        <div className="modal__form-field">
          <label className="modal__label">Image URL</label>
          <input type="url" placeholder="Image URL" className="modal__input" />
        </div>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-group">
            <div className="modal__radio-option">
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
            </div>
            <div className="modal__radio-option">
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
            </div>
            <div className="modal__radio-option">
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
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
