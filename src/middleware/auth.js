import { NextResponse } from "next/server";

export function authMiddleware(req) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const PROTECTED = ["/dashboard", "/profile", "/settings"];
  const AUTH = ["/login", "/signup", "/forgot-password"];

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH.some((p) => pathname.startsWith(p));

  // If user is logged in & tries to open login/signup
  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If visiting protected route without token
  if (isProtected && !refreshToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

