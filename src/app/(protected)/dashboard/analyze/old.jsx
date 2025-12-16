// import { useState, Suspense, useRef, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Stage } from "@react-three/drei";
// import api from "@/lib/api";
// import { CanvasLoader } from "@/components/analyze/CanvasLoader";
// import { ModelErrorBoundary } from "@/components/analyze/ModalErrorBoundary";
// import {
//   Box,
//   Layers,
//   Globe,
//   Cpu,
//   Sparkles,
//   Download,
//   Activity,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   Maximize2,
//   Terminal
// } from 'lucide-react';

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// // --- 3D Components ---

// function MeshyModel({ refineTaskId }) {
//   const groupRef = useRef();
//   const proxyUrl = `${API}/analysis/3d-model/${refineTaskId}`;

//   const { scene } = useGLTF(
//     proxyUrl,
//     true,
//     undefined,
//     (loader) => {
//       loader.setCrossOrigin("anonymous");
//     }
//   );

//   useFrame((state) => {
//     if (groupRef.current) {
//       // Gentle floating animation
//       groupRef.current.rotation.y += 0.002;
//       groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
//     }
//   });

//   if (scene) {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
//         child.receiveShadow = true;
//         if (child.material) {
//           child.material.envMapIntensity = 1.5;
//           child.material.metalness = 0.2;
//           child.material.roughness = 0.5;
//         }
//       }
//     });
//   }

//   return (
//     <group ref={groupRef} scale={2} position={[0, -1, 0]}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// function Scene({ refineTaskId }) {
//   return (
//     <>
//       <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />

//       {/* Studio Lighting Setup */}
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
//       <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" /> {/* Purple rim light */}

//       <ModelErrorBoundary fallback={<CanvasLoader />}>
//         <Stage intensity={0.5} environment="city" adjustCamera={false}>
//             <MeshyModel refineTaskId={refineTaskId} />
//         </Stage>
//       </ModelErrorBoundary>

//       {/* Grid Floor */}
//       <gridHelper args={[20, 20, 0x334155, 0x1e293b]} position={[0, -2, 0]} />

//       <OrbitControls
//         enablePan={true}
//         enableZoom={true}
//         enableRotate={true}
//         minDistance={3}
//         maxDistance={20}
//         autoRotate={false}
//       />
//     </>
//   );
// }

// // --- Main Components ---

// function Model3DViewer({ modelData }) {
//   const [loadError, setLoadError] = useState(null);

//   // Loading / Processing State
//   if (modelData.status === "PENDING" ||
//       modelData.status === "IN_PROGRESS" ||
//       modelData.status === "REFINING" ||
//       !modelData.textureUrls) {
//     return (
//       <div className="w-full h-[500px] bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
//         {/* Animated Background Mesh */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

//         <div className="relative z-10 text-center space-y-6 max-w-md p-6">
//            <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
//               <div className="absolute inset-2 rounded-full border-r-2 border-purple-400/50 animate-spin reverse"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                  <Box className="w-8 h-8 text-purple-400 animate-pulse" />
//               </div>
//            </div>

//            <div className="space-y-2">
//               <h3 className="text-xl font-medium text-white tracking-tight">
//                  {modelData.stage === 'refine' ? 'Refining Geometry' : 'Generating Mesh'}
//               </h3>
//               <p className="text-sm text-slate-400">
//                  {modelData.message || "Processing topological data and generating textures..."}
//               </p>
//            </div>

//            <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800 space-y-3 w-full">
//               <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider">
//                  <span>Progress</span>
//                  <span>{modelData.progress || 0}%</span>
//               </div>
//               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
//                  <div className="h-full bg-purple-500 transition-all duration-500 ease-out relative" style={{width: `${modelData.progress}%`}}>
//                     <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
//                  </div>
//               </div>
//               <div className="flex justify-between text-xs font-mono text-slate-500">
//                  <span>STAGE: {modelData.stage?.toUpperCase() || "INIT"}</span>
//                  <span>ID: {modelData.id?.slice(0,8)}</span>
//               </div>
//            </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (modelData.status === "FAILED") {
//     return (
//       <div className="w-full h-[500px] bg-slate-900/50 rounded-2xl border border-red-900/30 flex items-center justify-center relative overflow-hidden">
//         <div className="text-center p-8 bg-red-950/20 rounded-2xl border border-red-900/50 backdrop-blur-sm">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-red-200 mb-2">Generation Failed</h3>
//           <p className="text-sm text-red-400 max-w-xs mx-auto">{modelData.taskError || "An unknown error occurred during mesh generation."}</p>
//         </div>
//       </div>
//     );
//   }

//   // Refined & Complete State
//   if (!modelData.refineTaskId || !modelData.textureUrls) {
//      return null; // Should be handled by loading state, but safe fallback
//   }

