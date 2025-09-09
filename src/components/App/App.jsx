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
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

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
    getWeatherData()
      .then((data) => {
        setWeather(parseWeatherData(data));
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <Header onAddClick={handleOpenModal} city={weather.city} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                onCardClick={handleOpenItemModal}
                weather={weather}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={<Profile clothingItems={clothingItems} />}
          ></Route>
        </Routes>
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
            <input
              type="text"
              placeholder="Name"
              className="modal__input_text"
            />
          </div>
          <div className="modal__form-field">
            <label className="modal__label">Image URL</label>
            <input
              type="url"
              placeholder="Image URL"
              className="modal__input_text"
            />
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
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
