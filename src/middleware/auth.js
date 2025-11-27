import { NextResponse } from "next/server";

export function middleware(req) {
  // ✅ Read token from cookies
  const token = req.cookies.get("accessToken")?.value;
  
  const { pathname } = req.nextUrl;
  
  // Define protected and auth routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  
  const isProtectedRoute = protectedRoutes.some((path) => pathname.startsWith(path));
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // ✅ If user is NOT logged in and trying to access protected route
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ If user IS logged in and trying to access auth routes (login/signup)
  // Redirect them to dashboard instead
  if (isAuthRoute && token) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*", 
    "/settings/:path*",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};