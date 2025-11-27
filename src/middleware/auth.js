import { NextResponse } from "next/server";

export function authMiddleware(req) {
  const token = req.cookies.get("accessToken")?.value;
  console.log("this is the token", token, !!token);
  const { pathname } = req.nextUrl;
  
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  
  const isProtectedRoute = protectedRoutes.some((path) => pathname.startsWith(path));
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // ✅ If user is authenticated and on auth page, redirect to dashboard
  if (isAuthRoute && token) {
    // Don't read the redirect param - just go to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ If user is not authenticated and on protected route, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}