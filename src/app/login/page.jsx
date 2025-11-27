import LightRays from "@/components/ui/LightRays";
import { LoginFormSkeleton } from "./LoginForm";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 relative overflow-hidden">
      {/* Light Rays Background - Layer 0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-left"
          raysSpeed={1.5}
          lightSpread={2.5}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />
      
      {/* ✅ Suspense boundary required for useSearchParams */}
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}