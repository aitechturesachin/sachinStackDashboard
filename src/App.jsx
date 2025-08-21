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
