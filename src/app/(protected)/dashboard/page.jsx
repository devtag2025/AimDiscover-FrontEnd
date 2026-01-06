"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Activity, Search, Filter, X, TrendingUp, Package, ChevronUp } from "lucide-react";
import ProductCard from "@/components/dashboard/ProductCard";
import ProductDetails from "@/components/dashboard/ProductDetails";
import SectorDistribution from "@/components/dashboard/SectorDistribution";
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
  const insight = payload?.insight ?? payload?.data?.insight ?? payload?.data ?? payload ?? null;

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
        return Array.isArray(p.top_countries) && p.top_countries.includes(activeFilter.value);
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
        <div className="max-w-3xl mx-auto rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Failed to load analytics</h2>
          <p className="text-gray-400 text-sm">{String(error?.message ?? "Unknown error")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="border-b border-gray-800">
          <div className="max-w-[1800px] mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Product Analytics</h1>
                <p className="text-sm text-gray-400 mt-1">
                  {filteredProducts.length} of {products.length} products
                  {activeFilter.type && ` • Filtered by ${activeFilter.value}`}
                </p>
              </div>

              {/* Filter Badge */}
              {activeFilter.type && (
                <button
                  onClick={clearFilter}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm hover:bg-purple-500/20 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{activeFilter.value}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-4 xl:col-span-3 space-y-4">
              {/* Sector Distribution */}
              <SectorDistribution
                data={categoryChartData}
                activeFilter={activeFilter}
                onFilter={handleFilter}
              />

              {/* Products List */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-white">Trending Products</h2>
                    <span className="text-xs text-gray-500">{filteredProducts.length}</span>
                  </div>
                </div>

                <div className="p-3 space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Activity className="w-6 h-6 text-purple-400 mb-2" />
                      <p className="text-gray-500 text-xs">Loading products...</p>
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
                      <Search className="w-6 h-6 text-gray-500 mb-2" />
                      <p className="text-gray-500 text-xs">No products found</p>
                      {activeFilter.type && (
                        <button
                          onClick={clearFilter}
                          className="mt-2 text-xs text-purple-400 hover:text-purple-300"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Panel */}
            <div className="col-span-8 xl:col-span-9">
              {selectedProduct ? (
                <ProductDetails product={selectedProduct} />
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="w-16 h-16 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">Select a product</h3>
                  <p className="text-sm text-gray-400 text-center max-w-md">
                    Choose a product from the sidebar to view detailed analytics
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-black border-b border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Product Analytics</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <span className="text-sm font-mono text-purple-300">{filteredProducts.length}</span>
            </div>
          </div>

          {/* Mobile Filter */}
          {activeFilter.type && (
            <button
              onClick={clearFilter}
              className="mt-3 w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Filter className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{activeFilter.value}</span>
              </div>
              <X className="w-4 h-4 flex-shrink-0" />
            </button>
          )}
        </div>

        {/* Mobile Content */}
        <div className="px-4 py-4 pb-24 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Products</div>
              <div className="text-2xl font-semibold font-mono text-white">
                {filteredProducts.length}
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Categories</div>
              <div className="text-2xl font-semibold font-mono text-purple-400">
                {categoryChartData.length}
              </div>
            </div>
          </div>

          {/* Sector Distribution */}
          <SectorDistribution
            data={categoryChartData}
            activeFilter={activeFilter}
            onFilter={handleFilter}
          />

          {/* Products */}
          <div>
            <h2 className="text-sm font-medium text-white mb-3">Trending Products</h2>

            <div className="space-y-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-900/50 border border-gray-800 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-500 text-sm">Loading...</p>
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
                <div className="flex flex-col items-center justify-center py-16 bg-gray-900/50 border border-gray-800 rounded-lg">
                  <Search className="w-6 h-6 text-gray-500 mb-2" />
                  <p className="text-gray-500 text-sm">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Detail Panel */}
        <div
          className={`
            fixed inset-x-0 bottom-0 z-40 bg-black border-t border-gray-800 rounded-t-2xl
            transition-transform duration-300 ease-out
            ${mobileDetailOpen ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ maxHeight: "90vh" }}
        >
          {/* Handle */}
          <div className="flex justify-center py-3">
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="w-12 h-1 rounded-full bg-gray-700"
            />
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-48px)] overflow-y-auto px-4 pb-8">
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
            className="fixed inset-0 bg-black/60 z-30"
            onClick={() => setMobileDetailOpen(false)}
          />
        )}

        {/* Mobile FAB */}
        {selectedProduct && !mobileDetailOpen && (
          <button
            onClick={() => setMobileDetailOpen(true)}
            className="fixed bottom-20 right-4 z-20 p-3 rounded-xl bg-purple-600 border border-purple-500 shadow-lg"
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;