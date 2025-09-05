import React, { useContext } from "react";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { getWeatherCondition } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ onCardClick, clothingItems, weather }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherType = getWeatherCondition(weather.temperature.F);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      {weather && weather.temperature && (
        <div className="main__text">
          Today is {weather.temperature[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </div>
      )}
      <div className="main__items">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
};

export default Main;
