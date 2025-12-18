"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
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
};

const SectionCard = ({ title, icon: Icon, children, isLocked = false, isCompleted = false, sectionNumber }) => (
  <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-purple-500/20 via-white/5 to-transparent">
    <div className={`relative h-full bg-[#0A0A0E] rounded-xl overflow-hidden transition-all duration-300 ${
      isLocked ? 'opacity-60' : 'opacity-100'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.1),rgba(255,255,255,0))]" />
      
      {/* Blur Overlay for Locked Sections */}
      {isLocked && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/30 z-10 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <LucideIcons.Lock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-semibold">Complete previous section</p>
          </div>
        </div>
      )}
      
      <div className="relative p-4 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] font-bold text-gray-400">{sectionNumber}</span>
            </div>
            <Icon className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              {title}
            </h3>
          </div>
          
          {/* Completion Status */}
          {isCompleted && (
            <div className="flex items-center gap-1 text-emerald-400">
              <LucideIcons.CheckCircle2 className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Complete</span>
            </div>
          )}
        </div>
        
        {/* Section Content */}
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, options, disabled, optional = false }) => {
  const selectedOption = options.find(opt => opt.id === value);
  
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        {label}
        {optional && (
          <span className="text-gray-600 font-normal normal-case text-[9px]">
            Optional
          </span>
        )}
      </label>
      <Select value={value || undefined} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 h-auto text-xs text-gray-100 hover:bg-white/10 transition-colors">
          <SelectValue placeholder="Select an option">
            {selectedOption && value ? (
              <div className="flex flex-col text-left">
                <span className="text-gray-100">{selectedOption.label}</span>
                {selectedOption.description && (
                  <span className="text-[10px] text-gray-500">{selectedOption.description}</span>
                )}
              </div>
            ) : null}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200 max-h-[200px]">
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="focus:bg-purple-500/20 focus:text-white text-xs"
            >
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-[10px] text-gray-500">{option.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function AnalyzeConfig({
  categories = [],
  isLoading = false,
  isAnalyzing = false,
  error = null,
  onAnalyze,
}) {
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
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
    
    // Market & Demand
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
    
    // Other Settings
    minVirality: "",
    numberOfProducts: "",
    riskTolerance: "",
    outputDetail: "",
  });

  const updateConfig = (key, value) => {
    setAnalysisConfig((prev) => ({ ...prev, [key]: value }));
  };

  // Check section completion
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

  // Calculate progress
  const sections = [
    isCategorySelected,
    isProductNicheComplete,
    isFinancialsComplete,
    isMarketDemandComplete,
    isCompetitionComplete,
    isSupplyChainComplete,
    isAnalysisSettingsComplete,
  ];
  const completedSections = sections.filter(Boolean).length;
  const progressPercentage = (completedSections / sections.length) * 100;

  const handleSubmit = () => {
    if (!categoryId) return;

    const regionName = analysisConfig.region ? (REGIONS[analysisConfig.region] || analysisConfig.region) : undefined;

    const payload = {
      categoryId: categoryId,
      productName: productName || undefined,

      // Product & Niche
      productType: analysisConfig.productType ? PRODUCT_TYPES.find((p) => p.id === analysisConfig.productType)?.label : undefined,
      sizeConstraint: analysisConfig.sizeConstraint ? SIZE_CONSTRAINTS.find((s) => s.id === analysisConfig.sizeConstraint)?.description : undefined,
      gatedPreference: analysisConfig.gatedPreference ? GATED_CATEGORIES.find((g) => g.id === analysisConfig.gatedPreference)?.label : undefined,
      seasonality: analysisConfig.seasonality ? SEASONALITY_OPTIONS.find((s) => s.id === analysisConfig.seasonality)?.label : undefined,

      // Financials
      maxCogs: analysisConfig.maxCogs ? MAX_COGS_OPTIONS.find((c) => c.id === analysisConfig.maxCogs)?.value : undefined,
      minRetailPrice: analysisConfig.minRetailPrice ? MIN_RETAIL_PRICE_OPTIONS.find((r) => r.id === analysisConfig.minRetailPrice)?.value : undefined,
      minMargin: analysisConfig.minMargin ? MIN_MARGIN_OPTIONS.find((m) => m.id === analysisConfig.minMargin)?.value : undefined,
      maxStartup: analysisConfig.maxStartup ? MAX_STARTUP_COSTS.find((s) => s.id === analysisConfig.maxStartup)?.value : undefined,
      maxCAC: analysisConfig.maxCAC ? MAX_CAC_OPTIONS.find((c) => c.id === analysisConfig.maxCAC)?.value : undefined,
      minCLV: analysisConfig.minCLV ? MIN_CLV_OPTIONS.find((c) => c.id === analysisConfig.minCLV)?.value : undefined,

      // Market & Demand
      region: regionName,
      minMarketSize: analysisConfig.minMarketSize ? MIN_MARKET_SIZE_OPTIONS.find((m) => m.id === analysisConfig.minMarketSize)?.value : undefined,
      minGrowth: analysisConfig.minGrowth ? MIN_YOY_GROWTH_OPTIONS.find((g) => g.id === analysisConfig.minGrowth)?.value : undefined,
      minSearchVolume: analysisConfig.minSearchVolume ? MIN_SEARCH_VOLUME_OPTIONS.find((s) => s.id === analysisConfig.minSearchVolume)?.value : undefined,
      minVirality: analysisConfig.minVirality ? MIN_VIRALITY_OPTIONS.find((v) => v.id === analysisConfig.minVirality)?.value : undefined,
      platformFocus: analysisConfig.platformFocus ? PLATFORM_FOCUS_OPTIONS.find((p) => p.id === analysisConfig.platformFocus)?.label : undefined,

      // Competition
      maxCompetition: analysisConfig.maxCompetition ? MAX_COMPETITION_OPTIONS.find((c) => c.id === analysisConfig.maxCompetition)?.value : undefined,
      maxAmazonListings: analysisConfig.maxAmazonListings ? MAX_AMAZON_LISTINGS_OPTIONS.find((a) => a.id === analysisConfig.maxAmazonListings)?.value : undefined,
      maxDTCBrands: analysisConfig.maxDTCBrands ? MAX_DTC_BRANDS_OPTIONS.find((d) => d.id === analysisConfig.maxDTCBrands)?.value : undefined,

      // Supply Chain
      maxMOQ: analysisConfig.maxMOQ ? MAX_MOQ_OPTIONS.find((m) => m.id === analysisConfig.maxMOQ)?.value : undefined,
      maxLeadTime: analysisConfig.maxLeadTime ? MAX_LEAD_TIME_OPTIONS.find((l) => l.id === analysisConfig.maxLeadTime)?.value : undefined,
      supplierCerts: analysisConfig.supplierCerts ? SUPPLIER_CERT_OPTIONS.find((s) => s.id === analysisConfig.supplierCerts)?.label : undefined,

      // Other Settings
      numberOfProducts: analysisConfig.numberOfProducts ? NUMBER_OF_PRODUCTS_OPTIONS.find((n) => n.id === analysisConfig.numberOfProducts)?.value : undefined,
      riskTolerance: analysisConfig.riskTolerance ? RISK_TOLERANCE_OPTIONS.find((r) => r.id === analysisConfig.riskTolerance)?.label : undefined,
      outputDetail: analysisConfig.outputDetail ? OUTPUT_DETAIL_OPTIONS.find((o) => o.id === analysisConfig.outputDetail)?.label : undefined,
    };

    // Remove undefined values
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    console.log(payload);
    onAnalyze(payload);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent">
        <div className="relative bg-[#050509] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <LucideIcons.LayoutList className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-bold text-gray-300">Configuration Progress</span>
            </div>
            <span className="text-xs font-mono text-purple-400">
              {completedSections}/{sections.length} Complete
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category and Product Name Selection */}
      <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-xl">
        <div className="relative bg-[#050509] rounded-xl p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))] rounded-xl" />
          
          <div className="relative space-y-4">
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <LucideIcons.Settings className="h-4 w-4 text-purple-300" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-100 tracking-wide">
                    ANALYSIS CONFIGURATION
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    Start by selecting your target category
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isCategorySelected && (
                  <div className="flex items-center gap-1 text-emerald-400">
                    <LucideIcons.CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
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
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span>Target Category</span>
                {categories?.length > 0 && (
                  <span className="text-purple-400 font-mono">{categories.length} available</span>
                )}
              </label>
              <Select
                value={categoryId || undefined}
                onValueChange={setCategoryId}
                disabled={isLoading || isAnalyzing}
              >
                <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 h-auto text-sm text-gray-100 hover:bg-white/10 transition-colors">
                  <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"} />
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
            </div>

            {/* Product Name (Optional) */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                Product Name
                <span className="text-gray-600 font-normal normal-case text-[9px]">
                  Optional
                </span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={isAnalyzing}
                placeholder="e.g., Smart Home Organizer"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-white/10 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Input Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Product & Niche Section */}
        <SectionCard 
          title="Product & Niche" 
          icon={LucideIcons.Package}
          isLocked={!isCategorySelected}
          isCompleted={isProductNicheComplete}
          sectionNumber={1}
        >
          <InputField
            label="Product Type"
            value={analysisConfig.productType}
            onChange={(val) => updateConfig("productType", val)}
            options={PRODUCT_TYPES}
            disabled={isAnalyzing || !isCategorySelected}
          />
          <InputField
            label="Size Constraint"
            value={analysisConfig.sizeConstraint}
            onChange={(val) => updateConfig("sizeConstraint", val)}
            options={SIZE_CONSTRAINTS}
            disabled={isAnalyzing || !isCategorySelected}
          />
          <InputField
            label="Gated Categories"
            value={analysisConfig.gatedPreference}
            onChange={(val) => updateConfig("gatedPreference", val)}
            options={GATED_CATEGORIES}
            disabled={isAnalyzing || !isCategorySelected}
          />
          <InputField
            label="Seasonality"
            value={analysisConfig.seasonality}
            onChange={(val) => updateConfig("seasonality", val)}
            options={SEASONALITY_OPTIONS}
            disabled={isAnalyzing || !isCategorySelected}
          />
        </SectionCard>

        {/* Financial Requirements Section */}
        <SectionCard 
          title="Financial Requirements" 
          icon={LucideIcons.DollarSign}
          isLocked={!isProductNicheComplete}
          isCompleted={isFinancialsComplete}
          sectionNumber={2}
        >
          <InputField
            label="Max COGS"
            value={analysisConfig.maxCogs}
            onChange={(val) => updateConfig("maxCogs", val)}
            options={MAX_COGS_OPTIONS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
          <InputField
            label="Min Retail Price"
            value={analysisConfig.minRetailPrice}
            onChange={(val) => updateConfig("minRetailPrice", val)}
            options={MIN_RETAIL_PRICE_OPTIONS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
          <InputField
            label="Min Margin"
            value={analysisConfig.minMargin}
            onChange={(val) => updateConfig("minMargin", val)}
            options={MIN_MARGIN_OPTIONS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
          <InputField
            label="Max Startup Cost"
            value={analysisConfig.maxStartup}
            onChange={(val) => updateConfig("maxStartup", val)}
            options={MAX_STARTUP_COSTS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
          <InputField
            label="Max CAC"
            value={analysisConfig.maxCAC}
            onChange={(val) => updateConfig("maxCAC", val)}
            options={MAX_CAC_OPTIONS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
          <InputField
            label="Min CLV"
            value={analysisConfig.minCLV}
            onChange={(val) => updateConfig("minCLV", val)}
            options={MIN_CLV_OPTIONS}
            disabled={isAnalyzing || !isProductNicheComplete}
          />
        </SectionCard>

        {/* Market & Demand Section */}
        <SectionCard 
          title="Market & Demand" 
          icon={LucideIcons.TrendingUp}
          isLocked={!isFinancialsComplete}
          isCompleted={isMarketDemandComplete}
          sectionNumber={3}
        >
          <InputField
            label="Region"
            value={analysisConfig.region}
            onChange={(val) => updateConfig("region", val)}
            options={Object.entries(REGIONS).map(([code, name]) => ({ id: code, label: name }))}
            disabled={isAnalyzing || !isFinancialsComplete}
          />
          <InputField
            label="Min Market Size"
            value={analysisConfig.minMarketSize}
            onChange={(val) => updateConfig("minMarketSize", val)}
            options={MIN_MARKET_SIZE_OPTIONS}
            disabled={isAnalyzing || !isFinancialsComplete}
          />
          <InputField
            label="Min YoY Growth"
            value={analysisConfig.minGrowth}
            onChange={(val) => updateConfig("minGrowth", val)}
            options={MIN_YOY_GROWTH_OPTIONS}
            disabled={isAnalyzing || !isFinancialsComplete}
          />
          <InputField
            label="Min Search Volume"
            value={analysisConfig.minSearchVolume}
            onChange={(val) => updateConfig("minSearchVolume", val)}
            options={MIN_SEARCH_VOLUME_OPTIONS}
            disabled={isAnalyzing || !isFinancialsComplete}
          />
        </SectionCard>

        {/* Competition Section */}
        <SectionCard 
          title="Competition" 
          icon={LucideIcons.Users}
          isLocked={!isMarketDemandComplete}
          isCompleted={isCompetitionComplete}
          sectionNumber={4}
        >
          <InputField
            label="Max Competition"
            value={analysisConfig.maxCompetition}
            onChange={(val) => updateConfig("maxCompetition", val)}
            options={MAX_COMPETITION_OPTIONS}
            disabled={isAnalyzing || !isMarketDemandComplete}
          />
          <InputField
            label="Max Amazon Listings"
            value={analysisConfig.maxAmazonListings}
            onChange={(val) => updateConfig("maxAmazonListings", val)}
            options={MAX_AMAZON_LISTINGS_OPTIONS}
            disabled={isAnalyzing || !isMarketDemandComplete}
          />
          <InputField
            label="Max DTC Brands"
            value={analysisConfig.maxDTCBrands}
            onChange={(val) => updateConfig("maxDTCBrands", val)}
            options={MAX_DTC_BRANDS_OPTIONS}
            disabled={isAnalyzing || !isMarketDemandComplete}
          />
          <InputField
            label="Platform Focus"
            value={analysisConfig.platformFocus}
            onChange={(val) => updateConfig("platformFocus", val)}
            options={PLATFORM_FOCUS_OPTIONS}
            disabled={isAnalyzing || !isMarketDemandComplete}
          />
        </SectionCard>

        {/* Supply Chain Section */}
        <SectionCard 
          title="Supply Chain" 
          icon={LucideIcons.Truck}
          isLocked={!isCompetitionComplete}
          isCompleted={isSupplyChainComplete}
          sectionNumber={5}
        >
          <InputField
            label="Max MOQ"
            value={analysisConfig.maxMOQ}
            onChange={(val) => updateConfig("maxMOQ", val)}
            options={MAX_MOQ_OPTIONS}
            disabled={isAnalyzing || !isCompetitionComplete}
          />
          <InputField
            label="Max Lead Time"
            value={analysisConfig.maxLeadTime}
            onChange={(val) => updateConfig("maxLeadTime", val)}
            options={MAX_LEAD_TIME_OPTIONS}
            disabled={isAnalyzing || !isCompetitionComplete}
          />
          <InputField
            label="Supplier Certs"
            value={analysisConfig.supplierCerts}
            onChange={(val) => updateConfig("supplierCerts", val)}
            options={SUPPLIER_CERT_OPTIONS}
            disabled={isAnalyzing || !isCompetitionComplete}
          />
        </SectionCard>

        {/* Analysis Settings Section */}
        <SectionCard 
          title="Analysis Settings" 
          icon={LucideIcons.Settings}
          isLocked={!isSupplyChainComplete}
          isCompleted={isAnalysisSettingsComplete}
          sectionNumber={6}
        >
          <InputField
            label="Number of Products"
            value={analysisConfig.numberOfProducts}
            onChange={(val) => updateConfig("numberOfProducts", val)}
            options={NUMBER_OF_PRODUCTS_OPTIONS}
            disabled={isAnalyzing || !isSupplyChainComplete}
          />
          <InputField
            label="Risk Tolerance"
            value={analysisConfig.riskTolerance}
            onChange={(val) => updateConfig("riskTolerance", val)}
            options={RISK_TOLERANCE_OPTIONS}
            disabled={isAnalyzing || !isSupplyChainComplete}
          />
          <InputField
            label="Output Detail"
            value={analysisConfig.outputDetail}
            onChange={(val) => updateConfig("outputDetail", val)}
            options={OUTPUT_DETAIL_OPTIONS}
            disabled={isAnalyzing || !isSupplyChainComplete}
          />
          <InputField
            label="Min Virality"
            value={analysisConfig.minVirality}
            onChange={(val) => updateConfig("minVirality", val)}
            options={MIN_VIRALITY_OPTIONS}
            disabled={isAnalyzing || !isSupplyChainComplete}
          />
        </SectionCard>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500">
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing || isLoading || !categoryId || !isAnalysisSettingsComplete}
          className={`group relative w-full overflow-hidden rounded-xl bg-[#0A0A0E] px-6 py-4 transition-all ${
            (!categoryId || !isAnalysisSettingsComplete) ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent"
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-base font-bold text-white">
            {isAnalyzing ? (
              <>
                <Loader className="h-5 w-5 animate-spin text-white/80" />
                <span>Analyzing Market...</span>
              </>
            ) : (
              <>
                <Icons.Sparkles />
                <span>
                  {!isAnalysisSettingsComplete 
                    ? "Complete All Sections to Continue" 
                    : "Generate Market Analysis"}
                </span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}