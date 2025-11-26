"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AxiosInstance from "@/axios/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = decodeURIComponent(searchParams.get("token"));

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. Please try again.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await AxiosInstance.get(`/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(res?.data?.message || "Email verified successfully!");

        setCountdown(3);
        const redirectTimer = setTimeout(() => {
          router.push("/login");
        }, 3000);

        const countdownTimer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
          clearTimeout(redirectTimer);
          clearInterval(countdownTimer);
        };
      } catch (error) {
        console.error("Email verification failed:", error);
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification failed. Please try again."
        );
      }
    };

    verifyEmail();
  }, [token, router]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100"
        >
          {/* Verifying State */}
          {status === "verifying" && (
            <div className="text-center space-y-6">
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="w-20 h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto"
              >
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600 text-sm">
                  Please wait while we confirm your email address...
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center space-y-6">
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Email Verified!
                </h2>
                <p className="text-gray-700 font-medium">{message}</p>
                <p className="text-gray-500 text-sm">
                  Redirecting to login in{" "}
                  <span className="font-bold text-purple-600">{countdown}</span>{" "}
                  seconds...
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors duration-200"
                >
                  Go to Login immediately
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center space-y-6">
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Verification Failed
                </h2>
                <p className="text-gray-700 font-medium">{message}</p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Go Back to Signup
                </button>

                <Link
                  href="/"
                  className="text-gray-600 font-medium hover:text-gray-800 hover:underline transition-colors duration-200 text-sm"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
