// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ReferenceLine,
//   ReferenceDot,
// } from "recharts";
// import { useMemo, useState } from "react";
// import { useTheme } from "../theme/ThemeContext";

// const datasets = {
//   Week: [
//     { label: "Mon", value: 28000 },
//     { label: "Tue", value: 95000 },
//     { label: "Wed", value: 5000 },
//     { label: "Thu", value: 100000 },
//     { label: "Fri", value: 3000 },
//     { label: "Sat", value: 37000 },
//     { label: "Sun", value: 42000 },
//   ],
//   Month: Array.from({ length: 12 }, (_, i) => ({
//     label: `W${i + 1}`,
//     value: Math.round(22000 + Math.random() * 40000),
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
//     value: Math.round(150000 + Math.random() * 250000),
//   })),
// };

// export default function LineChartBox() {
//   const [range, setRange] = useState("Week");
//   const data = useMemo(() => datasets[range], [range]);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const axis = {
//     stroke: isDark ? "#9aa4af" : "#6b7280",
//     grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
//     cursor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
//     line: "var(--primary)",
//   };

//   // ---------- KPIs ----------
//   const metrics = useMemo(() => {
//     const vals = data.map((d) => d.value);
//     const sum = vals.reduce((a, b) => a + b, 0);
//     const avg = vals.length ? sum / vals.length : 0;
//     const max = Math.max(...vals);
//     const min = Math.min(...vals);
//     const first = vals[0] ?? 0;
//     const last = vals[vals.length - 1] ?? 0;
//     const trendPct = first ? ((last - first) / first) * 100 : 0;

//     // Target defaults to avg; tweak per range if you want different behavior
//     const target = range === "Year" ? Math.round(avg * 1.05) : Math.round(avg);

//     return {
//       sum,
//       avg,
//       max,
//       min,
//       first,
//       last,
//       trendPct,
//       target,
//     };
//   }, [data, range]);

//   const fmt = (n) => `$${Number(n).toLocaleString()}`;
//   const pct = (n) => `${Math.sign(n) >= 0 ? "+" : ""}${n.toFixed(1)}%`;

//   return (
//     <div className="chart-container">
//       {/* Header */}
//       <div className="chart-header">
//         <h3>Line Chart</h3>
//         <select
//           className="time-filter"
//           value={range}
//           onChange={(e) => /** change dataset */ setRange(e.target.value)}
//         >
//           <option>Week</option>
//           <option>Month</option>
//           <option>Year</option>
//         </select>
//       </div>

//       {/* KPI row */}
//       <div className="kpi-row">
//         <KpiTile label="Total" value={fmt(metrics.sum)} />
//         <KpiTile label="Average" value={fmt(Math.round(metrics.avg))} />
//         <KpiTile label="Max" value={fmt(metrics.max)} />
//         <KpiTile
//           label="Trend"
//           value={pct(metrics.trendPct)}
//           trend={metrics.trendPct}
//         />
//       </div>

//       {/* Chart */}
//       <div className="bar-chart">
//         <ResponsiveContainer width="100%" height={260}>
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
//           >
//             <CartesianGrid stroke={axis.grid} vertical={false} />
//             <XAxis
//               dataKey="label"
//               stroke={axis.stroke}
//               tickLine={false}
//               axisLine={{ stroke: axis.stroke }}
//             />
//             <YAxis
//               stroke={axis.stroke}
//               tickLine={false}
//               axisLine={{ stroke: axis.stroke }}
//               tickFormatter={(v) =>
//                 v >= 1_000_000
//                   ? `${Math.round(v / 100_000) / 10}M`
//                   : v >= 1_000
//                   ? `${Math.round(v / 100) / 10}K`.replace(".0", "")
//                   : v
//               }
//             />
//             <Tooltip
//               cursor={{ stroke: axis.line, strokeWidth: 1, fill: axis.cursor }}
//               formatter={(v) => [fmt(v), "Value"]}
//               contentStyle={{
//                 background: "var(--panel)",
//                 border: `1px solid var(--border)`,
//                 color: "var(--text)",
//               }}
//             />

