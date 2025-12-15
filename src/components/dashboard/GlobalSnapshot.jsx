import { Activity } from "lucide-react";


const PLATFORM_STYLES = {
  Amazon: { label: "Amazon", className: "bg-purple-500/15 border-purple-500/30 text-purple-300" },
  "TikTok Shop": { label: "TikTok Shop", className: "bg-purple-400/15 border-purple-400/30 text-purple-300" },
  TikTok: { label: "TikTok", className: "bg-purple-400/15 border-purple-400/30 text-purple-300" },
  Shopify: { label: "Shopify", className: "bg-purple-600/15 border-purple-600/30 text-purple-300" },
  Walmart: { label: "Walmart", className: "bg-purple-500/15 border-purple-500/30 text-purple-300" },
  eBay: { label: "eBay", className: "bg-purple-400/15 border-purple-400/30 text-purple-300" },
  Instagram: { label: "Instagram", className: "bg-purple-500/15 border-purple-500/30 text-purple-300" },
  YouTube: { label: "YouTube", className: "bg-purple-600/15 border-purple-600/30 text-purple-300" },
  Reddit: { label: "Reddit", className: "bg-purple-400/15 border-purple-400/30 text-purple-300" },
  Google: { label: "Google", className: "bg-purple-500/15 border-purple-500/30 text-purple-300" },
  Twitter: { label: "Twitter", className: "bg-purple-400/15 border-purple-400/30 text-purple-300" },
  X: { label: "X", className: "bg-white/5 border-white/10 text-gray-300" },
};

const getPlatformStyle = (name) => {
  const key = (name ?? "").trim();
  return PLATFORM_STYLES[key] ?? {
    label: key || "Unknown",
    className: "bg-white/5 border-white/10 text-gray-400",
  };
};

export default function GlobalSnapshot({
  summary,
  platforms,
  sentiment,
  assumptions,
  generatedAt,
  isLoading,
}) {
  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:p-6 hover:border-purple-500/30 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
          Global Snapshot
        </div>
        {generatedAt && (
          <span className="text-xs text-gray-500">{generatedAt}</span>
        )}
      </div>

      <p className="text-sm text-gray-400 leading-relaxed">
        {summary ?? (isLoading ? "Loading summary..." : "—")}
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Platforms */}
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Platforms</div>
          <div className="flex flex-wrap gap-2">
            {platforms.length ? (
              platforms.map((p) => {
                const style = getPlatformStyle(p);
                return (
                  <span
                    key={p}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium border ${style.className}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current opacity-80" />
                    {style.label}
                  </span>
                );
              })
            ) : (
              <span className="text-sm text-gray-500">—</span>
            )}
          </div>
        </div>

        {/* Sentiment */}
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Global Sentiment</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-purple-400">
              {sentiment?.global_score != null ? sentiment.global_score : "—"}
            </span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
          {sentiment?.remarks && (
            <div className="text-xs text-gray-500 mt-1">{sentiment.remarks}</div>
          )}
        </div>
      </div>

      {assumptions.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs text-gray-500 hover:text-purple-400 transition-colors">
            View assumptions ({assumptions.length})
          </summary>
          <ul className="mt-2 space-y-1 text-xs text-gray-500 list-disc pl-4">
            {assumptions.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
