import { DollarSign } from "lucide-react";
import DetailSection from "./DetailSection";


export default function ProfitAnalysisCard({ data, collapsible = false }) {
  return (
    <DetailSection
      icon={<DollarSign className="w-4 h-4" />}
      title="Profit Potential"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
          <span className="text-sm text-gray-400">COGS (Cost)</span>
          <span className="text-sm font-mono text-white">
            {data?.estimated_cogs || "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
          <span className="text-sm text-gray-400">Retail Price</span>
          <span className="text-sm font-mono text-white">
            {data?.suggested_retail_price || "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <span className="text-sm text-purple-400 font-medium">Net Margin</span>
          <span className="text-lg font-bold font-mono text-purple-400">
            {data?.net_margin_estimate || "N/A"}
          </span>
        </div>
        <div className="text-xs text-gray-500 pt-1">
          Break-even: {data?.break_even_units || "N/A"} units
        </div>
      </div>
    </DetailSection>
  );
}
