import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
  matcher: ["/profile", "/pets/upload-a-pet", "/login", "/register"],
};

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('next-auth.session-token');
  
  if (config.matcher.includes(req.nextUrl.pathname)) {
    if (!token && (req.nextUrl.pathname === "/profile" || req.nextUrl.pathname === "/pets/upload-a-pet")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If on login/register page and already have a token, redirect to home
    if ((req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}


