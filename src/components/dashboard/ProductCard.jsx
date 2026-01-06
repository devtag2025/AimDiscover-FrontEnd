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
        group relative rounded-lg border transition-all duration-200 cursor-pointer
        ${compact ? "p-2.5" : "p-3"}
        ${
          isSelected
            ? "bg-purple-500/10 border-purple-500/30 shadow-sm"
            : "bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex-shrink-0 rounded-md flex items-center justify-center font-semibold transition-colors
            ${compact ? "w-9 h-9 text-xs" : "w-10 h-10 text-sm"}
            ${
              isSelected
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
            }
          `}
        >
          {(product?.name?.charAt(0) ?? "?").toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={`font-medium truncate ${compact ? "text-xs" : "text-sm"} ${
                isSelected ? "text-white" : "text-gray-200"
              }`}
            >
              {product?.name ?? "Untitled"}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <TrendingUp
                className={`w-3 h-3 ${
                  score >= 70
                    ? "text-purple-400"
                    : score >= 40
                    ? "text-purple-300"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`font-mono font-semibold ${compact ? "text-xs" : "text-sm"} ${
                  isSelected ? "text-purple-400" : "text-gray-400"
                }`}
              >
                {score}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300`}
            >
              {product?.category ?? "Unknown"}
            </span>
            <span className="text-[10px] text-gray-500">{getTimeAgo(product?.spike_started_at)}</span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-2.5 h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${clamp0to100(score)}%` }}
          />
        </div>
      )}
    </div>
  );
}