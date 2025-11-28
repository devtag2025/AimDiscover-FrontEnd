// app/dashboard/layout.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image"; 
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Box,
  BookmarkCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Globe,
  User,
  Bell,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Discover Products",
      href: "/dashboard/analyze",
      icon: Search,
    },
    // {
    //   name: "Market Analysis",
    //   href: "/dashboard/analysis",
    //   icon: TrendingUp,
    // },
    // {
    //   name: "3D Mockups",
    //   href: "/dashboard/mockups",
    //   icon: Box,
    // },
    // {
    //   name: "Saved Ideas",
    //   href: "/dashboard/saved",
    //   icon: BookmarkCheck,
    // },
    // {
    //   name: "Analytics",
    //   href: "/dashboard/analytics",
    //   icon: BarChart3,
    // },
  ];

  const bottomNavigation = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Logout",
      icon: LogOut,
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-black via-purple-950/10 to-black border-r border-white/10 backdrop-blur-xl">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <Image src="/Logo.png" alt="login-image" width={200} height={200} cover className="object-cover opacity-80" priority />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active
                      ? "bg-purple-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "hover:bg-white/5 border border-transparent hover:border-purple-500/30"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active
                        ? "text-purple-400"
                        : "text-gray-400 group-hover:text-purple-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
     <div className="p-4 border-t border-white/10 space-y-2">
      {bottomNavigation.map((item) => {
        const Icon = item.icon;
        const isLogout = item.name === "Logout";

        return isLogout ? (
          <button
            key={item.name}
            onClick={() => handleLogout(router)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-purple-500/30 transition-all duration-300 group text-left"
          >
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="font-medium text-gray-400 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </button>
        ) : (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-purple-500/30 transition-all duration-300 group"
          >
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="font-medium text-gray-400 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">John Doe</div>
                <div className="text-xs text-gray-400">Free Plan</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 border border-white/10 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, markets, or categories..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-white/5 border border-white/10 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              </button>

              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-purple-500/30">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Upgrade</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
