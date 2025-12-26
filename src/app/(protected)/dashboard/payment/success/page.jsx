"use client";
export const dynamic = "force-dynamic";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { SuccessContent } from "./successContent";


export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-white">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-neutral-400">
            <Loader2 className="animate-spin w-5 h-5" />
            <span>Verifying payment...</span>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}