import NextAuth from "next-auth";
import { authConfig } from "@/app/lib/auth.config";

export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"],
};