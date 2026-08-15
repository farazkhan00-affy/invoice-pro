import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account, profile, trigger, session }) {
      if (account?.provider === "google" && profile?.email) {
        const dbUser = await prisma.user.upsert({
          where: { email: profile.email },
          update: { name: profile.name ?? undefined },
          create: { name: profile.name ?? "Google User", email: profile.email },
        });
        token.sub = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.avatarUrl = dbUser.avatarUrl ?? undefined;
        return token;
      }
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.avatarUrl = (user as { avatarUrl?: string | null }).avatarUrl;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.avatarUrl) {
        token.avatarUrl = session.avatarUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.avatarUrl = token.avatarUrl as string | undefined;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
      },
    }),
  ],
});