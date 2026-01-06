"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  ChevronDown,
  Settings2,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Truck,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Loader2,
  LayoutList,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Import your specific options ---
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
} from "@/utils/AnalyzeOptions";

// Utility for clean classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function AnalyzeConfig({
  categories = [],
  isLoading = false,
  isAnalyzing = false,
  error = null,
  onAnalyze,
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");

  // State matches your original exactly
  const [analysisConfig, setAnalysisConfig] = useState({
    // Product & Niche
    productType: "",
    sizeConstraint: "",
    gatedPreference: "",
    seasonality: "",
    // Financials
    maxCogs: "",
    minRetailPrice: "",
    minMargin: "",
    maxStartup: "",
    maxCAC: "",
    minCLV: "",
    // Market
    region: "",
    minMarketSize: "",
    minGrowth: "",
    minSearchVolume: "",
    // Competition
    maxCompetition: "",
    maxAmazonListings: "",
    maxDTCBrands: "",
    platformFocus: "",
    // Supply Chain
    maxMOQ: "",
    maxLeadTime: "",
    supplierCerts: "",
    // Settings
    minVirality: "",
    numberOfProducts: "",
    riskTolerance: "",
    outputDetail: "",
  });

  const updateConfig = (key, value) => {
    setAnalysisConfig((prev) => ({ ...prev, [key]: value }));
  };

  // --- Configuration Logic ---

  // 1. Completion Checks
  const isCategorySelected = categoryId !== "";

  const isProductNicheComplete =
    analysisConfig.productType &&
    analysisConfig.sizeConstraint &&
    analysisConfig.gatedPreference &&
    analysisConfig.seasonality;

  const isFinancialsComplete =
    analysisConfig.maxCogs &&
    analysisConfig.minRetailPrice &&
    analysisConfig.minMargin &&
    analysisConfig.maxStartup &&
    analysisConfig.maxCAC &&
    analysisConfig.minCLV;

  const isMarketDemandComplete =
    analysisConfig.region &&
    analysisConfig.minMarketSize &&
    analysisConfig.minGrowth &&
    analysisConfig.minSearchVolume;

  const isCompetitionComplete =
    analysisConfig.maxCompetition &&
    analysisConfig.maxAmazonListings &&
    analysisConfig.maxDTCBrands &&
    analysisConfig.platformFocus;

  const isSupplyChainComplete =
    analysisConfig.maxMOQ &&
    analysisConfig.maxLeadTime &&
    analysisConfig.supplierCerts;

  const isAnalysisSettingsComplete =
    analysisConfig.numberOfProducts &&
    analysisConfig.riskTolerance &&
    analysisConfig.outputDetail &&
    analysisConfig.minVirality;

  // 2. Define the Steps (Mapping your exact options to the new UI)
  const steps = useMemo(
    () => [
      {
        id: "basics",
        title: "Category & Product",
        icon: Package,
        description: "Define the core product identity",
        isComplete: isCategorySelected,
        fields: [], // Handled manually in render
      },
      {
        id: "niche",
        title: "Product & Niche",
        icon: Settings2,
        description: "Physical constraints and seasonality",
        isComplete: isProductNicheComplete,
        fields: [
          { key: "productType", label: "Product Type", options: PRODUCT_TYPES },
          {
            key: "sizeConstraint",
            label: "Size Constraint",
            options: SIZE_CONSTRAINTS,
          },
          {
            key: "gatedPreference",
            label: "Gated Categories",
            options: GATED_CATEGORIES,
          },
          {
            key: "seasonality",
            label: "Seasonality",
            options: SEASONALITY_OPTIONS,
          },
        ],
      },
      {
        id: "financials",
        title: "Financial Requirements",
        icon: DollarSign,
        description: "Margins, costs, and startup capital",
        isComplete: isFinancialsComplete,
        fields: [
          { key: "maxCogs", label: "Max COGS", options: MAX_COGS_OPTIONS },
          {
            key: "minRetailPrice",
            label: "Min Retail Price",
            options: MIN_RETAIL_PRICE_OPTIONS,
          },
          {
            key: "minMargin",
            label: "Min Margin",
            options: MIN_MARGIN_OPTIONS,
          },
          {
            key: "maxStartup",
            label: "Max Startup Cost",
            options: MAX_STARTUP_COSTS,
          },
          { key: "maxCAC", label: "Max CAC", options: MAX_CAC_OPTIONS },
          { key: "minCLV", label: "Min CLV", options: MIN_CLV_OPTIONS },
        ],
      },
      {
        id: "market",
        title: "Market & Demand",
        icon: TrendingUp,
        description: "Region, Volume, and Growth",
        isComplete: isMarketDemandComplete,
        fields: [
          {
            key: "region",
            label: "Region",
            options: Object.entries(REGIONS).map(([k, v]) => ({
              id: k,
              label: v,
            })),
          },
          {
            key: "minMarketSize",
            label: "Min Market Size",
            options: MIN_MARKET_SIZE_OPTIONS,
          },
          {
            key: "minGrowth",
            label: "Min YoY Growth",
            options: MIN_YOY_GROWTH_OPTIONS,
          },
          {
            key: "minSearchVolume",
            label: "Min Search Volume",
            options: MIN_SEARCH_VOLUME_OPTIONS,
          },
        ],
      },
      {
        id: "competition",
        title: "Competition",
        icon: Users,
        description: "Saturation and platform dominance",
        isComplete: isCompetitionComplete,
        fields: [
          {
            key: "maxCompetition",
            label: "Max Competition",
            options: MAX_COMPETITION_OPTIONS,
          },
          {
            key: "maxAmazonListings",
            label: "Max Amazon Listings",
            options: MAX_AMAZON_LISTINGS_OPTIONS,
          },
          {
            key: "maxDTCBrands",
            label: "Max DTC Brands",
            options: MAX_DTC_BRANDS_OPTIONS,
          },
          {
            key: "platformFocus",
            label: "Platform Focus",
            options: PLATFORM_FOCUS_OPTIONS,
          },
        ],
      },
      {
        id: "supply",
        title: "Supply Chain",
        icon: Truck,
        description: "Sourcing requirements and logistics",
        isComplete: isSupplyChainComplete,
        fields: [
          { key: "maxMOQ", label: "Max MOQ", options: MAX_MOQ_OPTIONS },
          {
            key: "maxLeadTime",
            label: "Max Lead Time",
            options: MAX_LEAD_TIME_OPTIONS,
          },
          {
            key: "supplierCerts",
            label: "Supplier Certs",
            options: SUPPLIER_CERT_OPTIONS,
          },
        ],
      },
      {
        id: "settings",
        title: "Analysis Settings",
        icon: Sparkles,
        description: "Output depth and risk tolerance",
        isComplete: isAnalysisSettingsComplete,
        fields: [
          {
            key: "numberOfProducts",
            label: "Number of Products",
            options: NUMBER_OF_PRODUCTS_OPTIONS,
          },
          {
            key: "riskTolerance",
            label: "Risk Tolerance",
            options: RISK_TOLERANCE_OPTIONS,
          },
          {
            key: "outputDetail",
            label: "Output Detail",
            options: OUTPUT_DETAIL_OPTIONS,
          },
          {
            key: "minVirality",
            label: "Min Virality",
            options: MIN_VIRALITY_OPTIONS,
          },
        ],
      },
    ],
    [
      analysisConfig,
      categoryId,
      productName,
      isCategorySelected,
      isProductNicheComplete,
      isFinancialsComplete,
      isMarketDemandComplete,
      isCompetitionComplete,
      isSupplyChainComplete,
      isAnalysisSettingsComplete,
    ]
  );

  // Calculate Progress
  const completedCount = steps.filter((s) => s.isComplete).length;
  const progress = (completedCount / steps.length) * 100;
  const isReadyToSubmit = completedCount === steps.length;

  // Auto-advance logic: Open next section when current is done
  useEffect(() => {
    if (steps[activeSection].isComplete && activeSection < steps.length - 1) {
      const timer = setTimeout(() => {
        if (!steps[activeSection + 1].isComplete)
          setActiveSection((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [steps, activeSection]);

  const handleSubmit = () => {
    if (!categoryId) return;

    const regionName = analysisConfig.region
      ? REGIONS[analysisConfig.region] || analysisConfig.region
      : undefined;

    const payload = {
      categoryId: categoryId,
      productName: productName || undefined,

      // Product & Niche
      productType: analysisConfig.productType
        ? PRODUCT_TYPES.find((p) => p.id === analysisConfig.productType)?.label
        : undefined,
      sizeConstraint: analysisConfig.sizeConstraint
        ? SIZE_CONSTRAINTS.find((s) => s.id === analysisConfig.sizeConstraint)
            ?.description
        : undefined,
      gatedPreference: analysisConfig.gatedPreference
        ? GATED_CATEGORIES.find((g) => g.id === analysisConfig.gatedPreference)
            ?.label
        : undefined,
      seasonality: analysisConfig.seasonality
        ? SEASONALITY_OPTIONS.find((s) => s.id === analysisConfig.seasonality)
            ?.label
        : undefined,

      // Financials
      maxCogs: analysisConfig.maxCogs
        ? MAX_COGS_OPTIONS.find((c) => c.id === analysisConfig.maxCogs)?.value
        : undefined,
      minRetailPrice: analysisConfig.minRetailPrice
        ? MIN_RETAIL_PRICE_OPTIONS.find(
            (r) => r.id === analysisConfig.minRetailPrice
          )?.value
        : undefined,
      minMargin: analysisConfig.minMargin
        ? MIN_MARGIN_OPTIONS.find((m) => m.id === analysisConfig.minMargin)
            ?.value
        : undefined,
      maxStartup: analysisConfig.maxStartup
        ? MAX_STARTUP_COSTS.find((s) => s.id === analysisConfig.maxStartup)
            ?.value
        : undefined,
      maxCAC: analysisConfig.maxCAC
        ? MAX_CAC_OPTIONS.find((c) => c.id === analysisConfig.maxCAC)?.value
        : undefined,
      minCLV: analysisConfig.minCLV
        ? MIN_CLV_OPTIONS.find((c) => c.id === analysisConfig.minCLV)?.value
        : undefined,

      // Market & Demand
      region: regionName,
      minMarketSize: analysisConfig.minMarketSize
        ? MIN_MARKET_SIZE_OPTIONS.find(
            (m) => m.id === analysisConfig.minMarketSize
          )?.value
        : undefined,
      minGrowth: analysisConfig.minGrowth
        ? MIN_YOY_GROWTH_OPTIONS.find((g) => g.id === analysisConfig.minGrowth)
            ?.value
        : undefined,
      minSearchVolume: analysisConfig.minSearchVolume
        ? MIN_SEARCH_VOLUME_OPTIONS.find(
            (s) => s.id === analysisConfig.minSearchVolume
          )?.value
        : undefined,
      minVirality: analysisConfig.minVirality
        ? MIN_VIRALITY_OPTIONS.find((v) => v.id === analysisConfig.minVirality)
            ?.value
        : undefined,
      platformFocus: analysisConfig.platformFocus
        ? PLATFORM_FOCUS_OPTIONS.find(
            (p) => p.id === analysisConfig.platformFocus
          )?.label
        : undefined,

      // Competition
      maxCompetition: analysisConfig.maxCompetition
        ? MAX_COMPETITION_OPTIONS.find(
            (c) => c.id === analysisConfig.maxCompetition
          )?.value
        : undefined,
      maxAmazonListings: analysisConfig.maxAmazonListings
        ? MAX_AMAZON_LISTINGS_OPTIONS.find(
            (a) => a.id === analysisConfig.maxAmazonListings
          )?.value
        : undefined,
      maxDTCBrands: analysisConfig.maxDTCBrands
        ? MAX_DTC_BRANDS_OPTIONS.find(
            (d) => d.id === analysisConfig.maxDTCBrands
          )?.value
        : undefined,

      // Supply Chain
      maxMOQ: analysisConfig.maxMOQ
        ? MAX_MOQ_OPTIONS.find((m) => m.id === analysisConfig.maxMOQ)?.value
        : undefined,
      maxLeadTime: analysisConfig.maxLeadTime
        ? MAX_LEAD_TIME_OPTIONS.find((l) => l.id === analysisConfig.maxLeadTime)
            ?.value
        : undefined,
      supplierCerts: analysisConfig.supplierCerts
        ? SUPPLIER_CERT_OPTIONS.find(
            (s) => s.id === analysisConfig.supplierCerts
          )?.label
        : undefined,

      // Other Settings
      numberOfProducts: analysisConfig.numberOfProducts
        ? NUMBER_OF_PRODUCTS_OPTIONS.find(
            (n) => n.id === analysisConfig.numberOfProducts
          )?.value
        : undefined,
      riskTolerance: analysisConfig.riskTolerance
        ? RISK_TOLERANCE_OPTIONS.find(
            (r) => r.id === analysisConfig.riskTolerance
          )?.label
        : undefined,
      outputDetail: analysisConfig.outputDetail
        ? OUTPUT_DETAIL_OPTIONS.find(
            (o) => o.id === analysisConfig.outputDetail
          )?.label
        : undefined,
    };

    // Remove undefined values
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    console.log(payload);
    onAnalyze(payload);
  };

  return (
    <div className="w-full space-y-6">
      {/* --- Progress Header --- */}
      <div className="sticky top-2 z-40 bg-[#050509]/95 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <LayoutList className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-bold text-gray-300">
              Configuration Progress
            </span>
          </div>
          <span className="text-xs font-mono text-purple-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* --- Steps Accordion --- */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = activeSection === index;
          const isLocked =
            index > 0 && !steps[index - 1].isComplete && !step.isComplete;

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                opacity: isLocked ? 0.6 : 1,
                borderColor: isActive
                  ? "rgba(168,85,247,0.3)"
                  : "rgba(255,255,255,0.08)",
              }}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-[#0A0A0E] transition-all duration-300",
                isActive ? "shadow-lg shadow-purple-900/10" : ""
              )}
            >
              {/* Step Header */}
              <button
                onClick={() => !isLocked && setActiveSection(index)}
                disabled={isLocked}
                className="w-full flex items-center justify-between p-4 text-left outline-none"
              >
                <div className="flex items-center gap-3">
                  {/* Icon Status Circle */}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                      step.isComplete
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : isActive
                        ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        : "bg-white/5 border-white/10 text-gray-500"
                    )}
                  >
                    {step.isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn(
                        "text-sm font-bold tracking-wide uppercase",
                        isActive ? "text-white" : "text-gray-400"
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Summary Pills (Show when collapsed and complete) */}
                  {!isActive && step.isComplete && (
                    <div className="hidden sm:flex gap-1">
                      {index === 0 ? (
                        // Special summary for category
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/10">
                          {categories.find(
                            (c) => String(c.id) === String(categoryId)
                          )?.name || "Selected"}
                        </span>
                      ) : (
                        // Generic count for other sections
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5">
                          {step.fields.length} set
                        </span>
                      )}
                    </div>
                  )}

                  {isLocked ? (
                    <Lock className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform",
                        isActive && "rotate-180"
                      )}
                    />
                  )}
                </div>
              </button>

              {/* Step Content */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="px-4 pb-6 pt-0">
                      <div className="h-[1px] w-full bg-white/5 mb-4" />

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* --- Step 1: Category & Product Name (Special Handling) --- */}
                        {index === 0 && (
                          <>
                            <div className="col-span-full md:col-span-2">
                              <NativeSelect
                                label="Target Category"
                                value={categoryId}
                                onChange={setCategoryId}
                                options={categories.map((c) => ({
                                  id: c.id,
                                  label: c.name,
                                }))}
                                placeholder={
                                  isLoading
                                    ? "Loading categories..."
                                    : "Select a category"
                                }
                                required
                              />
                            </div>
                            <div className="col-span-full md:col-span-1 space-y-1.5">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                Product Name
                                <span className="text-gray-600 font-normal normal-case text-[9px]">
                                  Optional
                                </span>
                              </label>
                              <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="e.g. Bamboo Organizer"
                                className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all hover:bg-white/10 placeholder:text-gray-600"
                              />
                            </div>
                          </>
                        )}

                        {/* --- Other Steps: Map Inputs Dynamically --- */}
                        {step.fields.map((field) => (
                          <NativeSelect
                            key={field.key}
                            label={field.label}
                            value={analysisConfig[field.key]}
                            onChange={(val) => updateConfig(field.key, val)}
                            options={field.options}
                            placeholder="Select option"
                          />
                        ))}
                      </div>

                      {/* Next Button inside section */}
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (index < steps.length - 1)
                              setActiveSection(index + 1);
                          }}
                          disabled={!step.isComplete}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            step.isComplete
                              ? "bg-white text-black hover:bg-gray-200"
                              : "bg-white/5 text-gray-500 cursor-not-allowed"
                          )}
                        >
                          {index === steps.length - 1
                            ? "Review"
                            : "Next Section"}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* --- Final Action Button --- */}
      <div className="pt-4 pb-10">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-slate-700 via-purple-800 to-fuchsia-700">
          <button
            onClick={handleSubmit}
            disabled={!isReadyToSubmit || isLoading || isAnalyzing}
            className={cn(
              "relative w-full overflow-hidden rounded-xl bg-[#0A0A0E] px-6 py-4 transition-all",
              !isReadyToSubmit
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-transparent group"
            )}
          >
            <div className="flex items-center justify-center gap-2.5">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-base font-medium">Analyzing...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="h-5 w-5" />
                  <span className="text-base font-medium">
                    {!isReadyToSubmit
                      ? "Complete all fields"
                      : "Analyze Market"}
                  </span>
                </>
              )}
            </div>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

function NativeSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}) {
  const selectedOption = options.find((opt) => (opt.id || opt.value) === value);
  const isSelected = !!value;

  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors flex items-center gap-1">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      </div>

      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-10 rounded-lg bg-[#0F0F16] border px-3 pr-8 text-xs outline-none appearance-none transition-all cursor-pointer",
            isSelected
              ? "text-white border-purple-500/40 bg-purple-500/5"
              : "text-gray-400 border-white/10 hover:border-white/20 hover:bg-white/10"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => {
            // Handle both object shapes (id/label vs value/label) based on your original code
            const val = option.id !== undefined ? option.id : option.value;
            const text = option.label || option.description; // Fallback to description if label missing
            const desc = option.description;

            return (
              <option
                key={val}
                value={val}
                className="bg-[#0A0A0E] text-gray-200 py-2"
              >
                {text} {desc && text !== desc ? `(${desc})` : ""}
              </option>
            );
          })}
        </select>

        {/* Custom Arrow */}
        <div className="absolute right-3 top-3 pointer-events-none">
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-colors",
              isSelected ? "text-purple-400" : "text-gray-500"
            )}
          />
        </div>
      </div>
    </div>
  );
}
