import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from "recharts";
import { LayoutGrid } from "lucide-react";



const CHART_COLORS = [
  "hsl(270, 70%, 60%)",   // Purple
  "hsl(160, 70%, 45%)",   // Emerald
  "hsl(200, 80%, 55%)",   // Sky
  "hsl(35, 90%, 55%)",    // Amber
  "hsl(340, 80%, 60%)",   // Pink
  "hsl(25, 90%, 55%)",    // Orange
  "hsl(0, 70%, 55%)",     // Red
  "hsl(280, 70%, 55%)",   // Violet
];

export default function SectorDistribution({ data, activeFilter, onFilter }) {
  if (!data.length) return null;

  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="section-title mb-4">
        <LayoutGrid className="w-4 h-4 text-primary" />
        Sector Distribution
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={40}
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
                      opacity: activeFilter?.type === "category" && activeFilter?.value !== entry.name ? 0.4 : 1,
                    }}
                    onClick={() => onFilter?.("category", entry.name)}
                  />
                ))}
              </Pie>
              <ReTooltip
                contentStyle={{
                  backgroundColor: "hsl(222 47% 8%)",
                  border: "1px solid hsl(217 33% 15%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-1 max-h-24 overflow-y-auto scrollbar-thin">
          {data.slice(0, 5).map((entry, index) => (
            <button
              key={entry.name}
              onClick={() => onFilter?.("category", entry.name)}
              className={`
                w-full flex items-center gap-2 text-left text-xs p-1.5 rounded transition-all
                ${activeFilter?.type === "category" && activeFilter?.value === entry.name
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span className="truncate flex-1">{entry.name}</span>
              <span className="font-mono">{entry.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
