"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";

const LoginHeader = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const isLogin = isAuthenticated;

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, router]);

  return (
    <div className="absolute top-4  right-4 sm:top-6 sm:right-6 z-50">
      {isLogin ? (
        <button
          onClick={() => handleLogout(router)}
          className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                     bg-neutral-900/80 hover:bg-neutral-800 
                     border border-neutral-800/50 hover:border-purple-500/50 
                     backdrop-blur-md rounded-lg 
                     text-neutral-200 hover:text-white 
                     text-sm sm:text-base font-medium 
                     transition-all duration-300 
                     hover:shadow-lg hover:shadow-purple-500/10"
          aria-label="Logout"
        >
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-purple-400 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          <span className="hidden sm:inline">Log Out</span>
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                     bg-purple-600 hover:bg-purple-500 
                     rounded-lg 
                     text-white 
                     text-sm sm:text-base font-medium 
                     transition-all duration-300 
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 
                     hover:scale-[1.02]"
          aria-label="Login"
        >
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
            />
          </svg>
          <span>Log In</span>
        </button>
      )}
    </div>
  );
};

export default LoginHeader;