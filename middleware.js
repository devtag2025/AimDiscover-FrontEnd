import { authMiddleware } from "@/middleware/auth";

export function middleware(req) {
  return authMiddleware(req);
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*", 
    "/settings/:path*",
    "/login",           // ✅ Add this
    "/signup",          // ✅ Add this
    "/forgot-password", // ✅ Add this
  ],
};