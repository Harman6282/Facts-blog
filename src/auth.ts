import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, Session, User } from "next-auth";

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // This is called during sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach user id to the session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages:{
    signIn: "/signin",
  }
};
