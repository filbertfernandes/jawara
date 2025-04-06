"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { IoIosMailOpen } from "react-icons/io";

import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { getCredentialAccount } from "@/lib/actions/account.action";
import { resendVerificationToken } from "@/lib/actions/auth.action";

const Page = () => {
  const t = useTranslations("EmailVerification");

  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isCleared = useRef(false);

  useEffect(() => {
    if (isCleared.current) return; // Prevent running twice

    const storedEmail = sessionStorage.getItem("pending_verification_email");

    if (!storedEmail) {
      router.push(routes.HOME);
      return;
    }

    setEmail(storedEmail);

    sessionStorage.removeItem("pending_verification_email");
    isCleared.current = true;

    const checkAccount = async () => {
      try {
        const response = await getCredentialAccount(storedEmail);
        if (!response.success || !response.data) {
          router.push(routes.HOME);
          return;
        }

        if (response.data.emailVerified) {
          router.push(routes.HOME);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
        router.push(routes.HOME);
      }
    };

    checkAccount();
  }, [router]);

  const handleResendEmail = async () => {
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      const result = await resendVerificationToken(email);

      if (result.success) {
        toast({
          title: t("toast.success_title"),
          description: t("toast.success_description"),
        });
      } else {
        toast({
          title: t("toast.failed_title"),
          description: t("toast.failed_description"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error resending activation link:", error);

      toast({
        title: t("toast.failed_title"),
        description: t("toast.failed_description"),
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
      <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
        {t("verify_title")}
      </h1>
      <p className="w-full text-center text-gray-600 md:text-xl">
        {t("verify_description")}{" "}
        <span className="text-orange-500">{email}</span>
      </p>
      <div className="flex size-24 items-center justify-center rounded-xl bg-orange-500 text-7xl text-gray-100">
        <IoIosMailOpen />
      </div>
      <p className="w-full text-center text-gray-600 md:text-xl">
        {t("resend_prompt")}{" "}
        <span
          className={`cursor-pointer text-orange-500 ${
            isLoading ? "" : "hover:underline"
          }`}
          onClick={handleResendEmail}
        >
          {isLoading ? t("sending") : t("resend")}
        </span>
      </p>
    </div>
  );
};

export default Page;
