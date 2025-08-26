import React from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

const Main = ({ clothingItems }) => {
  return (
    <main className="main">
      <WeatherCard />
      <p className="main__text"> Today is 75&deg; F / You may want to wear:</p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} data={item} />;
        })}
      </ul>
    </main>
  );
};

export default Main;