//             {/* Soft area under the line */}
//             <defs>
//               <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="0%"
//                   stopColor={isDark ? "#38bdf8" : "#2563eb"}
//                   stopOpacity={0.35}
//                 />
//                 <stop
//                   offset="100%"
//                   stopColor={isDark ? "#38bdf8" : "#2563eb"}
//                   stopOpacity={0.02}
//                 />
//               </linearGradient>
//             </defs>

//             {/* KPI: Target reference line */}
//             <ReferenceLine
//               y={metrics.target}
//               stroke={axis.stroke}
//               strokeDasharray="6 6"
//               ifOverflow="extendDomain"
//               label={{
//                 value: `Target ${fmt(metrics.target)}`,
//                 position: "top",
//                 fill: axis.stroke,
//                 fontSize: 12,
//               }}
//             />

//             {/* KPI: highlight last value */}
//             <ReferenceDot
//               x={data[data.length - 1]?.label}
//               y={metrics.last}
//               r={5}
//               fill="var(--primary)"
//               stroke="var(--panel)"
//               strokeWidth={2}
//             />

//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={axis.line}
//               strokeWidth={3}
//               dot={false}
//               activeDot={{ r: 5 }}
//               fill="url(#lcArea)"
//               fillOpacity={1}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <p className="chart-description">
//         Trend with target and key performance indicators.
//       </p>
//     </div>
//   );
// }

// function KpiTile({ label, value, trend }) {
//   const positive = typeof trend === "number" ? trend >= 0 : null;
//   return (
//     <div className="kpi-tile">
//       <div className="kpi-label">{label}</div>
//       <div className="kpi-value">{value}</div>
//       {positive !== null && (
//         <div className={`kpi-delta ${positive ? "up" : "down"}`}>
//           {positive ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
//         </div>
//       )}
//     </div>
//   );
// }

// ********************************************************   LINE CHART   ********************************************************

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ReferenceLine,
//   ReferenceDot,
//   Legend,
// } from "recharts";
// import { useMemo, useState } from "react";
// import { useTheme } from "../theme/ThemeContext";

// // ---------- BASE single-series data you provided ----------
// const baseDatasets = {
//   Week: [
//     { label: "Mon", value: 28000 },
//     { label: "Tue", value: 95000 },
//     { label: "Wed", value: 5000 },
//     { label: "Thu", value: 100000 },
//     { label: "Fri", value: 3000 },
//     { label: "Sat", value: 37000 },
//     { label: "Sun", value: 42000 },
//   ],
//   Month: Array.from({ length: 12 }, (_, i) => ({
//     label: `W${i + 1}`,
//     value: Math.round(22000 + Math.random() * 40000),
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
//     value: Math.round(150000 + Math.random() * 250000),
//   })),
// };

// // ---------- Build MULTI-series (A/B/C) from the chartDataSet ----------
// function buildMulti(range) {
//   const a = baseDatasets[range];

//   // series B (Benchmark): a smoothed moving average +/- 8%
//   const b = a.map((p, i, arr) => {
//     const start = Math.max(0, i - 1),
//       end = Math.min(arr.length - 1, i + 1);
//     const slice = arr.slice(start, end + 1);
//     const avg = slice.reduce((s, r) => s + r.value, 0) / slice.length;
//     const jitter = 0.92 + Math.random() * 0.16; // 0.92..1.08
//     return Math.round(avg * jitter);
//   });

//   // series C (Forecast): trend-bumped version of A with small noise
//   const c = a.map((p, i) => {
//     const trend = 0.88 + (i / Math.max(1, a.length - 1)) * 0.3; // 0.88..1.18
//     const noise = 0.96 + Math.random() * 0.08; // 0.96..1.04
//     return Math.round(p.value * trend * noise);
//   });

//   // unify shape: { label, a, b, c }
//   return a.map((p, i) => ({ label: p.label, a: p.value, b: b[i], c: c[i] }));
// }

// export default function LineChartBox() {
//   const [range, setRange] = useState("Week");
//   const data = useMemo(() => buildMulti(range), [range]);

