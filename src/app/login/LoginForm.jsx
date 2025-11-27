"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useLogin();
  const { mutate: googleAuth } = useGoogleAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null); // ✅ Add error state
  const router = useRouter();
  const searchParams = useSearchParams();

  
   const onSubmit = (data) => {
    setLoginError(null);
    
    mutate(data, {
      onSuccess: () => {
        const redirectUrl = searchParams.get("redirect") || "/dashboard";
        
        // ✅ Use window.location for a full page reload
        // This ensures cookies are properly read by middleware
        window.location.href = redirectUrl;
      },
      onError: (error) => {
        setLoginError(error?.response?.data?.message || "Login failed");
      },
    });
  };
  const handleGoogleAuth = () => {
    const redirectUrl = searchParams.get("redirect") || "/dashboard";
    googleAuth({ redirectUrl });
  };

  return (
    <div className="relative z-10 bg-neutral-900/95 backdrop-blur-sm border-2 border-purple-500/20 grid md:grid-cols-2 items-center gap-8 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-8 rounded-2xl shadow-2xl shadow-purple-500/20">
      
      {/* Form Section */}
      <div className="md:max-w-md w-full px-2 py-4">
        <div className="text-center mb-2">
          <h1 className="text-white text-3xl font-bold">
            Welcome Back
          </h1>
          <p className="text-neutral-400 text-sm mt-3">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          {/* ✅ Show login error if any */}
          {loginError && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {loginError}
              </p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-neutral-300 text-sm font-medium block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full text-white text-sm bg-neutral-950 border border-neutral-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg px-4 py-3.5 pl-12 outline-none transition-all duration-200"
              />
              <div className="absolute left-4 top-3.5">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-neutral-300 text-sm font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
                className="w-full text-white text-sm bg-neutral-950 border border-neutral-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg px-4 py-3.5 pl-12 pr-12 outline-none transition-all duration-200"
              />
              <div className="absolute left-4 top-3.5">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-purple-600 focus:ring-purple-500 border-neutral-600 bg-neutral-950 rounded-sm cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-neutral-300 font-medium cursor-pointer">
                Remember me
              </label>
            </div>
            <div>
              <Link href="/forgot-password" className="text-purple-500 font-medium text-sm hover:text-purple-400 transition-colors duration-200">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3.5 px-4 rounded-lg shadow-lg shadow-purple-500/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-neutral-400 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-500 font-medium hover:text-purple-400 transition-colors duration-200">
                Register here
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-neutral-900 px-2 text-neutral-500">or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 border-2 border-purple-500/30 bg-neutral-950 hover:bg-neutral-800 hover:border-purple-500/50 text-white font-medium py-3.5 px-4 rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.94 0 6.56 1.7 8.07 3.12l5.94-5.94C34.27 3.41 29.65 1 24 1 14.95 1 7.16 6.64 3.83 14.45l6.98 5.42C12.15 14.09 17.57 9.5 24 9.5z" />
              <path fill="#34A853" d="M46.5 24c0-1.55-.14-3.04-.39-4.5H24v9h12.8c-.57 2.95-2.28 5.46-4.8 7.14l7.47 5.8C43.5 37.45 46.5 31.15 46.5 24z" />
              <path fill="#FBBC05" d="M10.81 28.03a14.4 14.4 0 010-8.06L3.83 14.45A23.96 23.96 0 000 24c0 3.84.9 7.47 2.5 10.55l7.47-5.8a14.4 14.4 0 01.84-0.72z" />
              <path fill="#4285F4" d="M24 48c6.49 0 11.93-2.14 15.9-5.82l-7.47-5.8c-2.08 1.39-4.76 2.2-8.43 2.2-6.43 0-11.85-4.59-13.19-10.88l-7.47 5.8C7.16 41.36 14.95 48 24 48z" />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[600px] max-md:h-[400px] bg-neutral-950 rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-lg shadow-purple-500/10">
        <Image src="/LoginPage.jpg" alt="login-image" fill className="object-cover opacity-80" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h3 className="text-2xl font-bold mb-3">Welcome Back!</h3>
          <p className="text-neutral-300 text-sm">Continue your journey with us and access your personalized dashboard</p>
        </div>
      </div>
    </div>
  );
}

export function LoginFormSkeleton() {
  return (
    <div className="relative z-10 bg-neutral-900/95 backdrop-blur-sm border-2 border-purple-500/20 max-w-6xl w-full p-8 rounded-2xl shadow-2xl shadow-purple-500/20">
      <div className="flex items-center justify-center h-[600px]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}