import { Html } from "@react-three/drei";
export function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm font-medium">Loading 3D Model...</p>
      </div>
    </Html>
  );
}