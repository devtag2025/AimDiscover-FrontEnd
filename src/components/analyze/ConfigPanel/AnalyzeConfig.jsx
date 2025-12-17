"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Loader } from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  REGIONS,
  PRODUCT_TYPES,
  SIZE_CONSTRAINTS,
  GATED_CATEGORIES,
  SEASONALITY_OPTIONS,
  MAX_COGS_OPTIONS,
  MIN_RETAIL_PRICE_OPTIONS,
  MIN_MARGIN_OPTIONS,
  MAX_STARTUP_COSTS,
  MAX_CAC_OPTIONS,
  MIN_CLV_OPTIONS,
  MIN_MARKET_SIZE_OPTIONS,
  MIN_YOY_GROWTH_OPTIONS,
  MIN_SEARCH_VOLUME_OPTIONS,
  MIN_VIRALITY_OPTIONS,
  PLATFORM_FOCUS_OPTIONS,
  MAX_COMPETITION_OPTIONS,
  MAX_AMAZON_LISTINGS_OPTIONS,
  MAX_DTC_BRANDS_OPTIONS,
  MAX_MOQ_OPTIONS,
  MAX_LEAD_TIME_OPTIONS,
  SUPPLIER_CERT_OPTIONS,
  NUMBER_OF_PRODUCTS_OPTIONS,
  RISK_TOLERANCE_OPTIONS,
  OUTPUT_DETAIL_OPTIONS,
  DEFAULT_ANALYSIS_CONFIG,
} from "@/utils/AnalyzeOptions";

const Icons = {
  Sparkles: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
};

