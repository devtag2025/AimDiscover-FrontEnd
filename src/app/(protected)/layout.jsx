"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
    }
  }, []);
console.log("Protected Layout ");
  const token = typeof window !== "undefined" && localStorage.getItem("accessToken");
  
  if (!token) return null;

  return <>{children}</>;
}
