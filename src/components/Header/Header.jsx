import React, { useContext } from "react";
import logo from "../../assets/wtwr.png";
import avatar from "../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Link } from "react-router-dom";

const Header = ({ onAddClick, city }) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* TODO - link to home page (aka "/" */}
      <div className="header__side">
        <img src={logo} alt="" className="header__logo" />
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr},
          </time>{" "}
          {city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch onToggle={handleToggleSwitchChange} />
        <div className="header__info-group">
          <button onClick={onAddClick} className="header__add-clothes-btn">
            + Add clothes
          </button>
          <Link className="header__link" to="/profile">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne's avatar"
              className="header__avatar"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
