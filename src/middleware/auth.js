import { NextResponse } from "next/server";

export function authMiddleware(req) {
  // ✅ Read token from cookies (works on Edge Runtime)
  const token = req.cookies.get("accessToken")?.value;

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    // Optionally add redirect param to return after login
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}