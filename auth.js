import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { api } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        return {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          await api.accounts.getByProvider(
            account.type === "credentials"
              ? token.email
              : account.providerAccountId
          );

        if (!success || !existingAccount) return token;
        token.sub = existingAccount.userId.toString();
      }
      return token;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;

      if (!account || !user) return false;

      const userInfo = {
        name: user.name,
        email: user.email,
        username: user.name?.toLowerCase(),
      };

      const { success } = await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      return success;
    },
  },
});
