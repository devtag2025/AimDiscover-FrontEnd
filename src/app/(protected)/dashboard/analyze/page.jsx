"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Loader } from "lucide-react";
import * as LucideIcons from "lucide-react";
import MarkdownRenderer from "@/components/analyze/MarkdownRenderer";
import Model3DViewer from "@/components/analyze/3d/Model3D";
import AnalyzeConfig from "@/components/analyze/ConfigPanel/AnalyzeConfig";
import InsightsCard from "@/components/analyze/InsightsCard";
import ChatInterface from "@/components/analyze/ChatInterface";

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
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data.data;
    },
  });

  const categories = data?.categories || [];

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Base configuration (set once, doesn't change during refinement)
  const [baseConfig, setBaseConfig] = useState(null);
  
  // Current analysis result
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Refinement state
  const [showChatInput, setShowChatInput] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  
  // UI states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating3D, setIsGenerating3D] = useState(false);
  const [error, setError] = useState("");
  
  // 3D model state
  const [modelState, setModelState] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // ============================================
  // HANDLER 1: Initial Analysis
  // ============================================
  const handleInitialAnalyze = async (config) => {
    setError("");
    setAnalysisResult(null);
    setModelState(null);
    setShowChatInput(false);
    setConversationHistory([]);
    setIsAnalyzing(true);

    // Store base config for future refinements
    setBaseConfig(config);

    try {
      console.log("📊 Initial analysis request:", config);

      // Call new insights endpoint (no refinementContext)
      const res = await api.post("/analysis/insights", config);
      const result = res.data;

      console.log("✅ Initial insights received");

      setAnalysisResult(result);
      
      // Add to conversation history
      setConversationHistory([
        {
          type: "system",
          message: "Initial analysis generated",
          timestamp: new Date().toISOString(),
        },
      ]);

    } catch (err) {
      console.error("❌ Analysis error:", err);
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ============================================
  // HANDLER 2: Refinement (with chat context)
  // ============================================
  const handleRefineInsights = async (refinementContext) => {
    if (!baseConfig) {
      setError("No base configuration found");
      return;
    }

    if (!refinementContext || !refinementContext.trim()) {
      setError("Please provide refinement instructions");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      console.log("🔄 Refining insights with context:", refinementContext);

      // Combine base config with refinement context
      const refinementPayload = {
        ...baseConfig,
        refinementContext: refinementContext.trim(),
      };

      const res = await api.post("/analysis/insights", refinementPayload);
      const result = res.data;

      console.log("✅ Refined insights received");

      setAnalysisResult(result);

      // Add to conversation history
      setConversationHistory((prev) => [
        ...prev,
        {
          type: "user",
          message: refinementContext,
          timestamp: new Date().toISOString(),
        },
        {
          type: "system",
          message: "Insights refined based on your feedback",
          timestamp: new Date().toISOString(),
        },
      ]);

    } catch (err) {
      console.error("❌ Refinement error:", err);
      setError(err.response?.data?.message || "Refinement failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ============================================
  // HANDLER 3: Generate 3D Model
  // ============================================
  const handleGenerate3D = async () => {
    if (!analysisResult?.meshPrompt) {
      setError("No mesh prompt available");
      return;
    }

    setError("");
    setModelState({
      status: "PENDING",
      stage: "preview",
      progress: 5,
      message: "Initializing 3D generation...",
    });
    setIsGenerating3D(true);

    try {
      console.log("🎨 Generating 3D model");

      const res = await api.post("/analysis/generate-3d", {
        meshPrompt: analysisResult.meshPrompt,
        artStyle: "realistic",
      });

      const result = res.data;

      if (result?.model3D) {
        setModelState((prev) => deepMergeModelData(prev, result.model3D));
      }

      const taskId = result?.model3D?.id || result?.model3D?.previewTaskId;
      if (taskId) {
        console.log("🚀 Starting 3D polling:", taskId);
        checkModelStatus(taskId);
      }

    } catch (err) {
      console.error("❌ 3D generation error:", err);
      setError(err.response?.data?.message || "3D generation failed");
      setModelState(null);
    } finally {
      setIsGenerating3D(false);
    }
  };

  // ============================================
  // HELPER: Deep merge model data
  // ============================================
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

  // ============================================
  // HELPER: Check 3D model status (polling)
  // ============================================
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

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />

      {/* Header */}
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
          
          {/* Configuration Panel */}
          <section>
            <AnalyzeConfig
              categories={categories}
              isLoading={isLoading}
              isAnalyzing={isAnalyzing}
              error={error}
              onAnalyze={handleInitialAnalyze}
            />
          </section>

          {/* Results Section */}
          {analysisResult && (
            <section className="space-y-6">
              
              {/* Insights Card with Action Buttons */}
              <InsightsCard
                insights={analysisResult.insights}
                isAnalyzing={isAnalyzing}
                onGenerate3D={handleGenerate3D}
                onRefine={() => setShowChatInput(true)}
                conversationHistory={conversationHistory}
              />

              {/* Chat Interface (shows after user clicks "Refine") */}
              {showChatInput && (
                <ChatInterface
                  onRefine={handleRefineInsights}
                  isRefining={isAnalyzing}
                  conversationHistory={conversationHistory}
                />
              )}

              {/* 3D Viewer (shows after 3D generation starts) */}
              {modelState && (
                <div className="animate-in fade-in slide-in-from-bottom duration-700">
                  <Model3DViewer modelData={modelState} />
                </div>
              )}

            </section>
          )}

        </div>
      </main>
    </div>
  );
}