// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { useMemo, useState } from "react";
// import { useTheme } from "../theme/ThemeContext";

// const datasets = {
//   Week: [
//     { label: "Mon", value: 42000 },
//     { label: "Tue", value: 38000 },
//     { label: "Wed", value: 52000 },
//     { label: "Thu", value: 33000 },
//     { label: "Fri", value: 61000 },
//     { label: "Sat", value: 27000 },
//     { label: "Sun", value: 30000 },
//   ],
//   Month: Array.from({ length: 12 }, (_, i) => ({
//     label: `W${i + 1}`,
//     value: Math.round(20000 + Math.random() * 50000),
//   })),
//   Year: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ].map((m) => ({
//     label: m,
//     value: Math.round(200000 + Math.random() * 250000),
//   })),
// };

// const money = (n) => `$${Number(n).toLocaleString()}`;
// const abbrev = (n) =>
//   n >= 1_000_000
//     ? `${(n / 1_000_000).toFixed(1)}M`.replace(".0", "")
//     : n >= 1_000
//     ? `${(n / 1_000).toFixed(1)}K`.replace(".0", "")
//     : `${n}`;
// export default function BarChartBox() {
//   const [range, setRange] = useState("Week");
//   const data = useMemo(() => datasets[range], [range]);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const axis = {
//     stroke: isDark ? "#9aa4af" : "#6b7280",
//     grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
//     cursor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
//   };

//   const total = useMemo(
//     () => data.reduce((acc, d) => acc + d.value, 0).toLocaleString(),
//     [data]
//   );

//   return (
//     <div className="chart-container">
//       <div className="chart-header">
//         <h3>Bar Chart</h3>
//         <select
//           className="time-filter"
//           value={range}
//           onChange={(e) => setRange(e.target.value)}
//         >
//           <option>Week</option>
//           <option>Month</option>
//           <option>Year</option>
//         </select>
//       </div>

//       <div className="chart-value">${total}</div>

//       <div className="bar-chart">
//         <ResponsiveContainer width="100%" height={260}>
//           <BarChart
//             data={data}
//             // margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
//             margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
//             barCategoryGap="18%"
//             barGap={6}
//           >
//             <CartesianGrid stroke={axis.grid} vertical={false} />
//             <XAxis
//               dataKey="label"
//               stroke={axis.stroke}
//               tickLine={false}
//               // axisLine={{ stroke: axis.stroke }}
//               axisLine={{ stroke: "transparent" }}
//               interval={0}
//             />
//             <YAxis
//               stroke={axis.stroke}
//               tickLine={false}
//               // axisLine={{ stroke: axis.stroke }}
//               axisLine={{ stroke: "transparent" }}
//               tickFormatter={(v) => (v === 0 ? "0" : `${abbrev(v)}`)}
//               width={36}
//             />
//             <Tooltip
//               cursor={{ fill: axis.cursor }}
//               // formatter={(v) => [`$${Number(v).toLocaleString()}`, "Value"]}
//               // contentStyle={{
//               //   background: "var(--panel)",
//               //   border: `1px solid var(--border)`,
//               //   color: "var(--text)",
//               // }}
//               formatter={(v) => [money(v), "Value"]}
//               contentStyle={{
//                 background: "var(--panel)",
//                 border: `1px solid var(--border)`,
//                 color: "var(--text)",
//               }}
//             />
//             {/* One bar: with gray “track” background + gradient fill + 16px radius */}
//             <defs>
//               <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="rgba(0, 201, 255, 0.85)" />
//                 <stop offset="100%" stopColor="rgba(146, 254, 157, 0.85)" />
//               </linearGradient>
//             </defs>
//             <Bar
//               dataKey="value"
//               fill="var(--primary)"
//               radius={[6, 6, 0, 0]}
//               background={{ fill: "#F5F5F5" }} /* light gray tracks */
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <p className="chart-description">
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry.
//       </p>
//     </div>
//   );
// }

// ******************************************** figma design ******************************

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

// Demo data (unchanged)
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

// Format helpers
const money = (n) => `$${Number(n).toLocaleString()}`;
const abbrev = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`.replace(".0", "")
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}K`.replace(".0", "")
    : `${n}`;

// “Nice” top tick for a clean scale (e.g., 100k / 200k / 500k)
function niceTop(max) {
  if (max <= 0) return 10000;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = Math.ceil(max / pow);
  const m = n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return m * pow;
}

export default function BarChartBox() {
  const [range, setRange] = useState("Week");
  const data = useMemo(() => datasets[range], [range]);
  const total = useMemo(
    () => data.reduce((acc, d) => acc + d.value, 0),
    [data]
  );

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const axis = {
    stroke: isDark ? "#9aa4af" : "#6b7280",
    grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cursor: "rgba(0,0,0,0.04)",
  };

  const topTick = useMemo(
    () => niceTop(Math.max(...data.map((d) => d.value), 1)),
    [data]
  );
  const ticks = useMemo(() => {
    const mid = Math.round(topTick * 0.5);
    const low = Math.round(topTick * 0.1);
    return [topTick, mid, low, 0];
  }, [topTick]);

  return (
    <div className="chart-container">
      <div className="chart-header bar-chart-header">
        <div className="figma-heading">
          <h3>Bar Chart</h3>
          <div>{money(total)}</div>
        </div>

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

      {/* Chart */}
      <div className="bar-chart" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="18%"
            barGap={6}
            margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke={axis.grid} vertical={false} />

            <XAxis
              dataKey="label"
              stroke={axis.stroke}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
              interval={0}
            />
            <YAxis
              stroke={axis.stroke}
              ticks={ticks}
              tickFormatter={(v) => (v === 0 ? "0" : `${abbrev(v)}`)}
              width={36}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
            />

            <Tooltip
              cursor={{ fill: axis.cursor }}
              formatter={(v) => [money(v), "Value"]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                color: "#111827",
                borderRadius: 8,
              }}
            />

            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 201, 255, 0.85)" />
                <stop offset="100%" stopColor="rgba(146, 254, 157, 0.85)" />
              </linearGradient>
            </defs>

            <Bar
              dataKey="value"
              fill="url(#barGrad)"
              radius={[16, 16, 0, 0]}
              background={{ fill: "var(--bar-track)", radius: [16, 16, 0, 0] }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
