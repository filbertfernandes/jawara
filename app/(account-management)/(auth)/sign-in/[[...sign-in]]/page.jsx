"use client";

import { useTranslations } from "next-intl";

import AuthForm from "@/components/auth/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";

export default function Page() {
  const t = useTranslations("Auth");
  return (
    <>
      <p className="mb-6">{t("sign_in_description")}</p>

      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={signInWithCredentials}
      />
    </>
  );
}