//   return (
//     <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
//       {/* 3D Viewport Header */}
//       <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
//          <div className="flex flex-col gap-1">
//             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950/80 backdrop-blur px-2 py-1 rounded border border-slate-800 w-fit">
//                Interactive Viewport
//             </span>
//             <div className="pointer-events-auto">
//                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-md">
//                   <CheckCircle2 className="w-3 h-3" /> Ready
//                </span>
//             </div>
//          </div>

//          <div className="flex flex-col gap-2 pointer-events-auto">
//             {modelData.modelUrls && Object.entries(modelData.modelUrls).map(([format, url]) => (
//                 url && (
//                   <a
//                     key={format}
//                     href={url}
//                     download={`model.${format}`}
//                     className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 hover:bg-purple-600 border border-slate-800 hover:border-purple-500 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all backdrop-blur-md group/btn"
//                   >
//                     <Download className="w-3 h-3" />
//                     <span className="uppercase">{format}</span>
//                   </a>
//                 )
//             ))}
//          </div>
//       </div>

//       <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
//         <Canvas
//           shadows
//           gl={{ alpha: false, antialias: true, preserveDrawingBuffer: true }}
//           onError={(e) => setLoadError(e.message)}
//           dpr={[1, 2]} // Optimization for varying screens
//         >
//           <color attach="background" args={['#0f172a']} /> {/* Slate-900 bg match */}
//           <Suspense fallback={<CanvasLoader />}>
//             <Scene refineTaskId={modelData.refineTaskId} />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* Viewport Footer */}
//       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
//          <div className="text-[10px] text-slate-500 font-mono">
//             RENDER_ENGINE: WEBGL2<br/>
//             TEXTURES: PBR_ENABLED
//          </div>
//          <div className="pointer-events-auto">
//              <button className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 backdrop-blur-md">
//                 <Maximize2 className="w-4 h-4" />
//              </button>
//          </div>
//       </div>

//       {loadError && (
//         <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
//           <div className="text-red-400 flex items-center gap-2 px-4 py-2 bg-red-950/50 rounded-lg border border-red-900">
//             <AlertCircle className="w-4 h-4" /> {loadError}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function AnalyzePage() {
//   const [categoryId, setCategoryId] = useState("");
//   const [region, setRegion] = useState("");
//   const [productName, setProductName] = useState("");
//   const [artStyle, setArtStyle] = useState("realistic");
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [error, setError] = useState("");
//   const [pollingInterval, setPollingInterval] = useState(null);

//   const { data, isLoading } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const res = await api.get("/categories");
//       return res.data.data;
//     },
//   });

//   const categories = data?.categories || [];

//   useEffect(() => {
//     return () => {
//       if (pollingInterval) clearInterval(pollingInterval);
//     };
//   }, [pollingInterval]);

//   const checkModelStatus = async (taskId) => {
//     const maxChecks = 60; // Increased check time
//     let checks = 0;

//     const intervalId = setInterval(async () => {
//       checks++;
//       try {
//         const res = await api.get(`/analysis/3d-status/${taskId}`);
//         const modelData = res.data;

//         setAnalysisResult(prev => ({
//           ...prev,
//           model3D: { ...prev.model3D, ...modelData }
//         }));

//         if (modelData.status === "SUCCEEDED" && modelData.stage === "refine" && modelData.textureUrls) {
//           clearInterval(intervalId);
//           setPollingInterval(null);
//         } else if (modelData.status === "FAILED" || checks >= maxChecks) {
//           clearInterval(intervalId);
//           setPollingInterval(null);
//         }
//       } catch (err) {
//         if (checks >= maxChecks) {
//           clearInterval(intervalId);
//           setPollingInterval(null);
//         }
//       }
//     }, 10000); // 10s polling

//     setPollingInterval(intervalId);
//   };

//   const handleAnalyze = async () => {
//     setError("");
//     setAnalysisResult(null);
//     if (!categoryId || !region) {
//       setError("Please select a category and region");
//       return;
//     }

//     setIsAnalyzing(true);

//     try {
//       const res = await api.post("/analysis/", {
//         categoryId,
//         region,
//         productName: productName || undefined,
//         artStyle,
//       });

//       const result = res.data;
//       setAnalysisResult(result);

//       if (result?.model3D?.id) checkModelStatus(result.model3D.id);
//       else if (result?.model3D?.previewTaskId) checkModelStatus(result.model3D.previewTaskId);

//     } catch (err) {
//       setError(err.response?.data?.message || "Analysis failed. Please try again.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 p-4 md:p-8">
//       {/* Background Ambient Glow */}
//       <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto space-y-8 relative z-10">

//         {/* Header */}
//         <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/60 pb-6">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 text-purple-400 mb-1">
//               <Cpu className="w-5 h-5" />
//               <span className="text-xs font-bold tracking-widest uppercase">Generative Engine</span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
//               Product Forge
//             </h1>
//             <p className="text-slate-500 text-sm">
//               Generate AI-powered market insights and 3D prototypes.
//             </p>
//           </div>