//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const axis = {
//     stroke: isDark ? "#9aa4af" : "#6b7280",
//     grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
//     cursor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
//     lineA: "var(--primary)", // Current
//     lineB: "var(--series-2, #f59e0b)", // Benchmark
//     lineC: "var(--series-3, #10b981)", // Forecast (emerald)
//   };

//   // ---------- KPIs (based on series A / "Current") ----------
//   const metrics = useMemo(() => {
//     const vals = data.map((d) => d.a);
//     const sum = vals.reduce((a, b) => a + b, 0);
//     const avg = vals.length ? sum / vals.length : 0;
//     const max = vals.length ? Math.max(...vals) : 0;
//     const first = vals[0] ?? 0;
//     const last = vals[vals.length - 1] ?? 0;
//     const trendPct = first ? ((last - first) / first) * 100 : 0;
//     const target = range === "Year" ? Math.round(avg * 1.05) : Math.round(avg);
//     return { sum, avg, max, last, trendPct, target };
//   }, [data, range]);

//   const fmtMoney = (n) => `$${Number(n).toLocaleString()}`;
//   const fmtPct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

//   return (
//     <div className="chart-container">
//       {/* Header */}
//       <div className="chart-header">
//         <h3>Line Chart</h3>
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

//       {/* KPI row (Current series) */}
//       <div className="kpi-row">
//         <KpiTile label="Total Revenue" value={fmtMoney(metrics.sum)} />
//         <KpiTile
//           label="Average / Period"
//           value={fmtMoney(Math.round(metrics.avg))}
//         />
//         <KpiTile label="Peak Revenue" value={fmtMoney(metrics.max)} />
//         <KpiTile
//           label="Growth vs Start"
//           value={fmtPct(metrics.trendPct)}
//           trend={metrics.trendPct}
//         />
//       </div>

//       {/* Chart */}
//       <div className="bar-chart">
//         <ResponsiveContainer width="100%" height={260}>
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 14, bottom: 0, left: 0 }}
//           >
//             <CartesianGrid stroke={axis.grid} vertical={false} />
//             <XAxis
//               dataKey="label"
//               stroke={axis.stroke}
//               tickLine={false}
//               axisLine={{ stroke: axis.stroke }}
//             />
//             <YAxis
//               stroke={axis.stroke}
//               tickLine={false}
//               axisLine={{ stroke: axis.stroke }}
//               tickFormatter={(v) =>
//                 v >= 1_000_000
//                   ? `${Math.round(v / 100_000) / 10}M`
//                   : v >= 1_000
//                   ? `${Math.round(v / 100) / 10}K`.replace(".0", "")
//                   : v
//               }
//             />
//             <Tooltip
//               cursor={{ strokeWidth: 1, fill: axis.cursor }}
//               formatter={(val, key) => [
//                 fmtMoney(val),
//                 key === "a"
//                   ? "Current"
//                   : key === "b"
//                   ? "Benchmark"
//                   : key === "c"
//                   ? "Forecast"
//                   : key,
//               ]}
//               contentStyle={{
//                 background: "var(--panel)",
//                 border: `1px solid var(--border)`,
//                 color: "var(--text)",
//               }}
//             />
//             <Legend
//               verticalAlign="top"
//               height={24}
//               iconType="plainline"
//               formatter={(value) =>
//                 value === "a"
//                   ? "Current"
//                   : value === "b"
//                   ? "Benchmark"
//                   : value === "c"
//                   ? "Forecast"
//                   : value
//               }
//             />

//             {/* Target reference line (KPIs based on Current) */}
//             <ReferenceLine
//               y={metrics.target}
//               stroke={axis.stroke}
//               strokeDasharray="6 6"
//               ifOverflow="extendDomain"
//               label={{
//                 value: `Target ${fmtMoney(metrics.target)}`,
//                 position: "top",
//                 fill: axis.stroke,
//                 fontSize: 12,
//               }}
//             />

//             {/* Highlight last value of Current */}
//             {data.length > 0 && (
//               <ReferenceDot
//                 x={data[data.length - 1].label}
//                 y={metrics.last}
//                 r={5}
//                 fill="var(--primary)"
//                 stroke="var(--panel)"
//                 strokeWidth={2}
//               />
//             )}

