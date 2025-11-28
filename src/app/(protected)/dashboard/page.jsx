"use client";
import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Globe,
  Clock,
  PieChart,
  LayoutGrid,
  Twitter,
  Activity,
  Search,
  Filter,
  X,
  Zap,
  MousePointer2,
} from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from "recharts";
import { useGetAnalytics } from "@/hooks/useGrok";
import { formatDistanceToNow } from "date-fns";
import SpikeTime from "@/components/dashboard/SparkTime";
import { withAuth } from "@/components/common/withAuth";
// --- CONSTANTS ---
const COUNTRY_NAMES = {
  US: "United States",
  UK: "United Kingdom",
  JP: "Japan",
  IN: "India",
  DE: "Germany",
  KR: "South Korea",
  CA: "Canada",
  AU: "Australia",
  NO: "Norway",
  FR: "France",
  IT: "Italy",
  BR: "Brazil",
  SG: "Singapore",
  ZA: "South Africa",
  CN: "China",
};

const CHART_COLORS = [
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#ddd6fe",
  "#ede9fe",
  "#7c3aed",
  "#6d28d9",
];

// Helper function to parse sentiment string
const parseSentiment = (sentimentStr) => {
  if (!sentimentStr)
    return { positive: 0, neutral: 0, negative: 0, label: "Unknown" };

  // Extract percentages using regex
  const positiveMatch = sentimentStr.match(/(\d+)%\s*positive/i);
  const neutralMatch = sentimentStr.match(/(\d+)%\s*neutral/i);
  const negativeMatch = sentimentStr.match(/(\d+)%\s*negative/i);

  // Extract label (Positive, Negative, Neutral, Mixed)
  const labelMatch = sentimentStr.match(/^(\w+)/);

  return {
    positive: positiveMatch ? parseInt(positiveMatch[1]) : 0,
    neutral: neutralMatch ? parseInt(neutralMatch[1]) : 0,
    negative: negativeMatch ? parseInt(negativeMatch[1]) : 0,
    label: labelMatch ? labelMatch[1] : "Unknown",
  };
};

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  const { data, isLoading, error, isError } = useGetAnalytics();

  // Extract products array from the hook data
  const products = data?.data.products|| [];
  console.log(products);
  // Initialize selectedProduct with first product
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);

  // Update selectedProduct when products load
  React.useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  // Hooks: totalMentions, filteredProducts, chartData
  const totalMentions = useMemo(
    () =>
      products.reduce(
        (acc, p) =>
          acc +
          (p.signals_from?.web || 0) +
          (p.signals_from?.news || 0) +
          (p.signals_from?.twitter || 0),
        0
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (!activeFilter.type) return products;
    return products.filter((p) => {
      if (activeFilter.type === "category")
        return p.category.startsWith(activeFilter.value);
      if (activeFilter.type === "country")
        return p.top_countries.includes(activeFilter.value);
      return true;
    });
  }, [activeFilter, products]);

  const categoryChartData = useMemo(() => {
    const dataMap = {};
    products.forEach((p) => {
      const cat = p.category.split(" - ")[0];
      dataMap[cat] = (dataMap[cat] || 0) + 1;
    });
    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  }, [products]);

  // Handlers
  const handleFilter = (type, value) => {
    if (activeFilter.type === type && activeFilter.value === value) {
      setActiveFilter({ type: null, value: null });
    } else {
      setActiveFilter({ type, value });
    }
  };

  const clearFilter = (e) => {
    e.stopPropagation();
    setActiveFilter({ type: null, value: null });
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-purple-500/30 p-4 md:p-8">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-96 bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/60 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Live Intelligence
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Market Pulse
            </h1>
            <p className="text-slate-500 text-sm">
              Real-time analysis of {products.length} active high-momentum
              assets.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-8 pl-8 md:border-l border-slate-800/60">
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-medium">
                  Total Signals
                </div>
                <div className="text-xl font-medium text-white">
                  {totalMentions.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-medium">
                  Active Filter
                </div>
                <div
                  className={`text-sm font-medium ${
                    activeFilter.type ? "text-purple-400" : "text-slate-600"
                  }`}
                >
                  {activeFilter.type ? `${activeFilter.value}` : "None"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2 h-10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                Trending Assets
                <span className="text-xs font-normal text-slate-500 ml-2">
                  ({filteredProducts.length} items)
                </span>
              </h2>

              {/* Active Filter Banner */}
              {activeFilter.type && (
                <div
                  onClick={clearFilter}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs cursor-pointer hover:bg-purple-500/20 transition-all group"
                >
                  <Filter className="w-3 h-3" />
                  <span>
                    Filtered by{" "}
                    {activeFilter.type === "category" ? "Sector" : "Region"}:{" "}
                    <b>{activeFilter.value}</b>
                  </span>
                  <X className="w-3 h-3 ml-1 group-hover:text-white" />
                </div>
              )}
            </div>

            <div className="grid gap-3 min-h-[500px] content-start">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                  <Activity className="w-8 h-8 text-purple-500 mb-2 animate-pulse" />
                  <p className="text-slate-500">Loading market data...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => {
                  const isSelected = selectedProduct?.name === product.name;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedProduct(product)}
                      className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 border-purple-500/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.15)] scale-[1.01]"
                          : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <div
                            className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-colors ${
                              isSelected
                                ? "bg-purple-500 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {product.name.charAt(0)}
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-base mb-1 ${
                                isSelected ? "text-white" : "text-slate-300"
                              }`}
                            >
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span
                                className={`px-1.5 py-0.5 rounded ${
                                  isSelected
                                    ? "bg-purple-500/20 text-purple-300"
                                    : "bg-slate-800"
                                }`}
                              >
                                {product.category}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                    {console.log(product.spike_started_at)},
                              <SpikeTime
                                spike_started_at={product.spike_started_at}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-lg font-bold font-mono ${
                              isSelected ? "text-purple-400" : "text-slate-400"
                            }`}
                          >
                            {product.momentum_score}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-600">
                            Velocity
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-4 h-0.5 w-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-purple-500 animate-[loading_1s_ease-in-out]"
                            style={{ width: `${product.momentum_score}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                  <Search className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-slate-500">
                    No assets found for this filter.
                  </p>
                  <button
                    onClick={clearFilter}
                    className="mt-4 text-sm text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-5 relative h-full">
            <div className="sticky top-6 space-y-6">
              {/* 1. Deep Dive Analysis Card */}
              {selectedProduct ? (
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-slate-700/80">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/50">
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-purple-400" />
                      Insight Analysis
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                      <span className="text-xs text-purple-300 font-medium">
                        Live Selection
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
                        {selectedProduct.name}
                      </h4>
                      <div className="group relative p-4 bg-slate-950/50 rounded-lg border border-slate-800/50 hover:border-purple-500/20 transition-colors">
                        <Zap className="w-4 h-4 text-yellow-500 absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm text-slate-400 leading-relaxed pr-6">
                          <span className="text-purple-400 font-bold mr-1">
                            Driver:
                          </span>
                          {selectedProduct.trend_reason}
                        </p>
                      </div>
                    </div>

                    {/* Sentiment Bar - Interactive */}
                    {(() => {
                      const sentimentData = parseSentiment(
                        selectedProduct.sentiment
                      );
                      return (
                        <div className="group cursor-help">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                              Market Sentiment Breakdown
                            </span>
                            <span
                              className={
                                sentimentData.positive > 60
                                  ? "text-emerald-400"
                                  : "text-slate-300"
                              }
                            >
                              {sentimentData.label}
                            </span>
                          </div>
                          <div className="flex w-full h-3 rounded-full overflow-hidden gap-0.5 bg-slate-800">
                            <div
                              className="bg-emerald-500/80 hover:bg-emerald-400 transition-colors relative"
                              style={{ width: `${sentimentData.positive}%` }}
                              title={`Positive: ${sentimentData.positive}%`}
                            />
                            <div
                              className="bg-slate-600 hover:bg-slate-500 transition-colors relative"
                              style={{ width: `${sentimentData.neutral}%` }}
                              title={`Neutral: ${sentimentData.neutral}%`}
                            />
                            <div
                              className="bg-rose-500/80 hover:bg-rose-400 transition-colors relative"
                              style={{ width: `${sentimentData.negative}%` }}
                              title={`Negative: ${sentimentData.negative}%`}
                            />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900 transition-colors group cursor-default">
                        <div className="text-slate-500 text-xs mb-1 group-hover:text-purple-400 transition-colors">
                          Growth Spike
                        </div>
                        <div className="text-xl font-mono text-white flex items-center gap-1">
                          +{selectedProduct.mention_spike_percent}%
                          <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Interactive Source Box */}
                      <div className="relative group p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900 transition-colors cursor-help">
                        <div className="text-slate-500 text-xs mb-1 group-hover:text-purple-400 transition-colors">
                          Top Source
                        </div>
                        <div className="text-xl font-mono text-white flex items-center gap-2">
                          <Twitter className="w-4 h-4 text-sky-500" />
                          <span className="text-base">Social Media</span>
                        </div>

                        {/* Hover Popover for Breakdown */}
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-20">
                          <div className="text-xs font-bold text-slate-300 mb-2 border-b border-slate-700 pb-1">
                            Signal Distribution
                          </div>
                          <div className="space-y-1">
                            {Object.entries(selectedProduct.signals_from).map(
                              ([key, val]) => (
                                <div
                                  key={key}
                                  className="flex justify-between text-xs text-slate-400"
                                >
                                  <span className="capitalize">{key}</span>
                                  <span className="text-white font-mono">
                                    {val}%
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Geographic Tags - Interactive Filter */}
                    <div>
                      <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Regional Hotspots{" "}
                        <span className="text-[10px] text-slate-600 ml-1">
                          (Click to filter)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.top_countries.map((c, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilter("country", c);
                            }}
                            title={`Filter by ${COUNTRY_NAMES[c] || c}`}
                            className={`px-2.5 py-1 rounded text-xs font-medium border transition-all duration-200 flex items-center gap-1
                                    ${
                                      activeFilter.type === "country" &&
                                      activeFilter.value === c
                                        ? "bg-purple-500 text-white border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600"
                                    }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl">
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <LayoutGrid className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-slate-500">
                      Select an asset to view detailed insights
                    </p>
                  </div>
                </div>
              )}

              {/* 2. Interactive Sector Distribution */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Sector Distribution
                  </h3>
                  <MousePointer2 className="w-3 h-3 text-slate-600" />
                </div>

                <div className="flex items-center gap-4">
                  {/* Interactive Donut Chart */}
                  <div className="h-32 w-32 relative group">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          onClick={(data) =>
                            handleFilter("category", data.name)
                          }
                          cursor="pointer"
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                              opacity={
                                activeFilter.type === "category" &&
                                activeFilter.value !== entry.name
                                  ? 0.3
                                  : 1
                              }
                              stroke={
                                activeFilter.type === "category" &&
                                activeFilter.value === entry.name
                                  ? "#fff"
                                  : "none"
                              }
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <ReTooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            borderColor: "#334155",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <PieChart
                        className={`w-5 h-5 text-purple-500/50 transition-opacity ${
                          activeFilter.type === "category"
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Interactive Legend */}
                  <div className="flex-1 space-y-2">
                    {categoryChartData.slice(0, 3).map((cat, i) => {
                      const isActive =
                        activeFilter.type === "category" &&
                        activeFilter.value === cat.name;
                      const isDimmed =
                        activeFilter.type === "category" && !isActive;

                      return (
                        <div
                          key={i}
                          onClick={() => handleFilter("category", cat.name)}
                          className={`flex items-center justify-between text-xs cursor-pointer p-1 rounded transition-all duration-200
                                        ${
                                          isActive
                                            ? "bg-slate-800 ring-1 ring-purple-500/50"
                                            : "hover:bg-slate-800/50"
                                        }
                                        ${
                                          isDimmed
                                            ? "opacity-40"
                                            : "opacity-100"
                                        }
                                    `}
                        >
                          <span className="flex items-center gap-2 text-slate-400">
                            <span
                              className={`w-2 h-2 rounded-full transition-all ${
                                isActive
                                  ? "scale-125 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                                  : ""
                              }`}
                              style={{ background: CHART_COLORS[i] }}
                            ></span>
                            <span
                              className={
                                isActive ? "text-white font-medium" : ""
                              }
                            >
                              {cat.name}
                            </span>
                          </span>
                          <span className="text-white font-mono bg-slate-800 px-1.5 rounded text-[10px]">
                            {cat.value}
                          </span>
                        </div>
                      );
                    })}
                    {categoryChartData.length > 3 && (
                      <div className="text-[10px] text-slate-600 pl-1 pt-1 italic">
                        +{categoryChartData.length - 3} more sectors
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default (Dashboard);
