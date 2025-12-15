import { TrendingUp } from "lucide-react";



const clamp0to100 = (value) => Math.max(0, Math.min(100, Number(value ?? 0)));

const getTimeAgo = (dateStr) => {
  if (!dateStr) return "Recently";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return "Just now";
};

export default function ProductCard({ product, isSelected, onClick, compact = false }) {
  const score = product?.momentum_score ?? 0;
  
  return (
    <div
      onClick={onClick}
      className={`
        group relative rounded-xl border transition-all duration-300 cursor-pointer
        ${compact ? 'p-3' : 'p-4'}
        ${isSelected
          ? "bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20 scale-[1.02]"
          : "bg-black/50 backdrop-blur-xl border-white/10 hover:border-purple-500/30 hover:scale-[1.01]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex-shrink-0 rounded-lg flex items-center justify-center font-bold transition-colors
            ${compact ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-lg'}
            ${isSelected
              ? "bg-gradient-to-br from-purple-600 to-purple-400 text-white"
              : "bg-white/5 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400"
            }
          `}
        >
          {(product?.name?.charAt(0) ?? "?").toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-semibold truncate ${compact ? 'text-sm' : 'text-base'} ${isSelected ? "text-white" : "text-gray-300"}`}>
              {product?.name ?? "Untitled"}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <TrendingUp className={`w-3 h-3 ${score >= 70 ? 'text-purple-400' : score >= 40 ? 'text-purple-300' : 'text-gray-500'}`} />
              <span className={`font-mono font-bold ${compact ? 'text-sm' : 'text-lg'} ${isSelected ? "text-purple-400" : "text-gray-400"}`}>
                {score}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 border border-purple-500/30 text-purple-300 ${compact ? 'text-[10px] px-2 py-0.5' : ''}`}>
              {product?.category ?? "Unknown"}
            </span>
            <span className="text-[10px] text-gray-500">
              {getTimeAgo(product?.spike_started_at)}
            </span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${clamp0to100(score)}%` }}
          />
        </div>
      )}
    </div>
  );
}
