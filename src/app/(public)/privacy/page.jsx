"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create an account, we collect your name, email address, and password. If you sign up using Google, we receive your basic profile information from Google."
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you use our services, including the pages you visit, features you use, and the time and date of your visits."
      },
      {
        subtitle: "Analysis Data",
        text: "When you use our analysis features, we process the data you submit. This data is used solely to provide you with insights and is stored securely."
      }
    ]
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Providing Services",
        text: "We use your information to operate, maintain, and improve our services, including providing AI-powered analysis and personalized recommendations."
      },
      {
        subtitle: "Communication",
        text: "We may use your email to send you service updates, security alerts, and support messages. You can opt out of marketing communications at any time."
      },
      {
        subtitle: "Security",
        text: "We use your information to detect, prevent, and respond to fraud, abuse, security risks, and technical issues."
      }
    ]
  },
  {
    title: "Data Sharing",
    content: [
      {
        subtitle: "Third-Party Services",
        text: "We may share data with third-party service providers who help us operate our platform (e.g., hosting, analytics). These providers are bound by confidentiality agreements."
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect rights, property, or safety."
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change."
      }
    ]
  },
  {
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. We use industry-standard security measures to protect your information."
      },
      {
        subtitle: "Access Controls",
        text: "We implement strict access controls and authentication measures. Only authorized personnel have access to user data, and all access is logged and monitored."
      },
      {
        subtitle: "Infrastructure",
        text: "Our servers are hosted in SOC 2 compliant data centers with physical security measures, redundant systems, and regular security audits."
      }
    ]
  },
  {
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You have the right to access your personal data and request a copy in a portable format. You can export your data from your dashboard settings."
      },
      {
        subtitle: "Correction & Deletion",
        text: "You can update your account information at any time. You may also request deletion of your account and associated data."
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of marketing communications and certain data processing activities. Note that some data processing is necessary for service operation."
      }
    ]
  },
  {
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use essential cookies to enable core functionality like authentication and security. These cannot be disabled."
      },
      {
        subtitle: "Analytics Cookies",
        text: "We use analytics cookies to understand how users interact with our services. You can opt out of analytics through your browser settings."
      },
      {
        subtitle: "Preferences",
        text: "We use preference cookies to remember your settings and provide a personalized experience."
      }
    ]
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Purple gradient backgrounds - matching Feature page */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        
        {/* Header - matching Feature page style */}
        <div className="border-b border-neutral-800/50">
          <div className="py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl flex justify-center items-center md:text-5xl font-semibold text-neutral-50 mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-lg flex justify-center items-center text-neutral-400 leading-relaxed">
                Last updated: December 2, 2025
              </p>
            </motion.div>
          </div>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="py-12 border-b border-neutral-800/50"
        >
          <p className="text-neutral-300 text-lg leading-relaxed">
            At AimDiscovery, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            policy carefully to understand our practices regarding your data.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-12 p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm"
        >
          <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
            Table of Contents
          </h2>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={index}>
                <a 
                  href={`#section-${index}`}
                  className="text-neutral-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-neutral-600">{index + 1}.</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="scroll-mt-24 p-8 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm hover:border-purple-500/30 transition-all"
            >
              <h2 className="text-xl font-semibold text-neutral-50 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-sm font-medium">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-6 pl-11">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact CTA - matching Feature page style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-blue-600/10 border border-purple-500/20 text-center"
        >
          <h2 className="text-3xl font-semibold text-neutral-50 mb-4">
            Questions about privacy?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            If you have any questions or concerns about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-neutral-50 font-medium rounded-lg transition-all"
            >
              Contact Us
            </Link>
            <a
              href="mailto:privacy@aimdiscovery.com"
              className="px-8 py-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/50 hover:border-neutral-700 text-neutral-200 font-medium rounded-lg transition-all"
            >
              privacy@aimdiscovery.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}