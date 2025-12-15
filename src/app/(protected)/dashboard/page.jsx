"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/dashboard/ProductCard";
import ProductDetails from "@/components/dashboard/ProductDetails";
import GlobalSnapshot from "@/components/dashboard/GlobalSnapshot";
import SectorDistribution from "@/components/dashboard/SectorDistribution";
import {
  Activity,
  Search,
  Filter,
  X,
  TrendingUp,
  Zap,
  ChevronUp,
} from "lucide-react";

import { useGetAnalytics } from "@/hooks/useGrok";

const safeTopCategory = (category) => {
  if (!category) return "Unknown";
  if (category.includes(">")) return category.split(">")[0]?.trim() ?? category;
  if (category.includes("-")) return category.split("-")[0]?.trim() ?? category;
  return category;
};

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetAnalytics();

  const payload = data?.data ?? data ?? null;
  const insight =
    payload?.insight ??
    payload?.data?.insight ??
    payload?.data ??
    payload ??
    null;

  const products = Array.isArray(insight?.products) ? insight.products : [];
  const platforms = Array.isArray(insight?.platforms) ? insight.platforms : [];
  const globalSentiment = insight?.sentiment ?? null;

  const assumptions = Array.isArray(insight?.assumptionsGlobal)
    ? insight.assumptionsGlobal
    : Array.isArray(insight?.assumptions_global)
    ? insight.assumptions_global
    : [];

  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);

  useEffect(() => {
    if (products.length === 0) {
      setSelectedProduct(null);
      return;
    }
    if (!selectedProduct) {
      setSelectedProduct(products[0]);
      return;
    }
    const stillExists = products.some((p) => p?.name === selectedProduct?.name);
    if (!stillExists) setSelectedProduct(products[0]);
  }, [products, selectedProduct]);

  const filteredProducts = useMemo(() => {
    if (!activeFilter.type) return products;

    return products.filter((p) => {
      if (!p) return false;

      if (activeFilter.type === "category") {
        const topCat = safeTopCategory(p.category);
        return topCat === activeFilter.value;
      }

      if (activeFilter.type === "country") {
        return (
          Array.isArray(p.top_countries) &&
          p.top_countries.includes(activeFilter.value)
        );
      }

      return true;
    });
  }, [activeFilter, products]);

  const categoryChartData = useMemo(() => {
    const dataMap = {};
    products.forEach((p) => {
      const cat = safeTopCategory(p?.category);
      dataMap[cat] = (dataMap[cat] || 0) + 1;
    });
    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  }, [products]);

  const handleFilter = (type, value) => {
    if (activeFilter.type === type && activeFilter.value === value) {
      setActiveFilter({ type: null, value: null });
    } else {
      setActiveFilter({ type, value });
    }
  };

  const clearFilter = (e) => {
    e?.stopPropagation?.();
    setActiveFilter({ type: null, value: null });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setMobileDetailOpen(true);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Failed to load analytics
          </h2>
          <p className="text-gray-400 text-sm">
            {String(error?.message ?? "Unknown error")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Live Intelligence</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Market Pulse</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredProducts.length} of {products.length} trending products
              </p>
            </div>
            
            {/* Filter Badge */}
            {activeFilter.type && (
              <button
                onClick={clearFilter}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/30 transition-all"
              >
                <Filter className="w-3 h-3" />
                <span className="truncate max-w-[200px]">{activeFilter.value}</span>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Products & Sectors */}
          <div className="col-span-4 xl:col-span-3 space-y-4">
            {/* Sector Distribution */}
            <SectorDistribution
              data={categoryChartData}
              activeFilter={activeFilter}
              onFilter={handleFilter}
            />

            {/* Products List - No scroll, shows all */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Trending Products
              </h2>
              
              <div className="space-y-2">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Activity className="w-8 h-8 text-purple-400 mb-3 animate-pulse" />
                    <p className="text-gray-500 text-sm">Loading products...</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <ProductCard
                      key={`${product?.name ?? "p"}-${i}`}
                      product={product}
                      isSelected={selectedProduct?.name === product?.name}
                      onClick={() => setSelectedProduct(product)}
                      compact
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Search className="w-8 h-8 text-gray-500 mb-3" />
                    <p className="text-gray-500 text-sm">No products found</p>
                    {activeFilter.type && (
                      <button onClick={clearFilter} className="mt-2 text-sm text-purple-400 hover:underline">
                        Clear Filter
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="col-span-8 xl:col-span-9">
            {selectedProduct ? (
              <ProductDetails product={selectedProduct} />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Select a Product</h3>
                <p className="text-gray-500 text-sm text-center max-w-sm">
                  Choose a trending product from the sidebar to view detailed market analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Live</span>
              </div>
              <h1 className="text-lg font-bold text-white">Market Pulse</h1>
            </div>
            
            <div className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
              <span className="text-sm font-mono text-purple-300">{filteredProducts.length}</span>
            </div>
          </div>

          {/* Mobile Filter Badge */}
          {activeFilter.type && (
            <button
              onClick={clearFilter}
              className="mt-3 w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Filter className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{activeFilter.value}</span>
              </div>
              <X className="w-4 h-4 flex-shrink-0" />
            </button>
          )}
        </div>

        {/* Mobile Content - No scroll containers, natural flow */}
        <div className="px-4 py-4 pb-24 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Products</div>
              <div className="text-2xl font-bold font-mono text-white">{filteredProducts.length}</div>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Categories</div>
              <div className="text-2xl font-bold font-mono text-purple-400">{categoryChartData.length}</div>
            </div>
          </div>

          {/* Sector Distribution */}
          <SectorDistribution
            data={categoryChartData}
            activeFilter={activeFilter}
            onFilter={handleFilter}
          />

          {/* Products Section - All products visible */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Trending Products
            </h2>

            <div className="space-y-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl">
                  <Activity className="w-8 h-8 text-purple-400 mb-3 animate-pulse" />
                  <p className="text-gray-500 text-sm">Loading market data...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <ProductCard
                    key={`${product?.name ?? "p"}-${i}`}
                    product={product}
                    isSelected={selectedProduct?.name === product?.name}
                    onClick={() => handleProductSelect(product)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl">
                  <Search className="w-8 h-8 text-gray-500 mb-3" />
                  <p className="text-gray-500 text-sm">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Detail Panel */}
        <div
          className={`
            fixed inset-x-0 bottom-0 z-40 bg-black border-t border-white/10 rounded-t-3xl
            transition-transform duration-300 ease-out shadow-2xl shadow-purple-500/10
            ${mobileDetailOpen ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ maxHeight: "90vh" }}
        >
          {/* Handle */}
          <div className="flex justify-center py-3">
            <button 
              onClick={() => setMobileDetailOpen(false)}
              className="w-12 h-1.5 rounded-full bg-white/20"
            />
          </div>
          
          {/* Content */}
          <div className="max-h-[calc(90vh-48px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 pb-8">
            {selectedProduct && (
              <ProductDetails
                product={selectedProduct}
                onClose={() => setMobileDetailOpen(false)}
                isMobile
              />
            )}
          </div>
        </div>

        {/* Mobile Backdrop */}
        {mobileDetailOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setMobileDetailOpen(false)}
          />
        )}

        {/* Mobile FAB */}
        {selectedProduct && !mobileDetailOpen && (
          <button
            onClick={() => setMobileDetailOpen(true)}
            className="fixed bottom-20 right-4 z-20 p-4 rounded-2xl bg-purple-600 shadow-lg shadow-purple-500/30"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
