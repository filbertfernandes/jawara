"use client";

import AuthForm from "@/components/auth/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";

export default function Page() {
  return (
    <>
      <p className="mb-6 opacity-75">
        Sign in to access exclusive curriculum materials, earn rewards, and
        climb the leaderboard as you master Javanese language!
      </p>

      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={signInWithCredentials}
      />
    </>
  );
}
