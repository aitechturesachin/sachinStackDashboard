// import {
//   FaChartPie, FaPlug, FaRobot, FaChartLine,
//   FaLightbulb, FaChartBar, FaCog, FaQuestionCircle
// } from 'react-icons/fa';

// export default function Sidebar() {
//   return (
//     <>
//       <div className="logo">
//         <h2>Stack Logix</h2>
//       </div>

//       <nav className="nav-menu">
//         <div className="nav-section">
//           <p className="nav-title">Home</p>
//           <ul>
//             <li className="active"><FaChartPie /> Overview</li>
//             <li><FaPlug /> Integrations</li>
//             <li><FaRobot /> AI Assistant</li>
//             <li><FaChartLine /> Custom Dashboard</li>
//             <li><FaLightbulb /> Auto Insights</li>
//             <li><FaChartBar /> Analytics</li>
//           </ul>
//         </div>

//         <div className="nav-section">
//           <p className="nav-title">Preferences</p>
//           <ul>
//             <li><FaCog /> Settings</li>
//             <li><FaQuestionCircle /> Help</li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

// ***********************888  **********************************************   NEW CODE   *************************************************************

import {
  FaChartPie,
  FaPlug,
  FaRobot,
  FaChartLine,
  FaLightbulb,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <>
      <div className="logo">
        <h2>Stack Logix</h2>
      </div>

      <nav className="nav-menu">
        <div className="nav-section">
          <p className="nav-title">Home</p>
          <ul>
            <li>
              <NavLink to="/overview" className={linkClass}>
                <FaChartPie /> <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/integrations" className={linkClass}>
                <FaPlug /> <span>Integrations</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ai-assistant" className={linkClass}>
                <FaRobot /> <span>AI Assistant</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/custom-dashboard" className={linkClass}>
                <FaChartLine /> <span>Custom Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/auto-insights" className={linkClass}>
                <FaLightbulb /> <span>Auto Insights</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className={linkClass}>
                <FaChartBar /> <span>Analytics</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <p className="nav-title">Preferences</p>
          <ul>
            <li>
              <NavLink to="/settings" className={linkClass}>
                <FaCog /> <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" className={linkClass}>
                <FaQuestionCircle /> <span>Help</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
