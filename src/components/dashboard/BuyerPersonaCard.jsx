import { Users } from "lucide-react";
import DetailSection from "./DetailSection";



export default function BuyerPersonaCard({ data, collapsible = false }) {
  return (
    <DetailSection
      icon={<Users className="w-4 h-4" />}
      title="Target Customer"
      iconColor="text-purple-400"
      collapsible={collapsible}
    >
      <div className="space-y-3">
        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
          <div className="text-xs text-purple-400 font-medium mb-1">Demographics</div>
          <div className="text-sm text-white">
            {data?.primary_demographic || "N/A"}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-500 mb-2">Buying Triggers</div>
          <div className="flex flex-wrap gap-2">
            {data?.buying_triggers?.length ? (
              data.buying_triggers.map((trigger, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 border border-purple-500/30 text-purple-300"
                >
                  {trigger}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">N/A</span>
            )}
          </div>
        </div>
      </div>
    </DetailSection>
  );
}
