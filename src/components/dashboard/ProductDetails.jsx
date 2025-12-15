import { Zap, X, ChevronDown } from "lucide-react";
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
    <div className={`space-y-4 ${isMobile ? '' : 'animate-slide-in-right'}`}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 border border-purple-500/30 text-purple-300">{product.category}</span>
              <span className="text-2xl font-bold font-mono text-purple-400">{product.momentum_score}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">velocity</span>
            </div>
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {product.trend_reason && (
          <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-purple-400 font-semibold uppercase">Trend Driver</span>
                <p className="text-sm text-gray-300 mt-1">{product.trend_reason}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Cards */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
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
