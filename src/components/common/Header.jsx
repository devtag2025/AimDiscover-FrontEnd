"use client";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { links } from "@/utils/StaticData";
import { useAuthStore } from "@/stores/authStore";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    <div>
      <div className="z-50 fixed bottom-3 my-1 flex items-center gap-10 w-full">
        <FloatingDock desktopClassName="dark" mobileClassName="dark" items={links} />
      </div>
    </div>
  );
};

export default Header;
