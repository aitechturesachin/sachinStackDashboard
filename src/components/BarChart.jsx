import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useMemo, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

const datasets = {
  Week: [
    { label: "Mon", value: 42000 },
    { label: "Tue", value: 38000 },
    { label: "Wed", value: 52000 },
    { label: "Thu", value: 33000 },
    { label: "Fri", value: 61000 },
    { label: "Sat", value: 27000 },
    { label: "Sun", value: 30000 },
  ],
  Month: Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: Math.round(20000 + Math.random() * 50000),
  })),
  Year: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((m) => ({
    label: m,
    value: Math.round(200000 + Math.random() * 250000),
  })),
};

export default function BarChartBox() {
  const [range, setRange] = useState("Week");
  const data = useMemo(() => datasets[range], [range]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const axis = {
    stroke: isDark ? "#9aa4af" : "#6b7280",
    grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cursor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
  };

  const total = useMemo(
    () => data.reduce((acc, d) => acc + d.value, 0).toLocaleString(),
    [data]
  );

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Bar Chart</h3>
        <select
          className="time-filter"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <div className="chart-value">${total}</div>

      <div className="bar-chart">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke={axis.grid} vertical={false} />
            <XAxis
              dataKey="label"
              stroke={axis.stroke}
              tickLine={false}
              axisLine={{ stroke: axis.stroke }}
            />
            <YAxis
              stroke={axis.stroke}
              tickLine={false}
              axisLine={{ stroke: axis.stroke }}
            />
            <Tooltip
              cursor={{ fill: axis.cursor }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, "Value"]}
              contentStyle={{
                background: "var(--panel)",
                border: `1px solid var(--border)`,
                color: "var(--text)",
              }}
            />
            <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
  );
}
