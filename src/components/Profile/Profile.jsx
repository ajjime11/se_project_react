import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({ clothingItems, onAddClick, onCardClick, onSignOut }) => {
  return (
    <main className="profile">
      <SideBar handleSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
      />
    </main>
  );
};

export default Profile;
