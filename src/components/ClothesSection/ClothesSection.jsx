import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

const ClothesSection = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) => {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items{" "}
        <button className="clothes-section__btn" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => {
          const key = item._id || item.id;
          const itemWithId = item._id ? item : { ...item, _id: item.id };
          return (
            <ItemCard
              key={key}
              item={itemWithId}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ClothesSection;
