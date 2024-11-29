"use client";

import AuthForm from "@/components/auth/AuthForm";
import { SignInSchema } from "@/lib/validations";

export default function Page() {
  return (
    <div className="mt-6 w-full opacity-75">
      <p>
        Sign in to access exclusive curriculum materials, earn rewards, and
        <br />
        climb the leaderboard as you master Javanese language!
      </p>

      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  );
}
