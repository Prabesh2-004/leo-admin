import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export default async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  const protectedPaths = ["/user", "/setting"];

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: Always return supabaseResponse (not NextResponse.next())
  // so that session cookies are properly forwarded.
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
