// // *******************************   SIMPLE FUNNLE CHART  ***************************
// // src/components/FunnelChartBox.jsx
// import { useState } from 'react';

// export default function FunnelChartBox() {
//   const [range, setRange] = useState('Week');

//   return (
//     <div className="chart-container">
//       <div className="chart-header">
//         <h3>Funnel Chart</h3>
//         <select className="time-filter" value={range} onChange={(e) => setRange(e.target.value)}>
//           <option>Week</option>
//           <option>Month</option>
//           <option>Year</option>
//         </select>
//       </div>

//       <div className="funnel-chart">
//         <div className="funnel-step step-1" />
//         <div className="funnel-step step-2" />
//         <div className="funnel-step step-3" />
//       </div>

//       <div className="funnel-legend">
//         <div className="legend-item">
//           <span className="legend-dot manufacturing"></span>
//           <span>Manufacturing</span>
//           <strong>$30,000</strong>
//         </div>
//         <div className="legend-item">
//           <span className="legend-dot marketing"></span>
//           <span>Marketing</span>
//           <strong>$35,000</strong>
//         </div>
//         <div className="legend-item">
//           <span className="legend-dot branding"></span>
//           <span>Branding</span>
//           <strong>$35,000</strong>
//         </div>
//       </div>

//       <p className="chart-description">
//         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//       </p>
//     </div>
//   );
// }

// ************************** Funnel Chart Component ***************************

// src/components/FunnelChartBox.jsx
import { useMemo, useState } from "react";

// ---- Demo data (front-end only) ----
// You can change these numbers anytime
const DATASETS = {
  Week: [
    {
      key: "manufacturing",
      label: "Manufacturing",
      value: 30000,
      color: "var(--funnel-1, #22d3ee)",
    },
    {
      key: "marketing",
      label: "Marketing",
      value: 35000,
      color: "var(--funnel-2, #38bdf8)",
    },
    {
      key: "branding",
      label: "Branding",
      value: 20000,
      color: "var(--funnel-3, #60a5fa)",
    },
  ],
  Month: [
    {
      key: "manufacturing",
      label: "Manufacturing",
      value: 220000,
      color: "var(--funnel-1, #22d3ee)",
    },
    {
      key: "marketing",
      label: "Marketing",
      value: 260000,
      color: "var(--funnel-2, #38bdf8)",
    },
    {
      key: "branding",
      label: "Branding",
      value: 240000,
      color: "var(--funnel-3, #60a5fa)",
    },
  ],
  Year: [
    {
      key: "manufacturing",
      label: "Manufacturing",
      value: 2800000,
      color: "var(--funnel-1, #22d3ee)",
    },
    {
      key: "marketing",
      label: "Marketing",
      value: 3300000,
      color: "var(--funnel-2, #38bdf8)",
    },
    {
      key: "branding",
      label: "Branding",
      value: 3000000,
      color: "var(--funnel-3, #60a5fa)",
    },
  ],
};

