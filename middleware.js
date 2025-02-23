import { NextResponse } from "next/server";

import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Define routes that logged-in users shouldn't access
  const restrictedForLoggedIn = ["/sign-in", "/sign-up"];

  // Define routes that require authentication (empty for now, but can be expanded)
  const protectedRoutes = [];

  // If user is logged in and trying to access sign-in or sign-up, redirect to home
  if (session && restrictedForLoggedIn.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
  }

  // If user is NOT logged in and trying to access protected pages, redirect to sign-in
  if (
    !session &&
    (protectedRoutes.includes(pathname) || pathname.startsWith("/curriculum/"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to relevant routes, including dynamic paths
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/curriculum/(.*)", // This protects all `/curriculum/[id]` pages
  ],
};
