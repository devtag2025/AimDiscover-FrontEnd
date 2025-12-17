// ==================== REGIONS ====================
export const REGIONS = {
  NA: "North America",       
  EU: "Europe",
  AP: "Asia-Pacific",        
  SA: "South America",       
  MEA: "Middle East & Africa" 
};

// ==================== 1. PRODUCT & NICHE FILTERS ====================

export const PRODUCT_TYPES = [
  { id: "non-electronic", label: "Non-Electronic Only", description: "Simplest compliance" },
  { id: "simple-electronics", label: "Simple Electronics", description: "Passive/low-power items" },
  { id: "any", label: "Any (including complex tech)", description: "No restrictions" }
];

export const SIZE_CONSTRAINTS = [
  { 
    id: "small", 
    label: "Small", 
    description: "Under 12×9×6 inches, <2 lbs",
    dimensions: { length: 12, width: 9, height: 6, weight: 2 }
  },
  { 
    id: "medium", 
    label: "Medium", 
    description: "Under 18×12×8 inches, <5 lbs",
    dimensions: { length: 18, width: 12, height: 8, weight: 5 }
  },
  { 
    id: "large", 
    label: "Large", 
    description: "No restrictions",
    dimensions: null
  },
  { 
    id: "custom", 
    label: "Custom", 
    description: "Specify your own",
    dimensions: null
  }
];

export const GATED_CATEGORIES = [
  { id: "avoid-all", label: "Avoid All Gated", description: "No medical, supplements, hazmat" },
  { id: "simple-certs", label: "Allow Simple Certifications", description: "Under $500 testing" },
  { id: "any", label: "Any (including restricted)", description: "Show warnings for gated items" }
];

export const SEASONALITY_OPTIONS = [
  { id: "evergreen", label: "Evergreen", description: "Year-round steady demand" },
  { id: "positive-peaks", label: "Positive Peaks", description: "Holiday/seasonal boosts OK" },
  { id: "any", label: "Any", description: "No preference" }
];

// ==================== 2. FINANCIALS ====================

