"use client";

import { useTranslations } from "next-intl";

import AuthForm from "@/components/auth/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

export default function Page() {
  const t = useTranslations("Auth");

  return (
    <>
      <p className="mb-6">{t("sign_up_description")}</p>

      <AuthForm
        formType="SIGN_UP"
        schema={SignUpSchema}
        defaultValues={{ email: "", password: "", name: "", username: "" }}
        onSubmit={signUpWithCredentials}
      />
    </>
  );
}
