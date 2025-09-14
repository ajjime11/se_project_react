import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card">
      <div className="card__title">{item.name}</div>
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={handleClick}
      />
    </div>
  );
};

export default ItemCard;
