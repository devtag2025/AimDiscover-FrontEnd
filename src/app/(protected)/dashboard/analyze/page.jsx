"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Loader } from "lucide-react";
import * as LucideIcons from "lucide-react";
import MarkdownRenderer from "@/components/analyze/MarkdownRenderer";
import Model3DViewer from "@/components/analyze/3d/Model3D";
import AnalyzeConfig from "@/components/analyze/ConfigPanel/AnalyzeConfig";

const Icons = {
  Cube: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [pollingInterval, setPollingInterval] = useState(null);
  const [modelState, setModelState] = useState(null);

  // Fetch categories dynamically
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

  // Deep merge function for model data
  const deepMergeModelData = (existing, update) => {
    if (!existing) return update;
    if (!update) return existing;

    return {
      ...existing,
      ...update,
      id: update.id || existing.id,
      previewTaskId: update.previewTaskId || existing.previewTaskId,
      refineTaskId: update.refineTaskId || existing.refineTaskId,
      modelUrls: update.modelUrls || existing.modelUrls,
      textureUrls: update.textureUrls || existing.textureUrls,
      thumbnailUrl: update.thumbnailUrl || existing.thumbnailUrl,
      videoUrl: update.videoUrl || existing.videoUrl,
      status: update.status !== undefined ? update.status : existing.status,
      progress: update.progress !== undefined ? update.progress : existing.progress,
      stage: update.stage || existing.stage,
      message: update.message || existing.message,
      taskError: update.taskError || existing.taskError,
    };
  };

  const checkModelStatus = async (taskId) => {
    const maxChecks = 60;
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

        setModelState((prev) => deepMergeModelData(prev, newData));

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
    }, 15000);

    setPollingInterval(intervalId);
  };

  const handleAnalyze = async (payload) => {
    setError("");
    setAnalysisResult(null);
    setModelState(null);
    setIsAnalyzing(true);

    // Initialize model state
    setModelState({
      status: "PENDING",
      stage: "preview",
      progress: 5,
      message: "Initializing 3D generation pipeline...",
    });

    try {
      console.log("Sending analysis request with payload:", payload);

      const res = await api.post("/analysis/", payload);
      const result = res.data;

      console.log("Initial API Response:", result);

      setAnalysisResult(result);

      if (result?.model3D) {
        setModelState((prev) => deepMergeModelData(prev, result.model3D));
      }

      const taskIdToTrack = result?.model3D?.id || result?.model3D?.previewTaskId;
      if (taskIdToTrack) {
        console.log("🚀 Starting status polling for:", taskIdToTrack);
        checkModelStatus(taskIdToTrack);
      } else {
        console.error("❌ No task ID found in response!");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
      setModelState(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />

      <header className="relative border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-3">
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

      <main className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Configuration Section - Top (Horizontal Layout) */}
          <section>
            <AnalyzeConfig
              categories={categories}
              isLoading={isLoading}
              isAnalyzing={isAnalyzing}
              error={error}
              onAnalyze={handleAnalyze}
            />
          </section>

          {/* Results Section - Bottom (3D Viewer + Insights Side by Side) */}
          {(modelState || analysisResult || isAnalyzing) && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D Model Viewer - Left */}
              <div className="animate-in fade-in slide-in-from-left duration-700">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Icons.Cube />
                    <span>3D Prototype</span>
                  </h2>

                  {modelState?.status === "SUCCEEDED" &&
                    modelState?.stage === "refine" &&
                    modelState?.textureUrls && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-md border border-green-500/20 font-mono">
                        COMPLETED
                      </span>
                    )}

                  {(modelState?.status === "PENDING" ||
                    modelState?.status === "IN_PROGRESS" ||
                    modelState?.status === "REFINING" ||
                    (modelState?.status === "SUCCEEDED" && modelState?.stage !== "refine")) && (
                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-md border border-yellow-500/20 font-mono flex items-center gap-1.5">
                      <Loader className="h-3 w-3 animate-spin" />
                      {modelState?.stage === "refine" ? "REFINING" : "GENERATING"}
                    </span>
                  )}

                  {modelState?.status === "FAILED" && (
                    <span className="text-xs bg-red-500/10 text-red-400 px-2.5 py-1 rounded-md border border-red-500/20 font-mono">
                      FAILED
                    </span>
                  )}
                </div>

                {/* 3D Viewer Container */}
                <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent">
                  <div className="relative bg-[#0A0A0E] rounded-2xl overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.1),rgba(255,255,255,0))]" />
                    
                    <div className="relative min-h-[500px] flex items-center justify-center p-8">
                      {modelState ? (
                        <Model3DViewer modelData={modelState} />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-tr from-gray-800 to-black rounded-full flex items-center justify-center mb-4 mx-auto border border-white/5">
                            <Icons.Cube />
                          </div>
                          <p className="text-gray-500 text-sm">
                            {isAnalyzing ? "Generating 3D model..." : "No 3D model generated yet"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Insights - Right */}
              <div className="animate-in fade-in slide-in-from-right duration-700">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <LucideIcons.FileText className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-bold text-white">Market Intelligence</h2>
                </div>

                {/* Insights Container */}
                <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-blue-500/30 via-white/10 to-transparent">
                  <div className="relative bg-[#0A0A0E] rounded-2xl overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
                    
                    <div className="relative min-h-[500px] max-h-[600px] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {analysisResult?.insights ? (
                        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-h2:text-blue-300 prose-h3:text-blue-400 prose-strong:text-white prose-p:text-gray-300 prose-li:text-gray-300">
                          <MarkdownRenderer content={analysisResult.insights} title="" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                          <div className="w-16 h-16 bg-gradient-to-tr from-gray-800 to-black rounded-full flex items-center justify-center mb-4 border border-white/5">
                            <LucideIcons.FileText className="h-6 w-6 text-gray-600" />
                          </div>
                          <p className="text-gray-500 text-sm">
                            {isAnalyzing ? "Generating market insights..." : "No insights generated yet"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Empty State - When Nothing is Generated */}
          {!modelState && !analysisResult && !isAnalyzing && (
            <section className="animate-in fade-in duration-700">
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
                <h3 className="text-lg font-medium text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 max-w-md text-sm">
                  Configure your product parameters above and click "Generate Market Analysis" to
                  create 3D visualizations and market insights.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}