export const MAX_COGS_OPTIONS = [
  { id: "5", label: "Up to $5 landed", value: 5 },
  { id: "7", label: "Up to $7 landed (recommended)", value: 7 },
  { id: "10", label: "Up to $10 landed", value: 10 },
  { id: "15", label: "Up to $15 landed (premium)", value: 15 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const MIN_RETAIL_PRICE_OPTIONS = [
  { id: "20", label: "$20+ retail price", value: 20 },
  { id: "30", label: "$30+ retail price (recommended)", value: 30 },
  { id: "40", label: "$40+ retail price", value: 40 },
  { id: "50", label: "$50+ retail price (premium)", value: 50 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const MIN_MARGIN_OPTIONS = [
  { id: "50", label: "50%+ gross margin", value: 50 },
  { id: "70", label: "70%+ gross margin (recommended)", value: 70 },
  { id: "80", label: "80%+ gross margin (aggressive)", value: 80 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const MAX_STARTUP_COSTS = [
  { id: "10000", label: "Up to $10,000", value: 10000 },
  { id: "15000", label: "Up to $15,000 (recommended)", value: 15000 },
  { id: "20000", label: "Up to $20,000", value: 20000 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const MAX_CAC_OPTIONS = [
  { id: "5", label: "Up to $5 CAC", value: 5 },
  { id: "8", label: "Up to $8 CAC (recommended)", value: 8 },
  { id: "10", label: "Up to $10 CAC", value: 10 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const MIN_CLV_OPTIONS = [
  { id: "50", label: "$50+ CLV", value: 50 },
  { id: "100", label: "$100+ CLV (recommended)", value: 100 },
  { id: "150", label: "$150+ CLV (premium)", value: 150 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

// ==================== 3. MARKET & DEMAND ====================

export const MIN_MARKET_SIZE_OPTIONS = [
  { id: "100", label: "$100M+ annual market", value: 100 },
  { id: "200", label: "$200M+ annual market (recommended)", value: 200 },
  { id: "500", label: "$500M+ annual market", value: 500 },
  { id: "1000", label: "$1B+ annual market", value: 1000 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const MIN_YOY_GROWTH_OPTIONS = [
  { id: "10", label: "10%+ YoY growth", value: 10 },
  { id: "20", label: "20%+ YoY growth (recommended)", value: 20 },
  { id: "30", label: "30%+ YoY growth (explosive)", value: 30 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const MIN_SEARCH_VOLUME_OPTIONS = [
  { id: "10000", label: "10,000+ monthly searches", value: 10000 },
  { id: "15000", label: "15,000+ monthly searches (recommended)", value: 15000 },
  { id: "20000", label: "20,000+ monthly searches", value: 20000 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const MIN_VIRALITY_OPTIONS = [
  { id: "500000", label: "500K+ views/month", value: 500000 },
  { id: "750000", label: "750K+ views/month (recommended)", value: 750000 },
  { id: "1000000", label: "1M+ views/month", value: 1000000 },
  { id: "no-min", label: "No Minimum", value: 0 }
];

export const PLATFORM_FOCUS_OPTIONS = [
  { id: "all", label: "All Platforms", description: "Multi-channel validation" },
  { id: "tiktok", label: "TikTok", description: "Focus on TikTok Shop trends" },
  { id: "instagram", label: "Instagram", description: "Instagram Reels & Shopping" },
  { id: "reddit", label: "Reddit", description: "Reddit community insights" },
  { id: "twitter", label: "X (Twitter)", description: "Twitter/X trending topics" }
];

// ==================== 4. COMPETITION & SATURATION ====================

export const MAX_COMPETITION_OPTIONS = [
  { id: "25", label: "25% or less (low saturation)", value: 25 },
  { id: "35", label: "35% or less (recommended)", value: 35 },
  { id: "50", label: "50% or less (moderate)", value: 50 },
  { id: "no-limit", label: "No Limit", value: 100 }
];

export const MAX_AMAZON_LISTINGS_OPTIONS = [
  { id: "50", label: "50 or fewer listings", value: 50 },
  { id: "75", label: "75 or fewer listings (recommended)", value: 75 },
  { id: "100", label: "100 or fewer listings", value: 100 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const MAX_DTC_BRANDS_OPTIONS = [
  { id: "25", label: "25 or fewer DTC brands", value: 25 },
  { id: "50", label: "50 or fewer DTC brands (recommended)", value: 50 },
  { id: "75", label: "75 or fewer DTC brands", value: 75 },
  { id: "no-limit", label: "No Limit", value: null }
];

// ==================== 5. SUPPLY & LOGISTICS ====================

export const MAX_MOQ_OPTIONS = [
  { id: "200", label: "200 units MOQ", value: 200 },
  { id: "300", label: "300 units MOQ (recommended)", value: 300 },
  { id: "500", label: "500 units MOQ", value: 500 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const MAX_LEAD_TIME_OPTIONS = [
  { id: "4", label: "4 weeks max", value: 4 },
  { id: "6", label: "6 weeks max (recommended)", value: 6 },
  { id: "8", label: "8 weeks max", value: 8 },
  { id: "no-limit", label: "No Limit", value: null }
];

export const SUPPLIER_CERT_OPTIONS = [
  { id: "basic", label: "Basic (ISO/BSCI)", description: "Standard certifications" },
  { id: "premium", label: "Premium (GOTS/Fair Trade)", description: "Enhanced ethical certs" },
  { id: "any", label: "Any", description: "No certification requirements" }
];

// ==================== 6. OTHER CUSTOMIZATIONS ====================

export const NUMBER_OF_PRODUCTS_OPTIONS = [
  { id: "1", label: "Top 1 Product", value: 1 },
  { id: "3", label: "Top 3 Products (recommended)", value: 3 },
  { id: "5", label: "Top 5 Products", value: 5 },
  { id: "10", label: "Top 10 Products", value: 10 }
];

export const RISK_TOLERANCE_OPTIONS = [
  { id: "low", label: "Low", description: "Strict criteria, proven niches only" },
  { id: "medium", label: "Medium", description: "Some flexibility, balanced approach" },
  { id: "high", label: "High", description: "Include emerging/untested niches" }
];

export const OUTPUT_DETAIL_OPTIONS = [
  { id: "summary", label: "Summary", description: "Quick overview (1-2 pages)" },
  { id: "detailed", label: "Detailed", description: "Comprehensive analysis (5-7 pages)" },
  { id: "comprehensive", label: "Comprehensive", description: "Deep dive with ROI models (10+ pages)" }
];


// ==================== DEFAULT VALUES ====================

export const DEFAULT_ANALYSIS_CONFIG = {
  // Product & Niche
  category: "home-kitchen",
  productType: "non-electronic",
  sizeConstraint: "small",
  gatedPreference: "avoid-all",
  seasonality: "evergreen",
  
  // Financials
  maxCogs: 7,
  minRetailPrice: 30,
  minMargin: 70,
  maxStartup: 15000,
  maxCAC: 8,
  minCLV: 100,
  
  // Market & Demand
  region: "NA",
  minMarketSize: 200,
  minGrowth: 20,
  minSearchVolume: 15000,
  minVirality: 750000,
  platformFocus: "all",
  
  // Competition
  maxCompetition: 35,
  maxAmazonListings: 75,
  maxDTCBrands: 50,
  
  // Supply Chain
  maxMOQ: 300,
  maxLeadTime: 6,
  supplierCerts: "basic",
  
  // Other
  numberOfProducts: 3,
  riskTolerance: "low",
  outputDetail: "detailed"
};

// ==================== HELPER FUNCTIONS ====================

export const getOptionLabel = (options, id) => {
  const option = options.find(opt => opt.id === id);
  return option ? option.label : id;
};

export const getOptionValue = (options, id) => {
  const option = options.find(opt => opt.id === id);
  return option ? option.value : null;
};

export const formatCurrency = (value) => {
  if (!value) return "No limit";
  return `$${value.toLocaleString()}`;
};

export const formatPercentage = (value) => {
  if (!value) return "No minimum";
  return `${value}%`;
};

// ==================== VALIDATION RULES ====================

export const VALIDATION_RULES = {
  maxCogs: { min: 0, max: 100, required: true },
  minRetailPrice: { min: 0, max: 1000, required: true },
  minMargin: { min: 0, max: 100, required: true },
  maxStartup: { min: 1000, max: 100000, required: true },
  maxCAC: { min: 0, max: 100, required: true },
  minCLV: { min: 0, max: 1000, required: true },
  minMarketSize: { min: 0, max: 10000, required: true },
  minGrowth: { min: 0, max: 100, required: true },
  minSearchVolume: { min: 0, max: 1000000, required: true },
  minVirality: { min: 0, max: 10000000, required: true },
  maxCompetition: { min: 0, max: 100, required: true },
  maxAmazonListings: { min: 0, max: 1000, required: true },
  maxDTCBrands: { min: 0, max: 1000, required: true },
  maxMOQ: { min: 0, max: 10000, required: true },
  maxLeadTime: { min: 0, max: 52, required: true }
};

// ==================== GROUPED OPTIONS FOR UI ====================

export const ANALYSIS_OPTION_GROUPS = {
  productNiche: {
    title: "Product & Niche Filters",
    icon: "🎯",
    options: {

      productType: { label: "Product Type", options: PRODUCT_TYPES },
      sizeConstraint: { label: "Size Constraint", options: SIZE_CONSTRAINTS },
      gatedPreference: { label: "Gated Categories", options: GATED_CATEGORIES },
      seasonality: { label: "Seasonality", options: SEASONALITY_OPTIONS }
    }
  },
  financials: {
    title: "Financial Requirements",
    icon: "💰",
    options: {
      maxCogs: { label: "Max COGS", options: MAX_COGS_OPTIONS },
      minRetailPrice: { label: "Min Retail Price", options: MIN_RETAIL_PRICE_OPTIONS },
      minMargin: { label: "Min Gross Margin", options: MIN_MARGIN_OPTIONS },
      maxStartup: { label: "Max Startup Costs", options: MAX_STARTUP_COSTS },
      maxCAC: { label: "Max CAC", options: MAX_CAC_OPTIONS },
      minCLV: { label: "Min CLV", options: MIN_CLV_OPTIONS }
    }
  },
  market: {
    title: "Market & Demand",
    icon: "📈",
    options: {
      region: { label: "Target Region", options: Object.entries(REGIONS).map(([id, label]) => ({ id, label })) },
      minMarketSize: { label: "Min Market Size", options: MIN_MARKET_SIZE_OPTIONS },
      minGrowth: { label: "Min YoY Growth", options: MIN_YOY_GROWTH_OPTIONS },
      minSearchVolume: { label: "Min Search Volume", options: MIN_SEARCH_VOLUME_OPTIONS },
      minVirality: { label: "Min Social Virality", options: MIN_VIRALITY_OPTIONS },
      platformFocus: { label: "Platform Focus", options: PLATFORM_FOCUS_OPTIONS }
    }
  },
  competition: {
    title: "Competition & Saturation",
    icon: "🎯",
    options: {
      maxCompetition: { label: "Max Competition Index", options: MAX_COMPETITION_OPTIONS },
      maxAmazonListings: { label: "Max Amazon Listings", options: MAX_AMAZON_LISTINGS_OPTIONS },
      maxDTCBrands: { label: "Max DTC Brands", options: MAX_DTC_BRANDS_OPTIONS }
    }
  },
  supply: {
    title: "Supply Chain",
    icon: "🚚",
    options: {
      maxMOQ: { label: "Max MOQ", options: MAX_MOQ_OPTIONS },
      maxLeadTime: { label: "Max Lead Time", options: MAX_LEAD_TIME_OPTIONS },
      supplierCerts: { label: "Supplier Certifications", options: SUPPLIER_CERT_OPTIONS }
    }
  },
  other: {
    title: "Analysis Configuration",
    icon: "⚙️",
    options: {
      numberOfProducts: { label: "Number of Products", options: NUMBER_OF_PRODUCTS_OPTIONS },
      riskTolerance: { label: "Risk Tolerance", options: RISK_TOLERANCE_OPTIONS },
      outputDetail: { label: "Output Detail", options: OUTPUT_DETAIL_OPTIONS }
    }
  }
};