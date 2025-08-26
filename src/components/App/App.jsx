import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "../../index.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import WeatherCard from "../Main/WeatherCard/WeatherCard";

function App() {
  return (
    <div className="app">
      <Header />
      <WeatherCard />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
