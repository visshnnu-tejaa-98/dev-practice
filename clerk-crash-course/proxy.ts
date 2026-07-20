import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/api/webhook/register", "/sign-in", "sign-up"]

export default clerkMiddleware(async (auth, req) => {
    const authDetails = await auth()
    const role = authDetails.sessionClaims?.metadata?.role
    const userId = authDetails?.sessionClaims?.sub
    const currentPath = req.nextUrl.pathname

    if (!userId && !publicRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    if (userId) {
        try {
            if (role === "admin" && currentPath === "/dashboard") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            } else if (role === "admin" && publicRoutes.includes(currentPath)) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            } else if (role !== "admin" && publicRoutes.includes(currentPath)) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            } else {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/error", req.url));
        }
    }

    if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        // Always run for Clerk-specific frontend API routes
        '/__clerk/(.*)',
    ],
}
