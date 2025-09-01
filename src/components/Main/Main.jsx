import React from "react";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

const Main = ({ weather, onCardClick, clothingItems }) => {
  console.log("Weather data received:", weather);
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      {weather && weather.temperature && (
        <div className="main__text">
          Today is {weather.temperature}°F / You may want to wear:
        </div>
      )}
      <div className="main__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
};

export default Main;
