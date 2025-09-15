import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  const itemWithId = item._id ? item : { ...item, _id: item.id };
  return (
    <div className="item-card" onClick={() => onCardClick(itemWithId)}>
      <div className="item-card__info">
        <h3 className="item-card__name">{itemWithId.name}</h3>
        <img
          src={itemWithId.imageUrl}
          alt={itemWithId.name}
          className="item-card__image"
        />
      </div>
    </div>
  );
};

export default ItemCard;
