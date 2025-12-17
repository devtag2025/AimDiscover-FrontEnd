// "use client";

// import { useState, Suspense, useRef, useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
// } from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   Environment,
//   useGLTF,
//   Html,
// } from "@react-three/drei";
// import api from "@/lib/api";
// import { AlertCircle } from "lucide-react";
// import { CanvasLoader } from "@/components/analyze/CanvasLoader";
// import { ModelErrorBoundary } from "@/components/analyze/ModalErrorBoundary";
// import MarkdownRenderer from "@/components/analyze/MarkdownRenderer";
// import { MAX_COGS_OPTIONS, REGIONS } from "@/utils/StaticData";
// import { Loader } from "lucide-react";
// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// const Icons = {
//   Sparkles: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z"
//       />
//     </svg>
//   ),
//   Cube: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//       />
//     </svg>
//   ),
//   Download: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//       />
//     </svg>
//   ),
//   Chart: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//       />
//     </svg>
//   ),
// };

// // --- 3D Components ---

// function MeshyModel({ refineTaskId }) {
//   const groupRef = useRef();
//   const proxyUrl = `${API}/analysis/3d-model/${refineTaskId}`;

//   const { scene } = useGLTF(proxyUrl, true, undefined, (loader) => {
//     loader.setCrossOrigin("anonymous");
//   });

//   useFrame((state) => {
//     if (groupRef.current) {
//       // Gentle floating animation
//       groupRef.current.rotation.y += 0.002;
//       groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
//     }
//   });

//   if (scene) {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
//         child.receiveShadow = true;
//         if (child.material) {
//           child.material.envMapIntensity = 1.5; // Slightly bumped up
//           child.material.metalness = 0.2;
//           child.material.roughness = 0.5;
//         }
//       }
//     });
//   }

//   return (
//     <group ref={groupRef} scale={2} position={[0, 0, 0]}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// function Scene({ refineTaskId }) {
//   return (
//     <>
//       <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
//       {/* Lighting Setup */}
//       <ambientLight intensity={0.4} />
//       <spotLight
//         position={[10, 10, 10]}
//         angle={0.15}
//         penumbra={1}
//         intensity={1}
//         castShadow
//       />
//       <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />{" "}
//       {/* Purple backlight */}
//       <ModelErrorBoundary fallback={<CanvasLoader />}>
//         <MeshyModel refineTaskId={refineTaskId} />
//       </ModelErrorBoundary>
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
//         <planeGeometry args={[100, 100]} />
//         <shadowMaterial opacity={0.4} />
//       </mesh>
//       <OrbitControls
//         enablePan={true}
//         enableZoom={true}
//         enableRotate={true}
//         minDistance={3}
//         maxDistance={20}
//         autoRotate={false}
//       />
//       <Environment preset="city" />
//     </>
//   );
// }

// function Model3DViewer({ modelData }) {
//   const [loadError, setLoadError] = useState(null);

//   // Loading / Processing State
//   if (
//     !modelData ||
//     modelData.status === "PENDING" ||
//     modelData.status === "IN_PROGRESS" ||
//     modelData.status === "REFINING" ||
//     modelData.stage === "preview" ||
//     !modelData.textureUrls
//   ) {
//     return (
//       <div className="w-full h-[500px] bg-[#0A0A0A] rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
//         {/* Animated Background Grid */}
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"></div>

//         <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
//           <div className="w-20 h-20 relative mb-6">
//             <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping"></div>
//             <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
//             <div className="absolute inset-2 bg-purple-500/10 rounded-full backdrop-blur-md flex items-center justify-center">
//               <span className="text-xl">🤖</span>
//             </div>
//           </div>

//           <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
//             Generating Model
//           </h3>
//           <p className="text-purple-200/60 text-sm mb-6">
//             {modelData?.message ||
//               "Synthesizing 3D geometry and PBR textures..."}
//           </p>

