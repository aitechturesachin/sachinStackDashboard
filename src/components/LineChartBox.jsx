import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { useMemo, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

const datasets = {
  Week: [
    { label: "Mon", value: 28000, value2: 25000 },
    { label: "Tue", value: 34000 },
    { label: "Wed", value: 31000 },
    { label: "Thu", value: 39000 },
    { label: "Fri", value: 45000 },
    { label: "Sat", value: 37000 },
    { label: "Sun", value: 42000 },
  ],
  Month: Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: Math.round(22000 + Math.random() * 40000),
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
    value: Math.round(150000 + Math.random() * 250000),
  })),
};

export default function LineChartBox() {
  const [range, setRange] = useState("Week");
  const data = useMemo(() => datasets[range], [range]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const axis = {
    stroke: isDark ? "#9aa4af" : "#6b7280",
    grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cursor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    line: "var(--primary)",
  };

  // ---------- KPIs ----------
  const metrics = useMemo(() => {
    const vals = data.map((d) => d.value);
    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = vals.length ? sum / vals.length : 0;
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const first = vals[0] ?? 0;
    const last = vals[vals.length - 1] ?? 0;
    const trendPct = first ? ((last - first) / first) * 100 : 0;

    // Target defaults to avg; tweak per range if you want different behavior
    const target = range === "Year" ? Math.round(avg * 1.05) : Math.round(avg);

    return {
      sum,
      avg,
      max,
      min,
      first,
      last,
      trendPct,
      target,
    };
  }, [data, range]);

  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  const pct = (n) => `${Math.sign(n) >= 0 ? "+" : ""}${n.toFixed(1)}%`;

  return (
    <div className="chart-container">
      {/* Header */}
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

      {/* KPI row */}
      <div className="kpi-row">
        <KpiTile label="Total" value={fmt(metrics.sum)} />
        <KpiTile label="Average" value={fmt(Math.round(metrics.avg))} />
        <KpiTile label="Max" value={fmt(metrics.max)} />
        <KpiTile
          label="Trend"
          value={pct(metrics.trendPct)}
          trend={metrics.trendPct}
        />
      </div>

      {/* Chart */}
      <div className="bar-chart">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
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
              tickFormatter={(v) =>
                v >= 1_000_000
                  ? `${Math.round(v / 100_000) / 10}M`
                  : v >= 1_000
                  ? `${Math.round(v / 100) / 10}K`.replace(".0", "")
                  : v
              }
            />
            <Tooltip
              cursor={{ stroke: axis.line, strokeWidth: 1, fill: axis.cursor }}
              formatter={(v) => [fmt(v), "Value"]}
              contentStyle={{
                background: "var(--panel)",
                border: `1px solid var(--border)`,
                color: "var(--text)",
              }}
            />

            {/* Soft area under the line */}
            <defs>
              <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isDark ? "#38bdf8" : "#2563eb"}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={isDark ? "#38bdf8" : "#2563eb"}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            {/* KPI: Target reference line */}
            <ReferenceLine
              y={metrics.target}
              stroke={axis.stroke}
              strokeDasharray="6 6"
              ifOverflow="extendDomain"
              label={{
                value: `Target ${fmt(metrics.target)}`,
                position: "top",
                fill: axis.stroke,
                fontSize: 12,
              }}
            />

            {/* KPI: highlight last value */}
            <ReferenceDot
              x={data[data.length - 1]?.label}
              y={metrics.last}
              r={5}
              fill="var(--primary)"
              stroke="var(--panel)"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke={axis.line}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              fill="url(#lcArea)"
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-description">
        Trend with target and key performance indicators.
      </p>
    </div>
  );
}

function KpiTile({ label, value, trend }) {
  const positive = typeof trend === "number" ? trend >= 0 : null;
  return (
    <div className="kpi-tile">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {positive !== null && (
        <div className={`kpi-delta ${positive ? "up" : "down"}`}>
          {positive ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
        </div>
      )}
    </div>
  );
}
