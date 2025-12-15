import { AlertTriangle, AlertCircle } from "lucide-react";
import DetailSection from "./DetailSection";



export default function RiskAssessmentCard({ data, collapsible = false }) {
  const getLongevityStyle = (longevity) => {
    if (longevity?.includes("Sustainable")) return "bg-purple-500/20 border-purple-500/30 text-purple-300";
    if (longevity?.includes("Short-term")) return "bg-purple-400/20 border-purple-400/30 text-purple-200";
    return "bg-white/10 border-white/20 text-gray-300";
  };

  return (
    <DetailSection
      icon={<AlertTriangle className="w-4 h-4" />}
      title="Risk Analysis"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <div className="space-y-3">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Trend Longevity</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getLongevityStyle(data?.trend_longevity)}`}>
              {data?.trend_longevity || "N/A"}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Seasonality: {data?.seasonality_risk || "Unknown"}
          </div>
        </div>

        {data?.red_flags_to_watch?.length ? (
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-xs text-purple-400 font-medium mb-2">Red Flags</div>
            <ul className="space-y-1">
              {data.red_flags_to_watch.map((flag, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-purple-400 flex-shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </DetailSection>
  );
}