//           <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden backdrop-blur-sm border border-white/5">
//             <div
//               className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 relative"
//               style={{ width: `${modelData?.progress || 10}%` }}
//             >
//               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 mt-4 text-xs font-mono text-gray-500">
//             <span>
//               STAGE:{" "}
//               <span className="text-purple-400 uppercase">
//                 {modelData?.stage || "INIT"}
//               </span>
//             </span>
//             <span>|</span>
//             <span>
//               STATUS:{" "}
//               <span className="text-blue-400">
//                 {modelData?.status || "WAITING"}
//               </span>
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (modelData.status === "FAILED") {
//     return (
//       <div className="w-full h-[500px] bg-[#0A0A0A] rounded-2xl border border-red-500/20 flex items-center justify-center">
//         <div className="text-center p-6">
//           <div className="text-4xl mb-3">⚠️</div>
//           <h3 className="text-red-400 font-bold mb-1">Generation Failed</h3>
//           <p className="text-gray-500 text-sm">
//             {modelData.taskError || "System encountered an error"}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Success State
//   return (
//     <div className="relative group">
//       {/* Glow effect behind canvas */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

//       <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-[#080808] border border-white/10">
//         <Canvas
//           shadows
//           gl={{ alpha: false, antialias: true, preserveDrawingBuffer: true }}
//           onError={(error) => {
//             console.error("Canvas error:", error);
//             setLoadError(error.message);
//           }}
//         >
//           <Suspense fallback={<CanvasLoader />}>
//             <Scene refineTaskId={modelData.refineTaskId} />
//           </Suspense>
//         </Canvas>

//         {/* Overlay Controls */}
//         <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none">
//           <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/80 font-mono">
//             Interactive 3D Preview
//           </div>

//           {modelData.modelUrls && (
//             <div className="flex flex-col gap-2 pointer-events-auto">
//               {Object.entries(modelData.modelUrls).map(
//                 ([format, url]) =>
//                   url && (
//                     <a
//                       key={format}
//                       href={url}
//                       download={`refined-model.${format}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40"
//                     >
//                       <Icons.Download />
//                       <span className="uppercase">{format}</span>
//                     </a>
//                   )
//               )}
//             </div>
//           )}
//         </div>

//         <div className="absolute bottom-4 right-4 pointer-events-none">
//           <div className="bg-green-500/10 backdrop-blur-md border border-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//             </span>
//             Refined PBR Textures Active
//           </div>
//         </div>

//         {loadError && (
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-900/80 backdrop-blur text-white px-4 py-2 rounded-lg text-xs border border-red-500/30">
//             Error loading texture: {loadError}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- Main Page Component ---

// export default function AnalyzePage() {
//   const [categoryId, setCategoryId] = useState("");
//   const [region, setRegion] = useState("");
//   const [cogs, setCogs] = useState("");
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

  
//   const pendingModel3D = {
//   status: "PENDING",
//   stage: "preview",
//   progress: 5,
//   message: "Starting 3D generation...",
// };
//   const categories = data?.categories || [];

//   useEffect(() => {
//     return () => {
//       if (pollingInterval) clearInterval(pollingInterval);
//     };
//   }, [pollingInterval]);

//   const checkModelStatus = async (taskId) => {
//     const maxChecks = 40;
//     let checks = 0;

//     const intervalId = setInterval(async () => {
//       checks++;
//       try {
//         const res = await api.get(`/analysis/3d-status/${taskId}`);
//         const modelData = res.data;

//      setAnalysisResult((prev) => ({
//   ...(prev || {}),
//   model3D: { ...((prev && prev.model3D) || {}), ...modelData },
// }));


//         if (
//           modelData.status === "SUCCEEDED" &&
//           modelData.stage === "refine" &&
//           modelData.textureUrls
//         ) {
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
//     }, 15000);

//     setPollingInterval(intervalId);
//   };

//   const handleAnalyze = async () => {
//     setError("");
//     setAnalysisResult(null);

//     if (!categoryId || !region) {
//       setError("Category and Region are required.");
//       return;
//     }

//     setIsAnalyzing(true);

//     try {
//       const res = await api.post("/analysis/", {
//         categoryId,
//         region,
//         cogs,
//         productName: productName || undefined,
//         artStyle,
//       });

//       const result = res.data;
//       setAnalysisResult(result);

//       if (result?.model3D?.id) {
//         checkModelStatus(result.model3D.id);
//       } else if (result?.model3D?.previewTaskId) {
//         checkModelStatus(result.model3D.previewTaskId);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Analysis failed. Please try again."
//       );
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-500/30">
//       {/* Ambient Background Glow */}
//       <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />

//       {/* Header */}
//       <header className="relative border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-3">
//           <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
//             <Icons.Chart />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-white tracking-tight">
//               Product Vision
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
//                 {" "}
//                 Sector
//               </span>
//             </h1>
//             <p className="text-xs text-gray-500 font-medium">
//               Market Intelligence & 3D Visualization Engine
//             </p>
//           </div>
//         </div>
//       </header>

//       <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* --- LEFT COLUMN: Configuration --- */}

//           <div className="lg:col-span-4 space-y-6">
//             <div className="sticky top-24">
//               {/* Outer Glow Effect (Behind the card) */}
//               <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500/20 to-transparent blur-xl opacity-50" />

//               {/* Outer Border Container */}
//               <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl">
//                 {/* Inner Card Background */}
//                 <div className="relative h-full bg-[#050509] rounded-2xl overflow-hidden">
//                   {/* Ambient Lighting Gradient */}
//                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))]" />

//                   <div className="relative p-5 sm:p-6 backdrop-blur-3xl">
//                     {/* Header */}
//                     <div className="flex items-start justify-between gap-4 mb-6">
//                       <div className="flex items-center gap-3">
//                         <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 shadow-inner">
//                           <Icons.Download className="h-4 w-4 text-purple-300" />
//                         </div>
//                         <div>
//                           <h2 className="text-[13px] font-bold text-gray-100 tracking-wide">
//                             CONFIGURATION
//                           </h2>
//                           <p className="text-[11px] text-gray-400 font-medium">
//                             Parameterize your scan
//                           </p>
//                         </div>
//                       </div>

//                       {/* Status Badge */}
//                       <span
//                         className={`
//                   inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm
//                   ${
//                     isAnalyzing
//                       ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
//                       : "bg-white/5 border-white/10 text-gray-400"
//                   }
//                 `}
//                       >
//                         <span className={`relative flex h-1.5 w-1.5`}>
//                           {isAnalyzing && (
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                           )}
//                           <span
//                             className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
//                               isAnalyzing ? "bg-emerald-400" : "bg-gray-500"
//                             }`}
//                           ></span>
//                         </span>
//                         {isAnalyzing ? "Processing" : "Idle"}
//                       </span>
//                     </div>

