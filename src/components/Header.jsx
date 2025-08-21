// // src/components/Header.jsx
// import { FaSearch, FaBell } from "react-icons/fa";

// import logo from "../assets/man.png"; // Adjust the path as necessary

// export default function Header() {
//   return (
//     <header className="header">
//       <div className="search-bar">
//         <FaSearch />
//         <input type="text" placeholder="Search" />
//       </div>

//       <div className="user-profile">
//         <FaBell className="notification-icon" />
//         <div className="user-avatar">
//           <img src={logo} alt="Emmanuel Godinho" />
//           <span>Avatar</span>
//         </div>
//       </div>
//     </header>
//   );
// }






import { FaSearch, FaBell, FaBars, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../theme/ThemeContext";
import logo from "../assets/man.png"; // Adjust the path as necessary


export default function Header({ onToggleSidebar }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="header">
      <button
        className="hamburger"
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
      >
        <FaBars />
      </button>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search" />
      </div>

      <div className="user-profile">
        <button
          className="theme-toggle"
          aria-label="Toggle color theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggle}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <FaBell className="notification-icon" />
        <div className="user-avatar">
             <img src={logo} alt="Emmanuel Godinho" />
          <span className="user-name">Avatar</span>
        </div>

       
      </div>
    </header>
  );
}
