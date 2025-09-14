import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({ clothingItems, onAddClick, onCardClick }) => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
      />
    </main>
  );
};

export default Profile;
