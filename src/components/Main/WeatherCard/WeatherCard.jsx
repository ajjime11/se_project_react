import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weather }) => {
  if (!weather || typeof weather.temperature === "undefined") {
    return null;
  }
  const temperature = weather.temperature;
  return (
    <div className="weather-card">
      <p className="weather-card__temperature">{temperature}°F</p>
    </div>
  );
};

export default WeatherCard;
