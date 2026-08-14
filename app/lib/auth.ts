import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
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