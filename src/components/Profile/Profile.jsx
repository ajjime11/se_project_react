import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
  onSignOut,
  onEditProfileClick,
}) => {
  return (
    <main className="profile">
      <SideBar onSignOut={onSignOut} onEditProfileClick={onEditProfileClick} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
};

export default Profile;