//             {/* Soft area for Current only */}
//             <defs>
//               <linearGradient id="lcAreaA" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="0%"
//                   stopColor={isDark ? "#38bdf8" : "#2563eb"}
//                   stopOpacity={0.35}
//                 />
//                 <stop
//                   offset="100%"
//                   stopColor={isDark ? "#38bdf8" : "#2563eb"}
//                   stopOpacity={0.02}
//                 />
//               </linearGradient>
//             </defs>

//             {/* Lines */}
//             <Line
//               type="monotone"
//               dataKey="a"
//               stroke={axis.lineA}
//               strokeWidth={3}
//               dot={false}
//               activeDot={{ r: 5 }}
//               fill="url(#lcAreaA)"
//               fillOpacity={1}
//             />
//             {/* <Line
//               type="monotone"
//               dataKey="b"
//               stroke={axis.lineB}
//               strokeWidth={3}
//               dot={false}
//               activeDot={{ r: 5 }}
//               strokeDasharray="6 6"
//             /> */}
//             <Line
//               type="monotone"
//               dataKey="c"
//               stroke={axis.lineC}
//               strokeWidth={3}
//               dot={false}
//               activeDot={{ r: 5 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <p className="chart-description">
//         Multi-line (Current / Benchmark / Forecast) with KPIs based on Current.
//       </p>
//     </div>
//   );
// }

// function KpiTile({ label, value, trend }) {
//   const positive = typeof trend === "number" ? trend >= 0 : null;
//   return (
//     <div className="kpi-tile">
//       <div className="kpi-label">{label}</div>
//       <div className="kpi-value">{value}</div>
//       {positive !== null && (
//         <div className={`kpi-delta ${positive ? "up" : "down"}`}>
//           {positive ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
//         </div>
//       )}
//     </div>
//   );
// }

// ***************************************************************************************************
// src/components/LineChartBox.jsx
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { useMemo, useState } from "react";
// import { useTheme } from "../theme/ThemeContext";

// // -------- Base single-series data (yours) --------
// const chartDataSet = {
//   Week: [
//     { label: "Mon", value: 5000 },
//     { label: "Tue", value: 100000 },
//     { label: "Wed", value: 5000 },
//     { label: "Thu", value: 100000 },
//     { label: "Fri", value: 3000 },
//     { label: "Sat", value: 37000 },
//     { label: "Sun", value: 42000 },
//   ],
//   Month: Array.from({ length: 12 }, (_, i) => ({
//     label: `W${i + 1}`,
//     value: Math.round(22000 + Math.random() * 40000),
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
//     value: Math.round(150000 + Math.random() * 250000),
//   })),
// };

// // Build two series from chartDataSet: Current (a) + Compare (b)
// function toTwoSeries(range) {
//   const a = chartDataSet[range];
//   // b = smoothed moving average of a with slight jitter (pure front-end)
//   const b = a.map((p, i, arr) => {
//     const s = Math.max(0, i - 1),
//       e = Math.min(arr.length - 1, i + 1);
//     const slice = arr.slice(s, e + 1);
//     const avg = slice.reduce((sum, r) => sum + r.value, 0) / slice.length;
//     const jitter = 0.94 + Math.random() * 0.12; // 0.94–1.06
//     return Math.round(avg * jitter);
//   });
//   return a.map((p, i) => ({ label: p.label, a: p.value, b: b[i] }));
// }

// // nice top for tidy Y axis
// function niceTop(max) {
//   if (max <= 0) return 1000;
//   const pow = 10 ** Math.floor(Math.log10(max));
//   const n = Math.ceil(max / pow);
//   const m = n <= 2 ? 2 : n <= 5 ? 5 : 10;
//   return m * pow;
// }

// // Abbreviate axis ticks (K/M) like the mock
// const fmtK = (n) =>
//   n >= 1_000_000
//     ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
//     : n >= 1_000
//     ? `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
//     : `${n}`;

// export default function LineChartBox() {
//   const [range, setRange] = useState("Week");
//   const series = useMemo(() => toTwoSeries(range), [range]);

