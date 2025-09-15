import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { getWeatherCondition } from "../../utils/weatherApi";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ clothingItems, onCardClick, weather }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weather.temperature[currentTemperatureUnit];

  const fahrenheitTemp =
    currentTemperatureUnit === "C" ? (temp * 9) / 5 + 32 : temp;

  const weatherType = getWeatherCondition(fahrenheitTemp);

  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType.toLowerCase();
  });

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <section className="main__clothing-section">
        <div className="main__clothing-section-info">
          <div className="main__clothing-section-title">
            Today is {temp}°{currentTemperatureUnit} / You may want to wear:
          </div>
        </div>
        <div className="main__items">
          {filteredClothingItems.map((item) => {
            const key = item._id || item.id;
            const itemWithId = item._id ? item : { ...item, _id: item.id };
            return (
              <ItemCard key={key} item={itemWithId} onCardClick={onCardClick} />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
