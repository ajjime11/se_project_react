import { useState, useEffect } from "react";
import "./App.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getInitialCards,
  addItem,
  deleteItem,
  likeItem,
  dislikeItem,
  updateUserProfile,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
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

  const handleOpenRegisterModal = () => {
    handleOpenModal("register");
  };

  const handleOpenLoginModal = () => {
    handleOpenModal("login");
  };

  const handleAddItem = (item, onReset) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        handleCloseModal();
        onReset();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleCardDelete = () => {
    if (!selectedCard._id) {
      return;
    }
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        handleCloseModal();
        setSelectedCard({});
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleCardLike = (id, isLiked) => {
    const cardAction = isLiked ? dislikeItem : likeItem;
    cardAction(id)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard.data : item))
        );
      })
      .catch((error) => console.error("Error toggling like:", error));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
    // eslint-disable-next-line no-unused-vars
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => console.error("Registration error:", err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token).then((userRes) => {
          setCurrentUser(userRes.data);
          setIsLoggedIn(true);
          handleCloseModal();
        });
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleUpdateUser = (data) => {
    updateUserProfile(data)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch((err) => console.error("Update user error:", err));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    checkToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

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
    getInitialCards()
      .then((items) => {
        setClothingItems(items);
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
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="app">
          <Header
            onAddClick={() => handleOpenModal("add-garment")}
            city={weather.city}
            onRegisterClick={handleOpenRegisterModal}
            onLoginClick={handleOpenLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  weather={weather}
                  onCardLike={handleCardLike}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems.filter(
                      (item) => item.owner === currentUser?._id
                    )}
                    onAddClick={() => handleOpenModal("add-garment")}
                    onCardClick={handleOpenItemModal}
                    onSignOut={handleSignOut}
                    onEditProfileClick={() => handleOpenModal("edit-profile")}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={handleCloseModal}
            onAddItem={handleAddItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onLoginClick={handleOpenLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSignUpClick={handleOpenRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            card={selectedCard}
            onDeleteClick={handleOpenConfirmModal}
            onCardLike={handleCardLike}
          />
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm"}
            onClose={handleCloseModal}
            onDelete={handleCardDelete}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
