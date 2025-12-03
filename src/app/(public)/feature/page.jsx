"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI-Powered Analysis",
    description: "Leverage cutting-edge artificial intelligence to analyze your data with unprecedented accuracy and depth.",
    details: [
      "Natural language processing",
      "Pattern recognition",
      "Predictive modeling",
      "Anomaly detection"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Real-Time Processing",
    description: "Get instant insights with our lightning-fast processing engine that delivers results in seconds.",
    details: [
      "Sub-second response times",
      "Live data streaming",
      "Instant notifications",
      "Auto-refresh dashboards"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Interactive Dashboards",
    description: "Visualize your data with beautiful, customizable dashboards that make complex data easy to understand.",
    details: [
      "Drag-and-drop widgets",
      "Custom chart types",
      "Filter & drill-down",
      "Shareable views"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Enterprise Security",
    description: "Your data is protected with bank-level security, encryption, and compliance with industry standards.",
    details: [
      "AES-256 encryption",
      "SOC 2 compliant",
      "SSO integration",
      "Role-based access"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Powerful API",
    description: "Integrate AimDiscovery into your existing workflow with our comprehensive REST API.",
    details: [
      "RESTful endpoints",
      "Webhook support",
      "SDK libraries",
      "Detailed documentation"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Team Collaboration",
    description: "Work together seamlessly with shared workspaces, comments, and real-time collaboration features.",
    details: [
      "Shared workspaces",
      "Comments & annotations",
      "Version history",
      "Team permissions"
    ]
  }
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50ms", label: "Avg Response" },
  { value: "10M+", label: "Analyses Run" },
  { value: "5000+", label: "Happy Users" },
];

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Purple gradient backgrounds */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold text-neutral-50 mb-6 tracking-tight leading-tight">
              Powerful features for modern analytics
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Everything you need to analyze, understand, and act on your data. Built for teams who demand the best.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm hover:border-purple-500/30 hover:bg-neutral-900/60 transition-all group"
            >
              <div className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
              className="group p-8 rounded-xl border border-neutral-800/50 bg-neutral-900/40 hover:border-purple-500/30 hover:bg-neutral-900/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:border-purple-500/40 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-50 mb-3 group-hover:text-purple-300 transition-colors">{feature.title}</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-2.5">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-blue-600/10 border border-purple-500/20 text-center"
        >
          <h2 className="text-3xl font-semibold text-neutral-50 mb-4">
            Ready to get started?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using AimDiscovery to transform their data into actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-neutral-50 font-medium rounded-lg transition-all"
            >
              Start Free Trial
            </a>
            <a
              href="/pricing"
              className="px-8 py-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/50 hover:border-neutral-700 text-neutral-200 font-medium rounded-lg transition-all"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}