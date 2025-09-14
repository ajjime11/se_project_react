import avatar from "../../assets/avatar.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's avatar"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
};

export default SideBar;
