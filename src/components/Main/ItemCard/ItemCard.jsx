import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__info">
        <h3 className="item-card__name">{item.name}</h3>
        <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      </div>
    </div>
  );
};

export default ItemCard;
