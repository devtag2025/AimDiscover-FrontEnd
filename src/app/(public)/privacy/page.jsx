"use client";

import Link from "next/link";

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
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-neutral-950 to-neutral-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mt-12 max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Policy
            </span>
          </h1>
          <p className="text-neutral-400">
            Last updated: December 2, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-neutral-300 text-lg leading-relaxed">
            At AimDiscovery, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            policy carefully to understand our practices regarding your data.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 rounded-2xl border border-purple-500/20 bg-neutral-900/50">
          <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={index}>
                <a 
                  href={`#section-${index}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="scroll-mt-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-6 pl-11">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-purple-800/10">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-neutral-400 mb-6">
            If you have any questions or concerns about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:privacy@aimdiscovery.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 font-semibold rounded-xl transition-colors"
            >
              privacy@aimdiscovery.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}