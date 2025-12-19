import MarkdownRenderer from "./MarkdownRenderer";
import * as LucideIcons from "lucide-react";

export default function InsightsCard({
  insights,
  isAnalyzing,
  onGenerate3D,
  onRefine,
  conversationHistory,
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700">
      <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-purple-500/30 via-indigo-500/20 to-transparent shadow-2xl">
        <div className="relative bg-[#050509] rounded-xl p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.1),rgba(255,255,255,0))] rounded-xl" />
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
                  <LucideIcons.FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Market Analysis & Insights
                  </h2>
                  <p className="text-xs text-gray-400">
                    {conversationHistory.length > 1
                      ? `Refined ${Math.floor((conversationHistory.length - 1) / 2)} time(s)`
                      : "Initial analysis"}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                ✓ Analysis Complete
              </span>
            </div>

            {/* Insights Content */}
            <div className="prose prose-invert max-w-none mb-6">
              <MarkdownRenderer content={insights} />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Generate 3D Button (Primary Action) */}
                <button
                  onClick={onGenerate3D}
                  disabled={isAnalyzing}
                  className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 border border-purple-500/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LucideIcons.Box className="h-5 w-5" />
                    <span>Generate 3D Model</span>
                    <LucideIcons.Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Refine Button (Secondary Action) */}
                <button
                  onClick={onRefine}
                  disabled={isAnalyzing}
                  className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LucideIcons.MessageSquare className="h-5 w-5" />
                    <span>Refine Insights</span>
                  </div>
                </button>

              </div>

              {/* Helper Text */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Satisfied with these insights? Generate a 3D model. Want changes? Click "Refine Insights"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}