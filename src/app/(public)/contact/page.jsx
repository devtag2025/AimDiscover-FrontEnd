"use client";

import { contactMethods, socials } from "@/utils/StaticData";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSendMail } from "@/hooks/useSupport";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { mutate: sendMail, isPending } = useSendMail();

  const onSubmit = (data) => {
    console.log(data)
    sendMail(data, {
      onSuccess: () => {
        reset();
      },
      onError: (err) => {
        console.error("Mail sending failed:", err);
      },
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black pointer-events-none" />
      <div className="fixed top-20 left-20 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 pt-14 flex justify-center items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-semibold text-neutral-50 mb-6 tracking-tight">
              Get in touch
            </h1>
            <p className="text-lg flex mx-auto items-center justify-center text-neutral-400 max-w-xl">
              Have a question or need help? We're here to assist you.
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
              className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm
                         hover:border-purple-500/30 hover:bg-neutral-900/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 
                              flex items-center justify-center text-purple-400 mb-4 group-hover:border-purple-500/40 transition-all">
                {method.icon}
              </div>
              <h3 className="text-neutral-50 font-semibold text-lg mb-1">
                {method.title}
              </h3>
              <p className="text-neutral-500 text-sm mb-3">
                {method.description}
              </p>
              <p className="text-purple-400 font-medium">{method.contact}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm space-y-5"
          >
            <h2 className="text-2xl font-semibold text-neutral-50 mb-6">Send us a message</h2>

            {/* Name Row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  {...register("firstname", { required: "First name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 
                    text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 transition-all"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  {...register("lastname", { required: "Last name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 
                    text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 transition-all"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 
                  text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 transition-all"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-2">Subject</label>
              <select
                {...register("subject", { required: "Please select a subject" })}
                className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 
                  text-neutral-100 focus:border-purple-500/50 focus:bg-neutral-900 transition-all"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="enterprise">Enterprise Sales</option>
                <option value="partnership">Partnership</option>
              </select>
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                })}
                className="w-full px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-800/50 
                  text-neutral-100 placeholder-neutral-500 focus:border-purple-500/50 focus:bg-neutral-900 transition-all resize-none"
                placeholder="How can we help you?"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-500 
                text-neutral-50 font-medium rounded-lg shadow-lg shadow-purple-500/25
                transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isPending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* RIGHT SIDE INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Response Time Card */}
            <div className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40">
              <h3 className="text-neutral-50 font-semibold text-lg mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">General inquiries</span>
                  <span className="text-purple-400 font-medium">24–48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Technical support</span>
                  <span className="text-purple-400 font-medium">4–8 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Enterprise</span>
                  <span className="text-purple-400 font-medium">1–2 hours</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="p-6 rounded-xl border border-neutral-800/50 bg-neutral-900/40">
              <h3 className="text-neutral-50 font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/50 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all"
                  >
                    <Icon className="w-5 h-5 text-neutral-400 hover:text-purple-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-blue-600/10 border border-purple-500/20">
              <h3 className="text-neutral-50 font-semibold text-lg mb-2">Need immediate help?</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
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
