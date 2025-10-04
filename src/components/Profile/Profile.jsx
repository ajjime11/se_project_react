import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onAddClick,
  onCardClick,
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
      />
    </main>
  );
};

export default Profile;
