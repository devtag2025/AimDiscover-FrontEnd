"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is AimDiscovery?",
        a: "AimDiscovery is an AI-powered platform that helps you analyze and discover insights from your data. Our advanced algorithms provide deep analysis and actionable recommendations to help you make better decisions."
      },
      {
        q: "How do I create an account?",
        a: "Simply click the 'Sign Up' button on our homepage, enter your email address, create a password, and verify your email. You'll be ready to start analyzing in minutes."
      },
      {
        q: "Is there a free trial available?",
        a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
      }
    ]
  },
  {
    category: "Features & Analysis",
    questions: [
      {
        q: "What types of analysis can I perform?",
        a: "AimDiscovery supports multiple analysis types including sentiment analysis, trend detection, pattern recognition, predictive analytics, and custom AI-powered insights tailored to your specific needs."
      },
      {
        q: "How accurate are the AI predictions?",
        a: "Our AI models achieve 95%+ accuracy on most analysis tasks. We continuously train and improve our models using the latest machine learning techniques."
      },
      {
        q: "Can I export my analysis results?",
        a: "Absolutely! You can export results in multiple formats including PDF, CSV, JSON, and integrate directly with popular tools via our API."
      }
    ]
  },
  {
    category: "Pricing & Billing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts."
      },
      {
        q: "Can I change my plan anytime?",
        a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly."
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team for a full refund."
      }
    ]
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        q: "How is my data protected?",
        a: "We use industry-standard AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on secure, SOC 2 compliant servers."
      },
      {
        q: "Do you share my data with third parties?",
        a: "Never. Your data is yours. We don't sell, share, or use your data for any purpose other than providing our services to you."
      },
      {
        q: "Can I delete my data?",
        a: "Yes, you have full control over your data. You can delete individual analyses or your entire account at any time from your dashboard settings."
      }
    ]
  }
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      layout
      className="border-b border-neutral-800/50 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-5 px-6 flex items-start justify-between gap-4 text-left hover:bg-neutral-900/50 transition-colors group"
      >
        <span className="text-[15px] font-medium text-neutral-100 leading-relaxed group-hover:text-neutral-50 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0 mt-0.5"
        >
          <svg className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1">
              <p className="text-[15px] text-neutral-400 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Refined background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative pt-12">
        {/* Header */}
        <div className="border-b  border-neutral-800/50">
          <div className="max-w-4xl  mx-auto px-6 py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-semibold text-neutral-50 mb-4 tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
                Find answers to common questions about AimDiscovery. Can't find what you're looking for? Our support team is here to help.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8"
            >
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border border-neutral-800/50 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:bg-neutral-900 transition-all"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4 px-6">
                  {category.category}
                </h2>
                <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
                  {category.questions.map((item, questionIndex) => (
                    <FAQItem
                      key={questionIndex}
                      question={item.q}
                      answer={item.a}
                      isOpen={openItems[`${categoryIndex}-${questionIndex}`]}
                      onClick={() => toggleItem(categoryIndex, questionIndex)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-neutral-400 mb-2">No results found</p>
              <p className="text-sm text-neutral-500">Try adjusting your search query</p>
            </div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 bg-gradient-to-br from-purple-500/[0.07] to-purple-600/[0.05] border border-purple-500/10 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-neutral-50 mb-2">
              Still have questions?
            </h3>
            <p className="text-neutral-400 mb-6">
              Our support team is here to help you get the most out of AimDiscovery.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-neutral-50 font-medium rounded-lg transition-all"
            >
              Contact Support
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}