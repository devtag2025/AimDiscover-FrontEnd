import { Zap } from "lucide-react";
import DetailSection from "./DetailSection";



export default function ActionableInsightsCard({ data, collapsible = false }) {
  return (
    <DetailSection
      icon={<Zap className="w-4 h-4" />}
      title="Next Steps"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <ol className="space-y-3">
        {data?.immediate_next_steps?.length ? (
          data.immediate_next_steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-gray-300 flex-1 pt-0.5">
                {step}
              </span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">No action items available</li>
        )}
      </ol>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Expected ROI Timeline</span>
          <span className="text-purple-400 font-medium">
            {data?.expected_roi_timeline || "N/A"}
          </span>
        </div>
      </div>
    </DetailSection>
  );
}
