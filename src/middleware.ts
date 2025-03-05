import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./components/getUser/userFound";

const authRoutes = ["/login", "/register"];
const openRoutes = ["/checkout", "/profile", "/order", , "/payment"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let userInfo;
  try {
    userInfo = await getUser();
  } catch (error) {
    console.error("Error fetching user:", error);
    userInfo = null;
  }

  if (!userInfo) {
    if (!authRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
    return NextResponse.next();
  }

  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userInfo.role === "customer") {
    if (!openRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout",
    "/profile",
    "/order",
    "/payment",
    "/payment/:path*",
  ],
};
