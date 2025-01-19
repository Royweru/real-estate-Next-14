import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db} from "@/lib/prismadb";
import { getUserById } from "./lib/getUser";
import { UserRole } from "@prisma/client";




export type ExtendedUser = DefaultSession["user" ]&{
    role:"ADMIN" |"USER"|"AGENT"
}

declare module "next-auth" {
    interface Session{
      user:ExtendedUser
    }
  }
  

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.role = token.role as UserRole ;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
     strategy: "jwt", 
    maxAge: 60 * 60 * 24 * 1,

    },
  ...authConfig,
});
