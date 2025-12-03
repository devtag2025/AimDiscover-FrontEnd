"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    contact: "support@aimdiscovery.com",
    href: "mailto:support@aimdiscovery.com"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Live Chat",
    description: "Available Mon-Fri, 9am-6pm EST",
    contact: "Start a conversation",
    href: "#chat"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Office",
    description: "Visit us at our headquarters",
    contact: "San Francisco, CA",
    href: "#"
  }
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("Message sent successfully!");
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-20 left-20 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative  z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 pt-14 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl  md:text-6xl font-semibold text-neutral-50 mb-6 tracking-tight">
              Get in touch
            </h1>
            <p className="text-lg flex mx-auto items-center justify-center text-neutral-400 max-w-xl">
              Have a question or need help? We're here to assist you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm hover:border-purple-500/30 hover:bg-neutral-900/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:border-purple-500/40 transition-all">
                {method.icon}
              </div>
              <h3 className="text-neutral-50 font-semibold text-lg mb-1">{method.title}</h3>
              <p className="text-neutral-500 text-sm mb-3">{method.description}</p>
              <p className="text-purple-400 font-medium">{method.contact}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-neutral-50 mb-6">Send us a message</h2>
            
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-neutral-300 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 outline-none transition-all"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-neutral-300 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 outline-none transition-all"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 text-neutral-100 focus:border-purple-500/50 focus:bg-neutral-900 outline-none transition-all"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="enterprise">Enterprise Sales</option>
                  <option value="partnership">Partnership</option>
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-500 text-neutral-50 font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40">
              <h3 className="text-neutral-50 font-semibold text-lg mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">General inquiries</span>
                  <span className="text-purple-400 font-medium">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Technical support</span>
                  <span className="text-purple-400 font-medium">4-8 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Enterprise</span>
                  <span className="text-purple-400 font-medium">1-2 hours</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40">
              <h3 className="text-neutral-50 font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="w-10 h-10 rounded-lg bg-neutral-900/60 hover:bg-purple-500/10 border border-neutral-800/50 hover:border-purple-500/30 flex items-center justify-center text-neutral-500 hover:text-purple-400 transition-all"
                    title={social}
                  >
                    <span className="text-xs font-semibold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-blue-600/10 border border-purple-500/20">
              <h3 className="text-neutral-50 font-semibold text-lg mb-2">Need immediate help?</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Browse FAQ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}