// src/components/Header.jsx
import { FaSearch, FaBell } from "react-icons/fa";
import logo from "../assets/man.png"; // Adjust the path as necessary

export default function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search" />
      </div>

      <div className="user-profile">
        <FaBell className="notification-icon" />
        <div className="user-avatar">
          <img src={logo} alt="Emmanuel Godinho" />
          <span>Emmanuel Godinho</span>
        </div>
      </div>
    </header>
  );
}
