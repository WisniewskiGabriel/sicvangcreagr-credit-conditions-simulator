import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login"];
  
  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile"];
  
  // Routes that authenticated users shouldn't access (redirect to dashboard)
  const authRoutes = ["/login"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is an auth route (login, register)
  const isAuthRoute = authRoutes.includes(pathname);
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // If user is authenticated
  if (token) {
    // Validate token by making a request to the backend
    // Note: In a real application, you might want to verify the token here
    // For now, we'll assume the token is valid if it exists
    
    // If trying to access auth routes while authenticated, redirect to dashboard
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    // Allow access to protected and public routes
    return NextResponse.next();
  }

  // If user is not authenticated
  if (!token) {
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next();
    }
    
    // Redirect to login for protected routes with callback URL
    if (isProtectedRoute) {
      const callbackUrl = encodeURIComponent(pathname + request.nextUrl.search);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }
  }

  // Default: allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};