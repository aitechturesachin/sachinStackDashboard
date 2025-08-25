// src/App.jsx

import BarChartBox from "./components/BarChart";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";
import FunnelChartBox from "./components/FunnelChart";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCards from "./components/StatCard";
import "./index.css";
import "./App.css";
import LineChartBox from "./components/LineChartBox";

export default function App() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="main-content">
        <Header />
        <Filters />
        <StatCards />
        <section style={{ marginTop: "18px" }} className="">
          <LineChartBox />
        </section>

        <section className="charts-section">
          <BarChartBox />
          <FunnelChartBox />
        </section>

        <DataTable />
      </main>
    </div>
  );
}

// *************************************************************   NEW CODE   *************************************************************

// import Sidebar from "./components/Sidebar";
// import Hello from "./pages/Hello";
// import { Routes, Route, Navigate } from "react-router-dom";

// export default function App() {
//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <Sidebar />
//       </aside>

//       <main className="main-content">
//         <Routes>
//           {/* default → overview */}
//           <Route path="/" element={<Navigate to="/overview" replace />} />

//           {/* Home section */}
//           <Route path="/overview" element={<Hello title="Overview" />} />
//           <Route
//             path="/integrations"
//             element={<Hello title="Integrations" />}
//           />
//           <Route
//             path="/ai-assistant"
//             element={<Hello title="AI Assistant" />}
//           />
//           <Route
//             path="/custom-dashboard"
//             element={<Hello title="Custom Dashboard" />}
//           />
//           <Route
//             path="/auto-insights"
//             element={<Hello title="Auto Insights" />}
//           />
//           <Route path="/analytics" element={<Hello title="Analytics" />} />

//           {/* Preferences */}
//           <Route path="/settings" element={<Hello title="Settings" />} />
//           <Route path="/help" element={<Hello title="Help" />} />

//           {/* fallback */}
//           <Route path="*" element={<Hello title="Not Found" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }
