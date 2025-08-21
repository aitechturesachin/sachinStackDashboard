import { useMemo, useState } from "react";

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