//           <div className="flex gap-8 pl-8 md:border-l border-slate-800/60">
//              <div className="text-right hidden sm:block">
//                <div className="text-xs text-slate-500 uppercase font-medium">Model Engine</div>
//                <div className="text-xl font-medium text-white font-mono">V2.1-PBR</div>
//              </div>
//              <div className="text-right hidden sm:block">
//                <div className="text-xs text-slate-500 uppercase font-medium">Est. Time</div>
//                <div className="text-xl font-medium text-purple-400 font-mono">~3m</div>
//              </div>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

//           {/* Left Sidebar: Controls (Span 4) */}
//           <div className="lg:col-span-4 sticky top-6 space-y-6">
//             <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
//                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-6 flex items-center gap-2">
//                  <Layers className="w-4 h-4 text-purple-400" />
//                  Configuration
//                </h2>

//                <div className="space-y-5">
//                   {/* Category Select */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
//                        <Box className="w-3 h-3" /> Category
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={categoryId}
//                         onChange={(e) => setCategoryId(e.target.value)}
//                         disabled={isLoading || isAnalyzing}
//                         className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all appearance-none disabled:opacity-50"
//                       >
//                         <option value="">Select a category...</option>
//                         {categories?.map((cat) => (
//                           <option key={cat.id} value={cat.id}>{cat.name}</option>
//                         ))}
//                       </select>
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Region Input */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
//                        <Globe className="w-3 h-3" /> Target Region
//                     </label>
//                     <input
//                       type="text"
//                       value={region}
//                       onChange={(e) => setRegion(e.target.value)}
//                       placeholder="e.g. North America, Japan"
//                       className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-slate-600"
//                     />
//                   </div>

//                   {/* Product Name */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
//                        <Sparkles className="w-3 h-3" /> Product Name <span className="text-slate-600 ml-auto font-normal">Optional</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={productName}
//                       onChange={(e) => setProductName(e.target.value)}
//                       placeholder="e.g. Cyberpunk Sneaker"
//                       className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-slate-600"
//                     />
//                   </div>

//                   {/* Style Select */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-400">Rendering Style</label>
//                     <div className="grid grid-cols-2 gap-2">
//                        {['realistic', 'sculpture'].map((style) => (
//                           <button
//                             key={style}
//                             onClick={() => setArtStyle(style)}
//                             className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
//                               artStyle === style
//                               ? 'bg-purple-500/10 border-purple-500 text-purple-300'
//                               : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
//                             }`}
//                           >
//                              {style.charAt(0).toUpperCase() + style.slice(1)}
//                           </button>
//                        ))}
//                     </div>
//                   </div>

//                   {error && (
//                     <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg flex items-start gap-2">
//                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
//                        <p className="text-xs text-red-200">{error}</p>
//                     </div>
//                   )}

//                   <button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing || isLoading}
//                     className="w-full relative overflow-hidden bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
//                   >
//                     <div className="relative z-10 flex items-center justify-center gap-2">
//                        {isAnalyzing ? (
//                          <Loader2 className="w-4 h-4 animate-spin" />
//                        ) : (
//                          <Cpu className="w-4 h-4" />
//                        )}
//                        {isAnalyzing ? "Initializing..." : "Generate Asset"}
//                     </div>
//                     {/* Button Shine Effect */}
//                     <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
//                   </button>
//                </div>
//             </div>

//             {/* Helper Card */}
//             <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
//                <div className="flex gap-3">
//                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
//                      <Terminal className="w-4 h-4 text-slate-500" />
//                   </div>
//                   <div>
//                      <h4 className="text-sm font-medium text-slate-300">System Note</h4>
//                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                         Generation involves geometry synthesis and texture simulation. This process typically takes 2-5 minutes. The interface will update automatically.
//                      </p>
//                   </div>
//                </div>
//             </div>
//           </div>

//           {/* Right Content: Results (Span 8) */}
//           <div className="lg:col-span-8 space-y-6">

//             {/* 3D Model Section */}
//             {analysisResult?.model3D ? (
//               <Model3DViewer modelData={analysisResult.model3D} />
//             ) : (
//                // Empty State Placeholder
//                !isAnalyzing && (
//                   <div className="h-[400px] border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center bg-slate-900/20">
//                      <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
//                         <Box className="w-6 h-6 text-slate-600" />
//                      </div>
//                      <h3 className="text-slate-400 font-medium">No Asset Generated</h3>
//                      <p className="text-sm text-slate-600 mt-1 max-w-xs text-center">
//                         Configure the parameters on the left and click Generate to start the simulation.
//                      </p>
//                   </div>
//                )
//             )}

//             {/* Insights Terminal */}
//             {analysisResult?.insights && (
//                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
//                   <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
//                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
//                         <Activity className="w-4 h-4 text-emerald-500" />
//                         Market Analysis Report
//                      </h3>
//                      <span className="text-[10px] text-slate-600 font-mono">ID_{analysisResult.model3D?.id?.slice(0,6) || "0000"}</span>
//                   </div>
//                   <div className="p-6">
//                      <div className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
//                         {analysisResult.insights}
//                      </div>
//                   </div>
//                </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
