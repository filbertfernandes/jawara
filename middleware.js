import { NextResponse } from "next/server";

import routes from "./constants/routes";

import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Define routes that logged-in users shouldn't access
  const restrictedForLoggedIn = [routes.SIGN_IN, routes.SIGN_UP];

  // Define routes that require authentication
  const protectedRoutes = [];

  // If user is logged in and trying to access sign-in or sign-up, redirect to home
  if (session && restrictedForLoggedIn.includes(pathname)) {
    return NextResponse.redirect(new URL(routes.HOME, req.url));
  }

  // If user is NOT logged in and trying to access protected pages, redirect to sign-in
  if (
    !session &&
    (protectedRoutes.includes(pathname) ||
      pathname.startsWith(`${routes.CURRICULUM}/`))
  ) {
    return NextResponse.redirect(new URL(routes.SIGN_IN, req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all relevant routes, including dynamic paths
export const config = {
  matcher: [
    routes.SIGN_IN,
    routes.SIGN_UP,
    `${routes.CURRICULUM}/:path*`, // This protects all `/curriculum/[id]` pages
  ],
};
