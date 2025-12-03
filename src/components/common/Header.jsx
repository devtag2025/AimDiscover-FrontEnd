"use client"
import React from 'react'
import { FloatingDock } from '../ui/floating-dock'
import { links } from '@/utils/StaticData'
import { useAuthStore } from '@/stores/authStore'
import handleLogout from '@/utils/logout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const Header = () => {
    const router = useRouter();
      useEffect(() => {
      if (isLogin) {
        router.push("/dashboard");
      }
    }, [router]);
    const { isAuthenticated } = useAuthStore();
     const isLogin = isAuthenticated;
  return (
    <div>  <div className="absolute flex-row top-6 right-6 z-12 my-1 flex items-center gap-10 w-full">
        <FloatingDock desktopClassName="dark" items={links} />

        {isLogin ? (
          <button
            onClick={() => handleLogout(router)}
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 text-white text-base tracking-wider rounded-full flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            aria-label="Logout"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 text-white text-base tracking-wider rounded-full flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            aria-label="Login"
          >
            Log In
          </button>
        )}
      </div></div>
  )
}

export default Header