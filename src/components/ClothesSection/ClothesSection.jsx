import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

const ClothesSection = ({ clothingItems, onCardClick, onAddClick }) => {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items{" "}
        <button className="clothes-section__btn" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </section>
  );
};

export default ClothesSection;
