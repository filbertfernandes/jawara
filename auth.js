import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { api } from "./lib/api";
import { SignInSchema } from "./lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log("INFO: Authorize function called", credentials);
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log("INFO: Validated credentials", email);

          const { data: existingAccount } = await api.accounts.getByProvider(
            email
          );
          if (!existingAccount) {
            console.log("ERROR: Account not found", email);
            return null;
          }

          const { data: existingUser } = await api.users.getById(
            existingAccount.userId.toString()
          );
          if (!existingUser) {
            console.log("ERROR: User not found", existingAccount.userId);
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password
          );
          if (!isValidPassword) {
            console.log("ERROR: Invalid password for", email);
            return null;
          }

          console.log("INFO: User authenticated successfully", existingUser.id);
          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          };
        }

        console.log("ERROR: Validation failed", validatedFields.error);
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("INFO: Session callback executed", token);
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, account }) {
      console.log("INFO: JWT callback executed", { token, account });
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
      console.log("INFO: Sign-in callback executed", { user, account });

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