//   const { theme } = useTheme();
//   const isDark = theme === "dark"; // not used for card bg; figma wants a white card

//   // Figma tones
//   const axisColor = "rgba(0,0,0,0.24)"; // Y ticks/labels
//   const gridColor = "rgba(0,0,0,0.06)"; // light grid
//   const cyan = "#27D0FC";
//   const mint = "#92FE9D";

//   // compute ticks similar to 5K/3K/1K/0 idea (top, 60%, 20%, 0)
//   const maxY = useMemo(
//     () => Math.max(...series.map((d) => Math.max(d.a, d.b)), 1),
//     [series]
//   );
//   const top = useMemo(() => niceTop(maxY), [maxY]);
//   const yTicks = useMemo(
//     () => [top, Math.round(top * 0.6), Math.round(top * 0.2), 0],
//     [top]
//   );

//   // Year axis shows JAN, MAR, MAY, JUL, SEP, NOV
//   const xTickFormatter = (value, idx) => {
//     if (range !== "Year") return value;
//     const show = [0, 2, 4, 6, 8, 10];
//     return show.includes(idx) ? value.toUpperCase().slice(0, 3) : "";
//   };

//   return (
//     <div className="chart-container ">
//       {/* Header row like your Figma */}
//       <div className="line-figma__header">
//         <div className="line-figma__title">Line Chart</div>
//         <div className="line-figma__pill">
//           <select
//             className="line-figma__select"
//             value={range}
//             onChange={(e) => setRange(e.target.value)}
//             aria-label="Select range"
//           >
//             <option>Week</option>
//             <option>Month</option>
//             <option>Year</option>
//           </select>
//           <span className="line-figma__caret" />
//         </div>
//       </div>

//       {/* Chart */}
//       <div style={{ width: "100%", height: 260 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={series}
//             margin={{ top: 4, right: 10, bottom: 0, left: 0 }}
//           >
//             <CartesianGrid stroke={gridColor} vertical={false} />
//             <XAxis
//               dataKey="label"
//               interval={0}
//               tickFormatter={xTickFormatter}
//               stroke={axisColor}
//               tickLine={false}
//               axisLine={{ stroke: "transparent" }}
//             />
//             <YAxis
//               stroke={axisColor}
//               tickLine={false}
//               axisLine={{ stroke: "transparent" }}
//               ticks={yTicks}
//               tickFormatter={(v) => (v === 0 ? "0" : fmtK(v))}
//               width={36}
//             />
//             <Tooltip
//               cursor={{
//                 stroke: cyan,
//                 strokeWidth: 1,
//                 fill: "rgba(0,0,0,0.04)",
//               }}
//               formatter={(v, key) => [
//                 `$${Number(v).toLocaleString()}`,
//                 key === "a" ? "Current" : "Compare",
//               ]}
//               contentStyle={{
//                 background: "#fff",
//                 border: "1px solid #e5e7eb",
//                 color: "#111827",
//                 borderRadius: 8,
//               }}
//             />
//             <Legend
//               verticalAlign="top"
//               height={24}
//               iconType="plainline"
//               formatter={(v) => (v === "a" ? "Current" : "Compare")}
//             />

//             {/* Lines with small round dots, no area fill (Figma look) */}
//             <Line
//               type="monotone"
//               dataKey="a"
//               name="Current"
//               stroke={cyan}
//               strokeWidth={4}
//               dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: cyan }}
//               activeDot={{ r: 5 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="b"
//               name="Compare"
//               stroke={mint}
//               strokeWidth={4}
//               dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: mint }}
//               activeDot={{ r: 5 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// *******************************************************************

// src/components/LineChartBox.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

/* ============================
   1) SEPARATE DATASETS (A & B)
   ============================ */
const seriesA = {
  Week: [
    { label: "Mon", value: 2000 },
    { label: "Tue", value: 20000 },
    { label: "Wed", value: 1000 },
    { label: "Thu", value: 8000 },
    { label: "Fri", value: 20000 },
    { label: "Sat", value: 3900 },
    { label: "Sun", value: 4500 },
  ],
  Month: Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: Math.round(3000 + Math.random() * 3000),
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
  ].map((m) => ({ label: m, value: Math.round(2600 + Math.random() * 3500) })),
};

