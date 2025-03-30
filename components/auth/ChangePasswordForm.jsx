"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/lib/actions/resetToken.action";
import { ResetPasswordSchema } from "@/lib/validations";

const ChangePasswordForm = ({ resetPasswordToken }) => {
  const t = useTranslations("ChangePasswordForm");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = { newPassword: "", confirmPassword: "" };

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const result = await resetPassword(resetPasswordToken, data.newPassword);

      if (result?.success) {
        toast({
          title: t("success_title"),
          description: t("success_message"),
        });
        router.push(routes.SIGN_IN);
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col justify-center gap-12"
        >
          {Object.keys(defaultValues).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="mb-1 font-bold text-gray-900">
                    {t(`fields.${key}`)}
                  </div>
                  <FormControl>
                    <Input
                      required
                      type="password"
                      placeholder={t(`placeholders.${key}`)}
                      {...field}
                      className="rounded-2xl border-none py-2 pl-10 pr-3 font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            disabled={form.formState.isSubmitting}
            className="btn-template mt-4 w-full bg-orange-500 hover:bg-orange-600"
          >
            {!isLoading ? t("button_submit") : t("button_loading")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
