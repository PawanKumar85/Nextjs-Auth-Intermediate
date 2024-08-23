import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signup" || path === "/login" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/profile/:id*",
    "/verifyemail"  
  ],
};

/*
public :​‌‌‍⁡⁢⁣⁢'/login','/signup'⁡​
private : ​‌‌‍⁡⁢⁢⁢'/profile/:id*','/profile'⁡​
*/
