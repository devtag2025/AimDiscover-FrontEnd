// app/dashboard/layout.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BorderBeam } from "@/components/common/BorderBeam";
import {
  LayoutDashboard,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { DollarSign } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
const user = useAuthStore((state) => state.user);
console.log(user);
  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Discover",
      href: "/dashboard/analyze",
      icon: Search,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await handleLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-black via-purple-950/10 to-black border-r border-white/10 backdrop-blur-xl">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <Image
                src="/Logo.png"
                alt="Dashboard Logo"
                width={200}
                height={200}
                className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  aria-current={active ? "page" : undefined}
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

            {/* Desktop Logout Button */}
            <button
              disabled={isLoading}
              onClick={onLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                hover:bg-white/5 border border-transparent hover:border-purple-500/30 
                transition-all duration-300 group text-left
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              aria-busy={isLoading}
              aria-label={isLoading ? "Logging out…" : "Logout"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium text-gray-400">
                    Logging out…
                  </span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="font-medium text-gray-400 group-hover:text-white transition-colors">
                    Logout
                  </span>
                </>
              )}
            </button>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center font-semibold text-sm text-white">
  {user?.picture ? (
    <Image
    width={200}
    height={200}
      src={user?.picture}
      alt={user?.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span>
      {user?.name
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()}
    </span>
  )}
</div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-400 truncate">Free Plan</div>
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
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 pb-20 lg:pb-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between p-4 lg:px-6">
            {/* Left Side - Logo (Mobile) / Menu (Mobile) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/5 border border-white/10 transition-colors touch-manipulation"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Logo on Mobile */}
              <Link href="/dashboard" className="lg:hidden">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications - Hidden on small mobile */}
              {/* <button
                className="hidden sm:flex relative p-2 rounded-xl hover:bg-white/5 border border-white/10 transition-colors touch-manipulation"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              </button> */}

              {/* Upgrade Button */}
              <Link href="/dashboard/pricing" className="hidden sm:block">
                <button className="relative overflow-hidden flex items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-2xl bg-gradient-to-br from-white/5 via-black/80 to-black/90 border border-purple-500/10 shadow-[0_0_25px_-10px_rgba(168,85,247,0.7)] text-gray-100 hover:border-purple-400/70 hover:text-white hover:shadow-[0_0_35px_-10px_rgba(168,85,247,0.9)] transition-all duration-300 ease-in-out touch-manipulation">
                  <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                  <span className="text-sm lg:text-base font-semibold">
                    Upgrade
                  </span>
                  <BorderBeam
                    size={70}
                    initialOffset={5}
                    color="#8B5CF6"
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                    }}
                    className="from-transparent via-purple-500/80 to-transparent"
                  />
                </button>
              </Link>

              {/* Mobile Upgrade Icon */}
              <Link href="/dashboard/pricing" className="sm:hidden">
                <button
                  className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/50 touch-manipulation"
                  aria-label="Upgrade plan"
                >
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all duration-300 touch-manipulation min-h-[64px] ${
                  active
                    ? "bg-purple-500/20 border border-purple-500/50"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    active ? "text-purple-400" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    active ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>
                {active && (
                  <div className="absolute bottom-0 w-8 h-1 bg-purple-400 rounded-t-full" />
                )}
              </Link>
            );
          })}

          {/* Mobile Logout Button */}
          <button
            disabled={isLoading}
            onClick={onLogout}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all duration-300 touch-manipulation min-h-[64px] hover:bg-white/5 border border-transparent ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-label={isLoading ? "Logging out" : "Logout"}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                <span className="text-xs font-medium text-gray-400">
                  Wait...
                </span>
              </>
            ) : (
              <>
                <LogOut className="w-6 h-6 text-gray-400" />
                <span className="text-xs font-medium text-gray-400">
                  Logout
                </span>
              </>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}