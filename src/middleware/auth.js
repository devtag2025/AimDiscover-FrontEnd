import { NextResponse } from "next/server";

export function authMiddleware(req) {
  const token = localStorage.getItem("accessToken");

  const { pathname } = req.nextUrl;

  const PROTECTED = ["/dashboard", "/profile", "/settings"];
  const AUTH = ["/login", "/signup", "/forgot-password"];

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH.some((p) => pathname.startsWith(p));

  // ✅ Not logged in? Go to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Already logged in? Go to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}