export default function AnalyzeConfig({
  categories = [],
  isLoading = false,
  isAnalyzing = false,
  error = null,
  onAnalyze,
}) {
  // Core fields
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [artStyle, setArtStyle] = useState("realistic");

  // Analysis configuration
  const [analysisConfig, setAnalysisConfig] = useState(DEFAULT_ANALYSIS_CONFIG);

  const updateConfig = (key, value) => {
    setAnalysisConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!categoryId) {
      return;
    }

    // Get actual values from IDs
    const regionName = REGIONS[analysisConfig.region] || analysisConfig.region;

    const payload = {
      categoryId:categoryId,
      productName: productName || undefined,
      artStyle,

      // Product & Niche
      productType: PRODUCT_TYPES.find((p) => p.id === analysisConfig.productType)?.label,
      sizeConstraint: SIZE_CONSTRAINTS.find((s) => s.id === analysisConfig.sizeConstraint)?.description,
      gatedPreference: GATED_CATEGORIES.find((g) => g.id === analysisConfig.gatedPreference)?.label,
      seasonality: SEASONALITY_OPTIONS.find((s) => s.id === analysisConfig.seasonality)?.label,

      // Financials
      maxCogs: MAX_COGS_OPTIONS.find((c) => c.id === analysisConfig.maxCogs)?.value,
      minRetailPrice: MIN_RETAIL_PRICE_OPTIONS.find((r) => r.id === analysisConfig.minRetailPrice)?.value,
      minMargin: MIN_MARGIN_OPTIONS.find((m) => m.id === analysisConfig.minMargin)?.value,
      maxStartup: MAX_STARTUP_COSTS.find((s) => s.id === analysisConfig.maxStartup)?.value,
      maxCAC: MAX_CAC_OPTIONS.find((c) => c.id === analysisConfig.maxCAC)?.value,
      minCLV: MIN_CLV_OPTIONS.find((c) => c.id === analysisConfig.minCLV)?.value,

      // Market & Demand
      region: regionName,
      minMarketSize: MIN_MARKET_SIZE_OPTIONS.find((m) => m.id === analysisConfig.minMarketSize)?.value,
      minGrowth: MIN_YOY_GROWTH_OPTIONS.find((g) => g.id === analysisConfig.minGrowth)?.value,
      minSearchVolume: MIN_SEARCH_VOLUME_OPTIONS.find((s) => s.id === analysisConfig.minSearchVolume)?.value,
      minVirality: MIN_VIRALITY_OPTIONS.find((v) => v.id === analysisConfig.minVirality)?.value,
      platformFocus: PLATFORM_FOCUS_OPTIONS.find((p) => p.id === analysisConfig.platformFocus)?.label,

      // Competition
      maxCompetition: MAX_COMPETITION_OPTIONS.find((c) => c.id === analysisConfig.maxCompetition)?.value,
      maxAmazonListings: MAX_AMAZON_LISTINGS_OPTIONS.find((a) => a.id === analysisConfig.maxAmazonListings)?.value,
      maxDTCBrands: MAX_DTC_BRANDS_OPTIONS.find((d) => d.id === analysisConfig.maxDTCBrands)?.value,

      // Supply Chain
      maxMOQ: MAX_MOQ_OPTIONS.find((m) => m.id === analysisConfig.maxMOQ)?.value,
      maxLeadTime: MAX_LEAD_TIME_OPTIONS.find((l) => l.id === analysisConfig.maxLeadTime)?.value,
      supplierCerts: SUPPLIER_CERT_OPTIONS.find((s) => s.id === analysisConfig.supplierCerts)?.label,

      // Other
      numberOfProducts: NUMBER_OF_PRODUCTS_OPTIONS.find((n) => n.id === analysisConfig.numberOfProducts)?.value,
      riskTolerance: RISK_TOLERANCE_OPTIONS.find((r) => r.id === analysisConfig.riskTolerance)?.label,
      outputDetail: OUTPUT_DETAIL_OPTIONS.find((o) => o.id === analysisConfig.outputDetail)?.label,
    };
    console.log(payload)
    onAnalyze(payload);
  };

  return (
    <div className="sticky top-24">
      <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500/20 to-transparent blur-xl opacity-50" />

      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl">
        <div className="relative h-full bg-[#050509] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))]" />

          <div className="relative p-5 sm:p-6 backdrop-blur-3xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 shadow-inner">
                  <LucideIcons.Settings className="h-4 w-4 text-purple-300" />
                </div>
                <div>
                  <h2 className="text-[13px] font-bold text-gray-100 tracking-wide">
                    CONFIGURATION
                  </h2>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Parameterize your scan
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
                  isAnalyzing
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {isAnalyzing && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      isAnalyzing ? "bg-emerald-400" : "bg-gray-500"
                    }`}
                  />
                </span>
                {isAnalyzing ? "Processing" : "Idle"}
              </span>
            </div>

            {/* Scrollable Configuration */}
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {/* Category Select */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Target Category
                  </label>
                  {categories?.length > 0 && (
                    <span className="text-[10px] text-purple-400 font-mono">
                      {categories.length} AVL
                    </span>
                  )}
                </div>

                <Select
                  value={categoryId || undefined}
                  onValueChange={setCategoryId}
                  disabled={isLoading || isAnalyzing}
                >
                  <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100">
                    <SelectValue placeholder={isLoading ? "Loading..." : "Select Category"} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200 max-h-[300px]">
                    {categories?.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={String(cat.id)}
                        className="focus:bg-purple-500/20 focus:text-white"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              {/* Product Name (Optional) */}
              <section className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Product Name{" "}
                  <span className="text-gray-600 font-normal normal-case text-[9px]">
                    Optional
                  </span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  disabled={isAnalyzing}
                  placeholder="e.g. Smart Home Organizer"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </section>

              {/* Accordion Sections */}
              <Accordion type="multiple" defaultValue={["basic", "financials"]} className="space-y-4">
                {/* BASIC FILTERS */}
                <AccordionItem value="basic" className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                      <LucideIcons.Filter className="h-3.5 w-3.5 text-purple-400" />
                      Basic Filters
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    {/* Region */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Region
                      </label>
                      <Select
                        value={analysisConfig.region}
                        onValueChange={(val) => updateConfig("region", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {Object.entries(REGIONS).map(([code, name]) => (
                            <SelectItem
                              key={code}
                              value={code}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Product Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Product Type
                      </label>
                      <Select
                        value={analysisConfig.productType}
                        onValueChange={(val) => updateConfig("productType", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {PRODUCT_TYPES.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              <div className="flex flex-col">
                                <span>{type.label}</span>
                                <span className="text-[10px] text-gray-500">{type.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Size Constraint */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Size Constraint
                      </label>
                      <Select
                        value={analysisConfig.sizeConstraint}
                        onValueChange={(val) => updateConfig("sizeConstraint", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {SIZE_CONSTRAINTS.map((size) => (
                            <SelectItem
                              key={size.id}
                              value={size.id}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              <div className="flex flex-col">
                                <span>{size.label}</span>
                                <span className="text-[10px] text-gray-500">{size.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Gated Categories */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Gated Categories
                      </label>
                      <Select
                        value={analysisConfig.gatedPreference}
                        onValueChange={(val) => updateConfig("gatedPreference", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {GATED_CATEGORIES.map((gated) => (
                            <SelectItem
                              key={gated.id}
                              value={gated.id}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              <div className="flex flex-col">
                                <span>{gated.label}</span>
                                <span className="text-[10px] text-gray-500">{gated.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Seasonality */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Seasonality
                      </label>
                      <Select
                        value={analysisConfig.seasonality}
                        onValueChange={(val) => updateConfig("seasonality", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {SEASONALITY_OPTIONS.map((season) => (
                            <SelectItem
                              key={season.id}
                              value={season.id}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              <div className="flex flex-col">
                                <span>{season.label}</span>
                                <span className="text-[10px] text-gray-500">{season.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* FINANCIALS - Add all financial fields similarly */}
                <AccordionItem value="financials" className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                      <LucideIcons.DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      Financial Requirements
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    {/* Max COGS */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Max COGS per Unit
                      </label>
                      <Select
                        value={analysisConfig.maxCogs}
                        onValueChange={(val) => updateConfig("maxCogs", val)}
                        disabled={isAnalyzing}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 h-auto text-xs text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                          {MAX_COGS_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.id}
                              value={option.id}
                              className="focus:bg-purple-500/20 focus:text-white text-xs"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Add remaining financial fields here... */}
                    {/* For brevity, I'm showing the pattern - add MIN_RETAIL_PRICE, MIN_MARGIN, etc. */}
                  </AccordionContent>
                </AccordionItem>

                {/* Add remaining accordion sections: Market & Demand, Competition, Supply Chain, Analysis Settings */}
              </Accordion>

              {/* Error Display */}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-200 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="pt-6 mt-2 border-t border-white/5">
              <button
                onClick={handleSubmit}
                disabled={isAnalyzing || isLoading || !categoryId}
                className={`group relative w-full overflow-hidden rounded-xl p-[1px] transition-all duration-300 ${
                  !categoryId ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.6)]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 animate-gradient-x" />
                <div className="relative h-full w-full rounded-xl bg-[#0A0A0E] px-4 py-3.5 transition-all group-hover:bg-transparent">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
                    {isAnalyzing ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin text-white/80" />
                        <span>Initializing...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Sparkles />
                        <span>Generate Analysis</span>
                      </>
                    )}
                  </div>
                </div>
              </button>

              {/* Config Summary */}
              <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[10px] text-gray-400 mb-2 font-semibold uppercase tracking-wider">
                  Active Configuration
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-gray-500">Region:</span>{" "}
                    <span className="text-gray-300">{REGIONS[analysisConfig.region]}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">COGS:</span>{" "}
                    <span className="text-gray-300">
                      {MAX_COGS_OPTIONS.find((c) => c.id === analysisConfig.maxCogs)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Products:</span>{" "}
                    <span className="text-gray-300">
                      {NUMBER_OF_PRODUCTS_OPTIONS.find((n) => n.id === analysisConfig.numberOfProducts)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Detail:</span>{" "}
                    <span className="text-gray-300">
                      {OUTPUT_DETAIL_OPTIONS.find((o) => o.id === analysisConfig.outputDetail)?.label}
                    </span>
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