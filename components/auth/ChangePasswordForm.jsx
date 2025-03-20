"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
          title: "Success",
          description:
            "Your password has been successfully updated. You can now sign in with your new password.",
        });

        router.push(routes.SIGN_IN);
      } else {
        toast({
          title: `Error ${result?.status || "Unknown"}`,
          description: result?.error?.message || "Failed to change password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Reset request error:", error);

      toast({
        title: "Submission Error",
        description: error?.message?.includes("timed out")
          ? "Request timed out. Please try again."
          : error?.message || "An unexpected error occurred.",
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
          Change your password
        </h1>
        <p className="w-full text-center text-sm text-gray-600 md:text-base">
          Enter a new password below to change your password.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col justify-center gap-12"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <div className="flex w-full flex-col">
                  <div className="mb-1 font-bold text-gray-900">
                    {field.name
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .replace(/^./, (str) => str.toUpperCase())}
                  </div>
                  <FormItem className="relative">
                    <FormControl className="w-full">
                      <div className="relative flex flex-wrap items-center text-gray-400 focus-within:text-gray-600">
                        <Input
                          required
                          type="password"
                          placeholder={
                            "Enter " +
                            field.name
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .replace(/^./, (str) => str.toUpperCase())
                          }
                          {...field}
                          className="rounded-2xl border-none py-2 pl-10 pr-3 font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                    </FormControl>
                    <div className="absolute -bottom-6 right-0">
                      <FormMessage />
                    </div>
                  </FormItem>
                </div>
              )}
            />
          ))}

          <Button
            disabled={form.formState.isSubmitting}
            className="btn-template mt-4 w-full bg-orange-500 hover:bg-orange-600"
          >
            {!isLoading ? "Change Password" : "Changing..."}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
