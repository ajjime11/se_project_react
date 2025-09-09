import React from "react";
import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

const ClothesSection = ({ clothingItems, onCardClick }) => {
  return (
    <section className="clothes-section">
      <div className="clothes-section__container">
        <div className="clothes-section__row">
          Your items <button className="clothes-section__btn">+ Add new</button>
        </div>
        <div className="clothes-section__items">
          {clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClothesSection;
