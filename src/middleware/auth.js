import { NextResponse } from "next/server";

export function authMiddleware(req) {
  const token = req.cookies.get("accessToken")?.value; // read from cookies

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
