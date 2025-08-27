import React from "react";
import logo from "../../assets/wtwr.png";
import avatar from "../../assets/avatar.png";
import "./Header.css";

const Header = ({ onAddClick }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__place">
        <time className="header__datetime" dateTime={now}>
          {dateStr},
        </time>{" "}
        New York
      </p>
      <div className="header__info-group">
        <button onClick={onAddClick} className="header__add-clothes-btn">
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
};

export default Header;
