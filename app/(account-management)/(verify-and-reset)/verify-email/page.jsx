"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { newVerification } from "@/lib/actions/verificationToken.action";

export default function Page() {
  const t = useTranslations("EmailVerification");

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [email, setEmail] = useState();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("No token provided");
      return;
    }

    const checkVerification = async () => {
      try {
        const result = await newVerification(token);

        if (result?.success) {
          setSuccess(t("email_is_verified"));
          setEmail(result.data);
        } else {
          setError(result?.error?.message || t("unexpected_error"));
        }
      } catch (error) {
        console.error("Submission error:", error);

        setError(
          error?.message?.includes("timed out")
            ? t("timeout_error")
            : error?.message || t("unexpected_error")
        );
      }
    };

    checkVerification();
  }, [token, success, error]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
          {success || error || t("verifying_email")}
        </h1>
        <div className="w-full text-center text-gray-600 md:text-xl">
          {success ? (
            <>
              {t("verify_success_message_before_email")}
              <span className="text-orange-500">{email}</span>
              {t("verify_success_message_after_email")}
            </>
          ) : error ? (
            <>
              <p>{t("verify_error_message")}</p>
              <p>{t("verify_error_instruction")}</p>
            </>
          ) : (
            t("verifying_email_message")
          )}
        </div>
      </div>
    </>
  );
}
