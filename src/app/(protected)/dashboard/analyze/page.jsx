"use client";

import { useState, Suspense, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { AlertCircle, Loader } from "lucide-react";
import MarkdownRenderer from "@/components/analyze/MarkdownRenderer";
import { MAX_COGS_OPTIONS, REGIONS } from "@/utils/StaticData";
import Model3DViewer from "@/components/analyze/3d/Model3D";

const Icons = {
  Sparkles: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z"
      />
    </svg>
  ),
  Cube: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  Download: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  Chart: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};







// --- Main Component ---

export default function AnalyzePage() {
  const [categoryId, setCategoryId] = useState("");
  const [region, setRegion] = useState("");
  const [cogs, setCogs] = useState("");
  const [productName, setProductName] = useState("");
  const [artStyle, setArtStyle] = useState("realistic");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [pollingInterval, setPollingInterval] = useState(null);

  // ✅ FIX: Single source of truth for model data
  const [modelState, setModelState] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data.data;
    },
  });

  const categories = data?.categories || [];

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // ✅ FIX: Deep merge function that preserves all fields
  const deepMergeModelData = (existing, update) => {
    if (!existing) return update;
    if (!update) return existing;

    return {
      ...existing,
      ...update,
      // Preserve critical IDs
      id: update.id || existing.id,
      previewTaskId: update.previewTaskId || existing.previewTaskId,
      refineTaskId: update.refineTaskId || existing.refineTaskId,
      // Preserve URLs (don't overwrite with undefined)
      modelUrls: update.modelUrls || existing.modelUrls,
      textureUrls: update.textureUrls || existing.textureUrls,
      thumbnailUrl: update.thumbnailUrl || existing.thumbnailUrl,
      videoUrl: update.videoUrl || existing.videoUrl,
      // Always take latest status/progress
      status: update.status !== undefined ? update.status : existing.status,
      progress:
        update.progress !== undefined ? update.progress : existing.progress,
      stage: update.stage || existing.stage,
      message: update.message || existing.message,
      taskError: update.taskError || existing.taskError,
    };
  };

  const checkModelStatus = async (taskId) => {
    const maxChecks = 60; // 15 minutes (60 * 15s)
    let checks = 0;

    const intervalId = setInterval(async () => {
      checks++;

      try {
        const res = await api.get(`/analysis/3d-status/${taskId}`);
        const newData = res.data;

        console.log(`[Polling ${checks}/${maxChecks}] Status:`, {
          stage: newData.stage,
          status: newData.status,
          progress: newData.progress,
          hasTextures: !!newData.textureUrls,
          hasRefineId: !!newData.refineTaskId,
        });

        // ✅ FIX: Use deep merge instead of spread
        setModelState((prev) => deepMergeModelData(prev, newData));

        // Stop conditions
        if (
          newData.status === "SUCCEEDED" &&
          newData.stage === "refine" &&
          newData.textureUrls
        ) {
          console.log("✅ Model fully refined! Stopping poll.");
          clearInterval(intervalId);
          setPollingInterval(null);
        } else if (newData.status === "FAILED") {
          console.error("❌ Model generation failed!");
          clearInterval(intervalId);
          setPollingInterval(null);
        } else if (checks >= maxChecks) {
          console.warn("⏱️ Polling timeout reached");
          clearInterval(intervalId);
          setPollingInterval(null);
        }
      } catch (err) {
        console.error(`[Polling Error]`, err);
        if (checks >= maxChecks) {
          clearInterval(intervalId);
          setPollingInterval(null);
        }
      }
    }, 15000); // 15 seconds

    setPollingInterval(intervalId);
  };

  const handleAnalyze = async () => {
    setError("");
    setAnalysisResult(null);
    setModelState(null);

    if (!categoryId || !region) {
      setError("Category and Region are required.");
      return;
    }

    setIsAnalyzing(true);

    // Initialize model state immediately
    setModelState({
      status: "PENDING",
      stage: "preview",
      progress: 5,
      message: "Initializing 3D generation pipeline...",
    });

    try {
      const res = await api.post("/analysis/", {
        categoryId,
        region,
        cogs,
        productName: productName || undefined,
        artStyle,
      });

      const result = res.data;

      console.log("Initial API Response:", result);

      setAnalysisResult(result);

      // ✅ FIX: Merge initial model data properly
      if (result?.model3D) {
        setModelState((prev) => deepMergeModelData(prev, result.model3D));
      }

      // Start polling
      const taskIdToTrack =
        result?.model3D?.id || result?.model3D?.previewTaskId;
      if (taskIdToTrack) {
        console.log("🚀 Starting status polling for:", taskIdToTrack);
        checkModelStatus(taskIdToTrack);
      } else {
        console.error("❌ No task ID found in response!");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err.response?.data?.message || "Analysis failed. Please try again."
      );
      setModelState(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />

      <header className="relative border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
            <Icons.Chart />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Product Vision
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                {" "}
                Sector
              </span>
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Market Intelligence & 3D Visualization Engine
            </p>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500/20 to-transparent blur-xl opacity-50" />

              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl">
                <div className="relative h-full bg-[#050509] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))]" />

                  <div className="relative p-5 sm:p-6 backdrop-blur-3xl">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 shadow-inner">
                          <Icons.Download className="h-4 w-4 text-purple-300" />
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
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100">
                            <SelectValue
                              placeholder={
                                isLoading ? "Loading..." : "Select Category"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
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

                      {/* Region Select */}
                      <section className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Region
                        </label>
                        <Select
                          value={region}
                          onValueChange={setRegion}
                          disabled={isAnalyzing}
                        >
                          <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100">
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                            {Object.entries(REGIONS).map(([code, name]) => (
                              <SelectItem
                                key={code}
                                value={name}
                                className="focus:bg-purple-500/20 focus:text-white"
                              >
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </section>

                      {/* COGS */}
                      <section className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Cost of Goods Sold $ (COGS)
                        </label>
                        <Select
                          value={cogs}
                          onValueChange={setCogs}
                          disabled={isAnalyzing}
                        >
                          <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100">
                            <SelectValue placeholder="Select COGS $" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
                            {MAX_COGS_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                                className="focus:bg-purple-500/20 focus:text-white"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </section>

                      {/* Product Name */}
                      <section className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          Product Name{" "}
                          <span className="text-gray-600 font-normal normal-case">
                            Optional
                          </span>
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          disabled={isAnalyzing}
                          placeholder="e.g. CyberDesk V2"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-600"
                        />
                      </section>

                      {/* Art Style */}
                      <section className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Render Style
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {["realistic"].map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => setArtStyle(style)}
                              disabled={isAnalyzing}
                              className={`relative flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                                artStyle === style
                                  ? "bg-purple-500/20 border-purple-500/50 text-white shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
                                  : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                              }`}
                            >
                              <span className="capitalize">{style}</span>
                              {artStyle === style && (
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,1)]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </section>

                      {error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-200 backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span>{error}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-2 border-t border-white/5">
                      <button
                        onClick={handleAnalyze}
                        disabled={
                          isAnalyzing || isLoading || !categoryId || !region
                        }
                        className={`group relative w-full overflow-hidden rounded-xl p-[1px] transition-all duration-300 ${
                          !categoryId || !region
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.6)]"
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
                                <Icons.Sparkles className="h-4 w-4 text-purple-300 group-hover:text-white transition-colors" />
                                <span>Generate Analysis</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-8 space-y-8">
            {/* 3D Model Section */}
            {modelState && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-purple-500">
                      <Icons.Cube />
                    </span>
                    3D Prototype
                  </h2>

                  {modelState.status === "SUCCEEDED" &&
                    modelState.stage === "refine" &&
                    modelState.textureUrls && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 font-mono">
                        COMPLETED
                      </span>
                    )}

                  {(modelState.status === "PENDING" ||
                    modelState.status === "IN_PROGRESS" ||
                    modelState.status === "REFINING" ||
                    (modelState.status === "SUCCEEDED" &&
                      modelState.stage !== "refine")) && (
                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20 font-mono flex items-center gap-1">
                      <Loader className="h-3 w-3 animate-spin" />
                      {modelState.stage === "refine"
                        ? "REFINING"
                        : "GENERATING"}
                    </span>
                  )}

                  {modelState.status === "FAILED" && (
                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 font-mono">
                      FAILED
                    </span>
                  )}
                </div>

                <Model3DViewer modelData={modelState} />
              </section>
            )}

            {/* Insights Section */}
            {analysisResult?.insights && (
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <span className="text-blue-500">
                    <Icons.Chart />
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Market Intelligence
                  </h2>
                </div>

                <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-h3:text-purple-300 prose-strong:text-white prose-p:text-gray-300 prose-li:text-gray-300">
                    <MarkdownRenderer
                      content={analysisResult.insights}
                      title=""
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Empty State */}
            {!modelState && !analysisResult && !isAnalyzing && (
              <div className="h-[400px] flex flex-col items-center justify-center text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                <div className="w-20 h-20 bg-gradient-to-tr from-gray-800 to-black rounded-full flex items-center justify-center mb-6 shadow-xl border border-white/5">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-500 max-w-xs text-sm">
                  Configure your product parameters on the left to generate
                  market insights and 3D visualizations.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
