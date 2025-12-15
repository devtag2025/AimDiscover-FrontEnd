"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 analyses per month",
      "Basic AI insights",
      "Email support",
      "1 team member",
      "7-day data retention",
    ],
    limitations: [
      "No API access",
      "No custom models",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "100 analyses per month",
      "Advanced AI insights",
      "Priority support",
      "5 team members",
      "30-day data retention",
      "API access",
      "Custom dashboards",
      "Export to PDF/CSV",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited analyses",
      "Custom AI models",
      "24/7 dedicated support",
      "Unlimited team members",
      "Unlimited data retention",
      "Full API access",
      "White-label options",
      "SSO & advanced security",
      "Custom integrations",
      "Dedicated account manager",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const comparisonFeatures = [
  { name: "Monthly analyses", starter: "5", pro: "100", enterprise: "Unlimited" },
  { name: "Team members", starter: "1", pro: "5", enterprise: "Unlimited" },
  { name: "Data retention", starter: "7 days", pro: "30 days", enterprise: "Unlimited" },
  { name: "API access", starter: false, pro: true, enterprise: true },
  { name: "Custom models", starter: false, pro: false, enterprise: true },
  { name: "Priority support", starter: false, pro: true, enterprise: true },
  { name: "SSO", starter: false, pro: false, enterprise: true },
  { name: "White-label", starter: false, pro: false, enterprise: true },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Purple gradient backgrounds - matching Feature page */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Header - matching Feature page style */}
        <div className="border-b border-neutral-800/50">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-semibold text-neutral-50 mb-4 tracking-tight">
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Choose the perfect plan for your needs. Start free, upgrade when you're ready.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-1 p-1.5 bg-neutral-900/60 rounded-xl border border-neutral-800/50">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    !isYearly 
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25" 
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isYearly 
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25" 
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs text-green-400 font-semibold">Save 20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative p-8 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-neutral-900/40 shadow-xl shadow-purple-500/10"
                  : "border-neutral-800/50 bg-neutral-900/40 hover:border-purple-500/30 hover:bg-neutral-900/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-purple-500/25">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-neutral-50 mb-2 group-hover:text-purple-300 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-neutral-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-neutral-500 ml-2 text-sm">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-neutral-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {limitation}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.monthlyPrice === 0 ? "/signup" : "/signup?plan=" + plan.name.toLowerCase()}
                className={`block w-full py-3 px-6 rounded-lg text-center font-medium transition-all ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-500 text-neutral-50 shadow-lg shadow-purple-500/25"
                    : "bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/50 hover:border-neutral-700 text-neutral-200"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-6 border-b border-neutral-800/50">
            <h2 className="text-xl font-semibold text-neutral-50">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800/50">
                  <th className="text-left p-4 text-neutral-500 font-medium text-sm">Feature</th>
                  <th className="text-center p-4 text-neutral-500 font-medium text-sm">Starter</th>
                  <th className="text-center p-4 text-purple-400 font-medium text-sm">Professional</th>
                  <th className="text-center p-4 text-neutral-500 font-medium text-sm">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-neutral-800/30 hover:bg-purple-500/5 transition-colors">
                    <td className="p-4 text-neutral-300 text-sm">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-neutral-500 text-sm">{feature.starter}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-purple-500/5">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-purple-400 font-medium text-sm">{feature.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-neutral-500 text-sm">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section - matching Feature page */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-blue-600/10 border border-purple-500/20 text-center"
        >
          <h2 className="text-3xl font-semibold text-neutral-50 mb-4">
            Have questions about pricing?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/faq"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-neutral-50 font-medium rounded-lg transition-all"
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/50 hover:border-neutral-700 text-neutral-200 font-medium rounded-lg transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}