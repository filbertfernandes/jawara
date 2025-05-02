"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Input } from "../ui/input";

import { toast } from "@/hooks/use-toast";
import { createAndSendResetToken } from "@/lib/actions/resetToken.action";

const ResetPasswordForm = () => {
  const t = useTranslations("ResetPasswordForm");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (!email) {
      toast({
        title: t("error_title"),
        description: t("error_no_email"),
        variant: "destructive",
      });

      setIsLoading(false);
      return;
    }

    try {
      const result = await createAndSendResetToken(email);

      if (result?.success) {
        toast({
          title: t("success_title"),
          description: t("success_message"),
        });
      } else {
        toast({
          title: `${t("error_title")} ${result?.status || t("error_unknown")}`,
          description: result?.error?.message || t("error_failed"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Reset request error:", error);

      toast({
        title: t("error_submission"),
        description: error?.message?.includes("timed out")
          ? t("error_timed_out")
          : error?.message || t("error_unexpected"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
      <div className="mb-4 flex w-full flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
          {t("title")}
        </h1>
        <p className="w-full text-center text-sm text-gray-600 md:text-base">
          {t("description")}
        </p>
      </div>
      <Input
        required
        type="text"
        placeholder={t("placeholder")}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="rounded-2xl border-none text-center font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-500"
      />
      <div
        onClick={handleSubmit}
        className={`btn-template w-full bg-orange-500 text-gray-100 ${
          !isLoading ? "cursor-pointer hover:bg-orange-600" : "cursor-none"
        }`}
      >
        {!isLoading ? t("button_send") : t("button_sending")}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
