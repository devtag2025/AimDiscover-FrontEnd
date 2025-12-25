"use client";

import Link from "next/link";
import { XCircle, HelpCircle } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-white">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        
        {/* Icon Area */}
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-4 rounded-full ring-1 ring-red-500/50">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Payment Cancelled
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            The payment process was cancelled. No charges were made to your card.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/pricing"
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg transition-colors border border-neutral-700"
          >
            Try Again
          </Link>
          
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Having trouble? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}