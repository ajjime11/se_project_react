import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({ clothingItems }) => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} />
    </main>
  );
};

export default Profile;