//                     {/* Scrollable Content */}
//                     <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//                       {/* Category Select */}
//                       <section className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                             Target Category
//                           </label>
//                           {categories?.length > 0 && (
//                             <span className="text-[10px] text-purple-400 font-mono">
//                               {categories.length} AVL
//                             </span>
//                           )}
//                         </div>

//                         <Select
//                           value={categoryId || undefined}
//                           onValueChange={setCategoryId}
//                           disabled={isLoading}
//                         >
//                           <SelectTrigger
//                             aria-busy={isLoading}
//                             className={`
//                         w-full rounded-xl border border-white/10 bg-white/5
//                         px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100
//                         shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
//                         hover:bg-white/10 hover:border-white/20
//                         focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50
//                         transition-all duration-200
//                       `}
//                           >
//                             <SelectValue
//                               placeholder={
//                                 isLoading ? "Loading..." : "Select Category"
//                               }
//                             />
//                           </SelectTrigger>
//                           <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
//                             {categories?.map((cat) => (
//                               <SelectItem
//                                 key={cat.id}
//                                 value={String(cat.id)}
//                                 className="focus:bg-purple-500/20 focus:text-white"
//                               >
//                                 {cat.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </section>

//                       {/* Region Select */}
//                       <section className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                             Region
//                           </label>
//                         </div>

//                         <Select
//                           value={region}
//                           onValueChange={setRegion}
//                           disabled={isAnalyzing}
//                         >
//                           <SelectTrigger
//                             className={`
//                         w-full rounded-xl border border-white/10 bg-white/5
//                         px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100
//                         shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
//                         hover:bg-white/10 hover:border-white/20
//                         focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50
//                         transition-all duration-200
//                       `}
//                           >
//                             <SelectValue placeholder="Select Region" />
//                           </SelectTrigger>
//                           <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
//                             {Object.entries(REGIONS).map(([code, name]) => (
//                               <SelectItem
//                                 key={code}
//                                 value={name}
//                                 className="focus:bg-purple-500/20 focus:text-white"
//                               >
//                                 {name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </section>

//                       {/* COGS Select */}
//                       <section className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                             Cost of Goods Sold $ (COGS)
//                           </label>
//                         </div>

//                         <Select
//                           value={cogs}
//                           onValueChange={setCogs}
//                           disabled={isAnalyzing}
//                         >
//                           <SelectTrigger
//                             className={`
//                         w-full rounded-xl border border-white/10 bg-white/5
//                         px-3.5 py-3 h-auto text-xs sm:text-sm text-gray-100
//                         shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
//                         hover:bg-white/10 hover:border-white/20
//                         focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50
//                         transition-all duration-200
//                       `}
//                           >
//                             <SelectValue placeholder="Select COGS $" />
//                           </SelectTrigger>
//                           <SelectContent className="bg-[#0A0A0E] border-white/10 text-gray-200">
//                             {MAX_COGS_OPTIONS.map((cogs) => (
//                               <SelectItem
//                                 key={cogs.id}
//                                 value={cogs.id} 
//                                 className="focus:bg-purple-500/20 focus:text-white"
//                               >
//                                 {cogs.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </section>

//                       {/* Product Name Input */}
//                       <section className="space-y-2">
//                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
//                           Product Name{" "}
//                           <span className="text-gray-600 font-normal normal-case">
//                             Optional
//                           </span>
//                         </label>

