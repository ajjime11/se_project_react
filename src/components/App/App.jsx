import { useState, useEffect } from "react";
import "./App.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
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

  const handleOpenConfirmModal = () => {
    setActiveModal("confirm");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleAddItem = (item, onReset) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
        onReset();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleCardDelete = () => {
    console.log("handleCardDelete called. selectedCard:", selectedCard);
    if (!selectedCard._id) {
      console.error("No _id found on selectedCard. Aborting delete.");
      return;
    }
    deleteItem(selectedCard._id)
      .then((res) => {
        console.log("deleteItem API response:", res);
        setClothingItems((items) => {
          const filtered = items.filter(
            (item) =>
              String(item._id) !== String(selectedCard._id) &&
              String(item.id) !== String(selectedCard._id)
          );
          console.log("Updated clothingItems after delete:", filtered);
          return filtered;
        });
        handleCloseModal();
        setSelectedCard({});
      })
      .catch((error) => console.error("Error deleting item:", error));
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

  useEffect(() => {
    getItems()
      .then((items) => {
        const sorted = [...items].sort((a, b) => {
          const idA = (a._id || a.id || 0).toString();
          const idB = (b._id || b.id || 0).toString();

          return idB.localeCompare(idA, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        });
        setClothingItems(sorted);
      })
      .catch((error) => console.error("Error fetching items:", error));
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
            element={
              <Profile
                clothingItems={clothingItems}
                onAddClick={handleOpenModal}
                onCardClick={handleOpenItemModal}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          card={selectedCard}
          onDeleteClick={handleOpenConfirmModal}
        />
        <ConfirmDeleteModal
          isOpen={activeModal === "confirm"}
          onClose={handleCloseModal}
          onDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
