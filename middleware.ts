// middleware.ts
import NextAuth from "next-auth";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  listingViewRoute,
} from "./routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req): void | Response | Promise<void | Response> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isPublicViewListing = nextUrl.pathname.startsWith(listingViewRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    if (isPublicViewListing) return;
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};