//                         <div className="relative group">
//                           <input
//                             type="text"
//                             value={productName}
//                             onChange={(e) => setProductName(e.target.value)}
//                             disabled={isAnalyzing}
//                             placeholder="e.g. CyberDesk V2"
//                             className={`
//                         w-full rounded-xl border border-white/10 bg-white/5
//                         px-3.5 py-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-600
//                         shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
//                         hover:bg-white/10 hover:border-white/20
//                         focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50
//                         transition-all duration-200
//                       `}
//                           />
//                           {/* Subtle glow on focus handled by ring, but adds depth */}
//                         </div>
//                       </section>

//                       {/* Render Style */}
//                       <section className="space-y-2">
//                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                           Render Style
//                         </label>
//                         <div className="grid grid-cols-2 gap-2">
//                           {["realistic"].map((style) => {
//                             const isActive = artStyle === style;
//                             return (
//                               <button
//                                 key={style}
//                                 type="button"
//                                 onClick={() => setArtStyle(style)}
//                                 disabled={isAnalyzing}
//                                 className={`
//                             relative flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium
//                             transition-all duration-200
//                             ${
//                               isActive
//                                 ? "bg-purple-500/20 border-purple-500/50 text-white shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
//                                 : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
//                             }
//                           `}
//                               >
//                                 <span className="capitalize">{style}</span>
//                                 {isActive && (
//                                   <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,1)]" />
//                                 )}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </section>

//                       {/* Error Message */}
//                       {error && (
//                         <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-200 backdrop-blur-sm">
//                           <div className="flex items-center gap-2">
//                             <AlertCircle className="h-4 w-4 text-red-400" />
//                             <span>{error}</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Bottom Action Area */}
//                     <div className="pt-6 mt-2 border-t border-white/5">
//                       <button
//                         onClick={handleAnalyze}
//                         disabled={
//                           isAnalyzing || isLoading || !categoryId || !region
//                         }
//                         className={`
//                     group relative w-full overflow-hidden rounded-xl p-[1px]
//                     transition-all duration-300
//                     ${
//                       !categoryId || !region
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.6)]"
//                     }
//                   `}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 animate-gradient-x" />
//                         <div className="relative h-full w-full rounded-xl bg-[#0A0A0E] px-4 py-3.5 transition-all group-hover:bg-transparent">
//                           <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
//                             {isAnalyzing ? (
//                               <>
//                                 <Loader className="h-4 w-4 animate-spin text-white/80" />
//                                 <span>Initializing...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <Icons.Sparkles className="h-4 w-4 text-purple-300 group-hover:text-white transition-colors" />
//                                 <span>Generate Analysis</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* --- RIGHT COLUMN: Results --- */}
//           <div className="lg:col-span-8 space-y-8 relative z-90">
//             {/* 3D Model Section */}
//        {(isAnalyzing || analysisResult?.model3D) && (
//   <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//     <div className="flex items-center justify-between mb-4 px-1">
//       <h2 className="text-xl font-bold text-white flex items-center gap-2">
//         <span className="text-purple-500">
//           <Icons.Cube />
//         </span>{" "}
//         3D Prototype
//       </h2>

//       {(analysisResult?.model3D?.status === "SUCCEEDED") && (
//         <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 font-mono">
//           COMPLETED
//         </span>
//       )}
//     </div>

//     <Model3DViewer modelData={analysisResult?.model3D || pendingModel3D} />
//   </section>
// )}


//             {/* Insights Section */}
//             {analysisResult?.insights && (
//               <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
//                 <div className="flex items-center gap-2 mb-4 px-1">
//                   <span className="text-blue-500">
//                     <Icons.Chart />
//                   </span>
//                   <h2 className="text-xl font-bold text-white">
//                     Market Intelligence
//                   </h2>
//                 </div>

//                 <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
//                   <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-h3:text-purple-300 prose-strong:text-white prose-p:text-gray-300 prose-li:text-gray-300">
//                     <MarkdownRenderer
//                       content={analysisResult.insights}
//                       title=""
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Empty State */}
//             {!analysisResult && !isAnalyzing && (
//               <div className="h-[400px] flex flex-col items-center justify-center text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
//                 <div className="w-20 h-20 bg-gradient-to-tr from-gray-800 to-black rounded-full flex items-center justify-center mb-6 shadow-xl border border-white/5">
//                   <svg
//                     className="w-8 h-8 text-gray-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-white mb-2">
//                   Ready to Analyze
//                 </h3>
//                 <p className="text-gray-500 max-w-xs text-sm">
//                   Configure your product parameters on the left to generate
//                   market insights and 3D visualizations.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

