import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ handleSignOut }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const getAvatarContent = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
          className="sidebar__avatar"
        />
      );
    }

    if (currentUser?.name) {
      return (
        <div className="sidebar__avatar-placeholder">
          {currentUser.name[0].toUpperCase()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {getAvatarContent()}
        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button"
          type="button"
          onClick={() => console.log("Open change profile modal")}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
