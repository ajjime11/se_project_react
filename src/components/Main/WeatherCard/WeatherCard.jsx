import React, { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ weather }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (
    !weather ||
    !weather.temperature ||
    typeof weather.temperature[currentTemperatureUnit] === "undefined"
  ) {
    return null;
  }

  const temperature = weather.temperature[currentTemperatureUnit];

  return (
    <div className="weather-card">
      <p className="weather-card__temperature">
        {temperature}°{currentTemperatureUnit}
      </p>
    </div>
  );
};

export default WeatherCard;
