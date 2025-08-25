import React from "react";
import logo from "../../assets/wtwr.png";
import avatar from "../../assets/avatar.png";
import "./Header.css";

const Header = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__place">
        New York,{" "}
        <time className="header__datetime" dateTime={now}>
          {dateStr},
        </time>
      </p>
      <div className="header__info-group">
        <button className="header__add-clothes-btn">+ Add clothes</button>
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
