import { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";
import { weatherConditions, defaultImages } from "../../../utils/constants";

const WeatherCard = ({ weather }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (
    !weather ||
    !weather.temperature ||
    typeof weather.temperature[currentTemperatureUnit] === "undefined"
  ) {
    return null;
  }

  const isDay =
    weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;

  const weatherType = weather.weather[0].main;

  const selectedImage = weatherConditions.find(
    (condition) => condition.type === weatherType && condition.isDay === isDay
  );

  const selectedImageUrl = selectedImage
    ? selectedImage.image
    : isDay
    ? defaultImages.day
    : defaultImages.night;

  const cardStyle = {
    backgroundImage: `url(${selectedImageUrl})`,
  };

  const temperature = weather.temperature[currentTemperatureUnit];

  return (
    <div className="weather-card" style={cardStyle}>
      <p className="weather-card__temperature">
        {temperature}°{currentTemperatureUnit}
      </p>
    </div>
  );
};

export default WeatherCard;
