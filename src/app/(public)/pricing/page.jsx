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
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-neutral-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mt-12 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Pricing
            </span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Start free, upgrade when you're ready.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-neutral-900 rounded-xl border border-neutral-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isYearly 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isYearly 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-green-400">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-purple-500 bg-gradient-to-b from-purple-900/30 to-neutral-900/50 shadow-xl shadow-purple-500/10"
                  : "border-purple-500/20 bg-neutral-900/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-neutral-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-neutral-400 ml-2">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-500">
                    <svg className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {limitation}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.monthlyPrice === 0 ? "/signup" : "/signup?plan=" + plan.name.toLowerCase()}
                className={`block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-neutral-800 hover:bg-neutral-700 text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/50 overflow-hidden">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left p-4 text-neutral-400 font-medium">Feature</th>
                  <th className="text-center p-4 text-neutral-400 font-medium">Starter</th>
                  <th className="text-center p-4 text-purple-400 font-medium">Professional</th>
                  <th className="text-center p-4 text-neutral-400 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-neutral-800/50 hover:bg-purple-500/5">
                    <td className="p-4 text-white">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-neutral-400">{feature.starter}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-purple-500/5">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-purple-400 font-medium">{feature.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-neutral-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-neutral-400">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-400 mb-4">Have questions about our pricing?</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/faq"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              View FAQ
            </Link>
            <span className="text-neutral-600">•</span>
            <Link
              href="/contact"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}