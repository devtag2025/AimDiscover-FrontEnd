import { TrendingUp, ChevronDown } from "lucide-react";
import MarketOpportunityCard from "./MarketOpportunityCard";
import ProfitAnalysisCard from "./ProfitAnalysisCard";
import BuyerPersonaCard from "./BuyerPersonaCard";
import CompetitiveLandscapeCard from "./CompetitiveLandscapeCard";
import RiskAssessmentCard from "./RiskAssessmentCard";
import ActionableInsightsCard from "./ActionableInsightsCard";

export default function ProductDetails({ product, onClose, isMobile = false }) {
  if (!product) return null;

  const analysis = product.detailed_analysis;
  const collapsible = isMobile;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-white truncate">{product.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Score</span>
                <span className="text-lg font-semibold font-mono text-purple-400">
                  {product.momentum_score}
                </span>
              </div>
            </div>
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {product.trend_reason && (
          <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">
                  Why it's trending
                </span>
                <p className="text-sm text-gray-300 mt-1">{product.trend_reason}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Cards */}
      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"}`}>
        <MarketOpportunityCard data={analysis?.market_opportunity} collapsible={collapsible} />
        <ProfitAnalysisCard data={analysis?.profit_analysis} collapsible={collapsible} />
      </div>

      <BuyerPersonaCard data={analysis?.buyer_persona} collapsible={collapsible} />
      <CompetitiveLandscapeCard data={analysis?.competitive_landscape} collapsible={collapsible} />
      <RiskAssessmentCard data={analysis?.risk_assessment} collapsible={collapsible} />
      <ActionableInsightsCard data={analysis?.actionable_insights} collapsible={collapsible} />
    </div>
  );
}