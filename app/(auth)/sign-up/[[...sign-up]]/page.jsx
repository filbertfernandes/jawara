"use client";

import AuthForm from "@/components/auth/AuthForm";
import { SignUpSchema } from "@/lib/validations";

export default function Page() {
  return (
    <>
      <p className="mb-6 opacity-75">
        Create an account to unlock curriculum materials, earn rewards, climb
        the leaderboard and become a master of the Javanese language!
      </p>

      <AuthForm
        formType="SIGN_UP"
        schema={SignUpSchema}
        defaultValues={{ email: "", password: "", name: "", username: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </>
  );
}