export default function FunnelChartBox() {
  const [range, setRange] = useState("Week");

  // Pick current dataset
  const items = useMemo(() => DATASETS[range], [range]);

  // Sort biggest -> smallest so it looks like a funnel
  const sorted = useMemo(
    () => [...items].sort((a, b) => b.value - a.value),
    [items]
  );

  // Compute widths (percent of max) and center each bar
  const maxVal = useMemo(
    () => Math.max(...sorted.map((d) => d.value), 1),
    [sorted]
  );

  // Helpers
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  const formatMoney = (n) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`.replace(".0", "")
      : n >= 1_000
      ? `$${(n / 1_000).toFixed(1)}K`.replace(".0", "")
      : `$${n.toLocaleString()}`;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Funnel Chart</h3>
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

      {/* Bars */}
      <div className="funnel-chart">
        {sorted.map((step) => {
          // width as % of max; keep a visual floor so tiny values still show
          const pct = clamp((step.value / maxVal) * 100, 12, 100);
          const left = (100 - pct) / 2; // center it
          return (
            <div
              key={step.key}
              className="funnel-step"
              style={{
                width: `${pct}%`,
                marginLeft: `${left}%`,
                background: step.color,
              }}
              title={`${step.label}: ${formatMoney(step.value)}`}
            />
          );
        })}
      </div>

      {/* Legend reflects the *actual* (unsorted) order */}
      <div className="funnel-legend">
        {items.map((it) => (
          <div key={it.key} className="legend-item">
            <span className="legend-dot" style={{ background: it.color }} />
            <span>{it.label}</span>
            <strong>{formatMoney(it.value)}</strong>
          </div>
        ))}
      </div>

      <p className="chart-description">
        Values update instantly when switching Week / Month / Year. Widths are
        scaled to the largest category for the selected period.
      </p>
    </div>
  );
}

// *******************************   FUNNEL CHART 2  ***************************

// import { useMemo, useState } from "react";

// // ---- Base WEEK data only (edit these three numbers) ----
// const BASE_WEEK = [
//   {
//     key: "manufacturing",
//     label: "Manufacturing",
//     value: 30000,
//     color: "var(--funnel-1, #22d3ee)",
//   },
//   {
//     key: "marketing",
//     label: "Marketing",
//     value: 35000,
//     color: "var(--funnel-2, #38bdf8)",
//   },
//   {
//     key: "branding",
//     label: "Branding",
//     value: 20000,
//     color: "var(--funnel-3, #60a5fa)",
//   },
// ];

// // Factors to derive Month/Year from Week
// const WEEKS_PER_MONTH = 4.345; // average weeks per month
// const WEEKS_PER_YEAR = 52;

// export default function FunnelChartBox() {
//   const [range, setRange] = useState("Week");

//   // Build items by calculation (no JSON arrays for Month/Year)
//   const items = useMemo(() => {
//     if (range === "Week") {
//       return BASE_WEEK;
//     }

//     if (range === "Month") {
//       // Month: Array.from(...) → calculated from WEEK
//       return Array.from({ length: BASE_WEEK.length }, (_, i) => {
//         const base = BASE_WEEK[i];
//         return {
//           ...base,
//           value: Math.round(base.value * WEEKS_PER_MONTH),
//         };
//       });
//     }

//     // Year: week → year via .map(...)
//     return BASE_WEEK.map((base) => ({
//       ...base,
//       value: Math.round(base.value * WEEKS_PER_YEAR),
//     }));
//   }, [range]);

//   // Optional: sort biggest → smallest for funnel shape
//   const sorted = useMemo(
//     () => [...items].sort((a, b) => b.value - a.value),
//     [items]
//   );

//   // Width scaling vs largest value
//   const maxVal = useMemo(
//     () => Math.max(...sorted.map((d) => d.value), 1),
//     [sorted]
//   );

//   // Helpers
//   const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

//   const formatMoney = (n) =>
//     n >= 1_000_000
//       ? `$${(n / 1_000_000).toFixed(1)}M`.replace(".0", "")
//       : n >= 1_000
//       ? `$${(n / 1_000).toFixed(1)}K`.replace(".0", "")
//       : `$${n.toLocaleString()}`;

//   return (
//     <div className="chart-container">
//       <div className="chart-header">
//         <h3>Funnel Chart</h3>
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

//       {/* Funnel bars */}
//       <div className="funnel-chart">
//         {sorted.map((step) => {
//           // percent width + centered (tapered funnel)
//           const pct = clamp((step.value / maxVal) * 100, 12, 100);
//           const left = (100 - pct) / 2;
//           return (
//             <div
//               key={step.key}
//               className="funnel-step"
//               style={{
//                 width: `${pct}%`,
//                 marginLeft: `${left}%`,
//                 background: step.color,
//               }}
//               title={`${step.label}: ${formatMoney(step.value)}`}
//             />
//           );
//         })}
//       </div>

//       {/* Legend stays in original (unsorted) order */}
//       <div className="funnel-legend">
//         {items.map((it) => (
//           <div key={it.key} className="legend-item">
//             <span className="legend-dot" style={{ background: it.color }} />
//             <span>{it.label}</span>
//             <strong>{formatMoney(it.value)}</strong>
//           </div>
//         ))}
//       </div>

//       <p className="chart-description">
//         Week is the source. Month = Week × 4.345, Year = Week × 52 — computed on
//         the fly.
//       </p>
//     </div>
//   );
// }

// ********************************   FUNNEL CHART 3  ***************************

// // src/components/FunnelChartBox.jsx
// import {
//   ResponsiveContainer,
//   FunnelChart,
//   Funnel,
//   Tooltip,
//   LabelList,
//   Cell,
// } from "recharts";
// import { useMemo, useState } from "react";
// import { useTheme } from "../theme/ThemeContext";

// // --- Base WEEK data only ---
// const WEEK = [
//   { key: "manufacturing", label: "Manufacturing", value: 30000, color: "#22d3ee" },
//   { key: "marketing",     label: "Marketing",     value: 35000, color: "#38bdf8" },
//   { key: "branding",      label: "Branding",      value: 20000, color: "#60a5fa" },
// ];

// // Factors to compute Month / Year from Week (front-end only)
// const WEEKS_PER_MONTH = 4.345;
// const WEEKS_PER_YEAR = 52;

// // Utility formatters
// const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
// const money = (n) =>
//   n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M`.replace(".0", "")
//   : n >= 1_000   ? `$${(n / 1_000).toFixed(1)}K`.replace(".0", "")
//   : `$${n.toLocaleString()}`;

// export default function FunnelChartBox() {
//   const [range, setRange] = useState("Week");
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   const labelFill = isDark ? "#e5e7eb" : "#0f172a";

//   // Build the active dataset by calculation (no static arrays for Month/Year)
//   const items = useMemo(() => {
//     if (range === "Week") return WEEK;
//     if (range === "Month") {
//       return Array.from({ length: WEEK.length }, (_, i) => ({
//         ...WEEK[i],
//         value: Math.round(WEEK[i].value * WEEKS_PER_MONTH),
//       }));
//     }
//     // Year
//     return WEEK.map((it) => ({ ...it, value: Math.round(it.value * WEEKS_PER_YEAR) }));
//   }, [range]);

//   // Sort by value (desc) for a proper “funnel” look
//   const chartData = useMemo(
//     () => [...items].sort((a, b) => b.value - a.value),
//     [items]
//   );

//   // Compute max for legend progress bars (optional visual helper)
//   const maxVal = useMemo(() => Math.max(...chartData.map(d => d.value), 1), [chartData]);

//   return (
//     <div className="chart-container">
//       <div className="chart-header">
//         <h3>Funnel Chart</h3>
//         <select className="time-filter" value={range} onChange={(e) => setRange(e.target.value)}>
//           <option>Week</option>
//           <option>Month</option>
//           <option>Year</option>
//         </select>
//       </div>

//       {/* Recharts Funnel */}
//       <div style={{ width: "100%", height: 280 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <FunnelChart>
//             <Tooltip
//               formatter={(v, _n, extra) => [money(v), extra?.payload?.label]}
//               contentStyle={{
//                 background: "var(--panel)",
//                 border: `1px solid var(--border)`,
//                 color: "var(--text)",
//               }}
//             />
//             <Funnel
//               dataKey="value"
//               nameKey="label"
//               data={chartData}
//               isAnimationActive={true}
//             >
//               {chartData.map((entry) => (
//                 <Cell key={entry.key} fill={entry.color} stroke="none" />
//               ))}
//               {/* Labels on the right (only name; value is in tooltip & legend) */}
//               <LabelList dataKey="label" position="right" fill={labelFill} />
//             </Funnel>
//           </FunnelChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend that shows exact amounts (keeps original order, not sorted) */}
//       <div className="funnel-legend" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
//         {items.map((it) => {
//           const pct = clamp((it.value / maxVal) * 100, 6, 100);
//           return (
//             <div key={it.key} className="legend-item" style={{ display: "grid", gap: 6 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <span className="legend-dot" style={{ width: 10, height: 10, borderRadius: 999, background: it.color }} />
//                 <span>{it.label}</span>
//                 <strong>{money(it.value)}</strong>
//               </div>
//               {/* tiny progress bar */}
//               <div style={{ height: 6, background: "color-mix(in oklab, var(--text) 10%, transparent)", borderRadius: 999 }}>
//                 <div style={{ width: `${pct}%`, height: 6, background: it.color, borderRadius: 999 }} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <p className="chart-description">
//         Week is the source. Month = Week × 4.345, Year = Week × 52 — all computed on the fly.
//       </p>
//     </div>
//   );
// }