const seriesB = {
  Week: [
    { label: "Mon", value: 2000 },
    { label: "Tue", value: 11000 },
    { label: "Wed", value: 16000 },
    { label: "Thu", value: 5100 },
    { label: "Fri", value: 10000 },
    { label: "Sat", value: 1000 },
    { label: "Sun", value: 20000 },
  ],
  Month: Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: Math.round(2800 + Math.random() * 3200),
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
  ].map((m) => ({ label: m, value: Math.round(2400 + Math.random() * 3600) })),
};

// merge by label → [{ label, a, b }]
function mergeByLabel(aArr, bArr) {
  const mapB = new Map(bArr.map((d) => [d.label, d.value]));
  return aArr.map((a) => ({
    label: a.label,
    a: a.value,
    b: mapB.get(a.label) ?? 0,
  }));
}

/* ============================
   2) HELPERS / FORMATTING
   ============================ */
const fmtK = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
    : `${n}`;

function niceTop(max) {
  if (max <= 0) return 1000;
  const pow = 10 ** Math.floor(Math.log10(max));
  const n = Math.ceil(max / pow);
  const m = n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return m * pow;
}

/* ============================
   3) COMPONENT
   ============================ */
export default function LineChartBox() {
  const [range, setRange] = useState("Week");

  // build rows with both series
  const rows = useMemo(
    () => mergeByLabel(seriesA[range], seriesB[range]),
    [range]
  );

  const { theme } = useTheme();
  const isDark = theme === "dark"; // (card itself is white per figma)

  // Figma palette
  const axisColor = "rgba(0,0,0,0.24)";
  const gridColor = "rgba(0,0,0,0.06)";
  const cyan = "#27D0FC"; // series A
  const mint = "#92FE9D"; // series B

  // Y ticks like 5K / 3K / 1K / 0 (generalized)
  const maxY = useMemo(
    () => Math.max(...rows.map((d) => Math.max(d.a, d.b)), 1),
    [rows]
  );
  const top = useMemo(() => niceTop(maxY), [maxY]);
  const yTicks = useMemo(
    () => [top, Math.round(top * 0.6), Math.round(top * 0.2), 0],
    [top]
  );

  // Year axis: show JAN, MAR, MAY, JUL, SEP, NOV (others blank)
  const xTickFormatter = (value, idx) => {
    if (range !== "Year") return value;
    const show = [0, 2, 4, 6, 8, 10];
    return show.includes(idx) ? value.toUpperCase().slice(0, 3) : "";
  };

  return (
    <div className="chart-container">
      {/* Header (Figma) */}
      <div className="chart-header">
        <h3>Line Chart</h3>
        <select
          className="time-filter"
          value={range}
          onChange={(e) => /** change dataset */ setRange(e.target.value)}
        >
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={rows}
            margin={{ top: 4, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="label"
              interval={0}
              tickFormatter={xTickFormatter}
              stroke={axisColor}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
            />
            <YAxis
              stroke={axisColor}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
              ticks={yTicks}
              tickFormatter={(v) => (v === 0 ? "0" : fmtK(v))}
              width={36}
            />
            <Tooltip
              cursor={{
                stroke: cyan,
                strokeWidth: 1,
                fill: "rgba(0,0,0,0.04)",
              }}
              formatter={(v, key) => [
                `$${Number(v).toLocaleString()}`,
                key === "a" ? "Series A" : "Series B",
              ]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                color: "#111827",
                borderRadius: 8,
              }}
            />
            <Legend
              verticalAlign="top"
              height={24}
              iconType="plainline"
              formatter={(v) => (v === "a" ? "Series A" : "Series B")}
            />

            {/* Lines – bold stroke + small round dots (white ring) */}
            <Line
              type="monotone"
              dataKey="a"
              name="Series A"
              stroke={cyan}
              strokeWidth={4}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: cyan }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="b"
              name="Series B"
              stroke={mint}
              strokeWidth={4}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: mint }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
