import { Target, ChevronRight } from "lucide-react";
import DetailSection from "./DetailSection";


export default function CompetitiveLandscapeCard({ data, collapsible = false }) {
  const getCompetitionStyle = (level) => {
    if (level === "High") return "bg-purple-600/20 border-purple-600/30 text-purple-300";
    if (level === "Medium") return "bg-purple-500/20 border-purple-500/30 text-purple-300";
    return "bg-purple-400/20 border-purple-400/30 text-purple-200";
  };

  return (
    <DetailSection
      icon={<Target className="w-4 h-4" />}
      title="Competition"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Competition Level</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getCompetitionStyle(data?.competition_level)}`}>
            {data?.competition_level || "N/A"}
          </span>
        </div>
        
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-500 mb-2">Top Sellers</div>
          <ul className="space-y-1">
            {data?.top_sellers?.length ? (
              data.top_sellers.map((seller, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-purple-400" />
                  {seller}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">N/A</li>
            )}
          </ul>
        </div>

        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-xs text-purple-400 font-medium mb-2">Price Points</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Low: </span>
              <span className="text-white font-mono">{data?.average_price_points?.low || "N/A"}</span>
            </div>
            <div>
              <span className="text-gray-500">Mid: </span>
              <span className="text-white font-mono">{data?.average_price_points?.mid || "N/A"}</span>
            </div>
            <div>
              <span className="text-gray-500">Premium: </span>
              <span className="text-white font-mono">{data?.average_price_points?.premium || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </DetailSection>
  );
}
