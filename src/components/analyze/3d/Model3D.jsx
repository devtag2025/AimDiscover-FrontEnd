"use client"
import {useState,Suspense} from "react"
import { CanvasLoader } from "../CanvasLoader";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import {Icons} from "@/utils/StaticData"

function Model3DViewer({ modelData }) {
  const [loadError, setLoadError] = useState(null);
  const isProcessing =
    !modelData ||
    modelData.status === "PENDING" ||
    modelData.status === "IN_PROGRESS" ||
    modelData.status === "REFINING" ||
    (modelData.status === "SUCCEEDED" && modelData.stage !== "refine") ||
    !modelData.textureUrls;

  const isFailed = modelData?.status === "FAILED";
  const isReady =
    modelData?.status === "SUCCEEDED" &&
    modelData?.stage === "refine" &&
    modelData?.textureUrls &&
    modelData?.refineTaskId;

  // Loading State
  if (isProcessing) {
    return (
      <div className="w-full h-[500px] bg-[#0A0A0A] rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />

        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          <div className="w-20 h-20 relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin" />
            <div className="absolute inset-2 bg-purple-500/10 rounded-full backdrop-blur-md flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            {modelData?.stage === "refine"
              ? "Refining with PBR Textures"
              : "Generating Geometry"}
          </h3>
          <p className="text-purple-200/60 text-sm mb-6">
            {modelData?.message ||
              `${
                modelData?.stage === "refine"
                  ? "Applying metallic, roughness, normal maps..."
                  : "Creating 3D mesh structure..."
              }`}
          </p>

          <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden backdrop-blur-sm border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 relative"
              style={{ width: `${modelData?.progress || 5}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-gray-500">
            <span>
              STAGE:{" "}
              <span className="text-purple-400 uppercase">
                {modelData?.stage || "INIT"}
              </span>
            </span>
            <span>|</span>
            <span>
              PROGRESS:{" "}
              <span className="text-blue-400">{modelData?.progress || 0}%</span>
            </span>
          </div>

          {modelData?.stage === "refine" && (
            <div className="mt-4 text-xs text-emerald-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              PBR Texture Generation Active
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="w-full h-[500px] bg-[#0A0A0A] rounded-2xl border border-red-500/20 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-red-400 font-bold mb-1">Generation Failed</h3>
          <p className="text-gray-500 text-sm">
            {modelData?.taskError || "System encountered an error"}
          </p>
        </div>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-[#080808] border border-white/10">
          <Canvas
            shadows
            gl={{ alpha: false, antialias: true, preserveDrawingBuffer: true }}
            onError={(error) => {
              console.error("Canvas error:", error);
              setLoadError(error.message);
            }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <Scene refineTaskId={modelData.refineTaskId} />
            </Suspense>
          </Canvas>

          {/* Controls Overlay */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/80 font-mono">
              Interactive 3D Preview
            </div>

            {modelData.modelUrls && (
              <div className="flex flex-col gap-2 pointer-events-auto">
                {Object.entries(modelData.modelUrls).map(([format, url]) =>
                  url ? (
                    <a
                      key={format}
                      href={url}
                      download={`refined-model.${format}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg"
                    >
                      <Icons.Download />
                      <span className="uppercase">{format}</span>
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none">
            <div className="bg-green-500/10 backdrop-blur-md border border-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Refined PBR Textures Active
            </div>
          </div>

          {loadError && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-900/80 backdrop-blur text-white px-4 py-2 rounded-lg text-xs border border-red-500/30">
              Error: {loadError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}


export default Model3DViewer