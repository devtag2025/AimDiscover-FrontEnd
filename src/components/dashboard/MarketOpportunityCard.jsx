import { TrendingUp } from "lucide-react";
import DetailSection from "./DetailSection";


export default function MarketOpportunityCard({ data, collapsible = false }) {
  return (
    <DetailSection
      icon={<TrendingUp className="w-4 h-4" />}
      title="Market Opportunity"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-500 uppercase tracking-wider">TAM (Total Market)</div>
          <div className="text-lg font-semibold text-white mt-1">
            {data?.tam || "N/A"}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Growth Rate</div>
          <div className="text-lg font-semibold text-purple-400 mt-1">
            {data?.growth_rate || "N/A"}
          </div>
        </div>
      </div>
      <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="text-xs text-purple-400 font-medium">Market Stage</div>
        <div className="text-sm text-white mt-1">
          {data?.market_maturity || "Unknown"}
        </div>
      </div>
    </DetailSection>
  );
}
