"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Suspense } from "react";

// 1. Create the content component
function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
      {/* Icon Area */}
      <div className="flex justify-center">
        <div className="bg-green-500/10 p-4 rounded-full ring-1 ring-green-500/50">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Thank you for your purchase. Your subscription has been activated and is ready to use.
        </p>
      </div>

      {/* Transaction Details (Optional) */}
      {sessionId && (
        <div className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
            Transaction ID
          </p>
          <p className="text-sm font-mono text-neutral-300 break-all">
            {sessionId}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2">
        <Link
          href="/dashboard"
          className="group flex items-center justify-center gap-2 w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-neutral-200 transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// 2. Export the page wrapped in Suspense
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