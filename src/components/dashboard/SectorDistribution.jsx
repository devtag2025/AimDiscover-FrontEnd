import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from "recharts";
import { LayoutGrid } from "lucide-react";

const CHART_COLORS = [
  "hsl(270, 70%, 60%)", // Purple
  "hsl(160, 70%, 45%)", // Emerald
  "hsl(200, 80%, 55%)", // Sky
  "hsl(35, 90%, 55%)", // Amber
  "hsl(340, 80%, 60%)", // Pink
  "hsl(25, 90%, 55%)", // Orange
  "hsl(0, 70%, 55%)", // Red
  "hsl(280, 70%, 55%)", // Violet
];

export default function SectorDistribution({ data, activeFilter, onFilter }) {
  if (!data.length) return null;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="w-4 h-4 text-purple-400" />
        <h2 className="text-sm font-medium text-white">Categories</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={42}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    stroke="transparent"
                    style={{
                      cursor: onFilter ? "pointer" : "default",
                      opacity:
                        activeFilter?.type === "category" && activeFilter?.value !== entry.name
                          ? 0.3
                          : 1,
                    }}
                    onClick={() => onFilter?.("category", entry.name)}
                  />
                ))}
              </Pie>
              <ReTooltip
                contentStyle={{
                  backgroundColor: "rgb(17 24 39)",
                  border: "1px solid rgb(31 41 55)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "rgb(229 231 235)",
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-1.5">
          {data.slice(0, 5).map((entry, index) => (
            <button
              key={entry.name}
              onClick={() => onFilter?.("category", entry.name)}
              className={`
                w-full flex items-center gap-2 text-left text-xs px-2 py-1.5 rounded-md transition-colors
                ${
                  activeFilter?.type === "category" && activeFilter?.value === entry.name
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    : "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                }
              `}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span className="truncate flex-1">{entry.name}</span>
              <span className="font-mono text-xs">{entry.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}