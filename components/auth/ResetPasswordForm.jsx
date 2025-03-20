"use client";
import Link from "next/link";
import { useState } from "react";

import { Input } from "../ui/input";

import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { createAndSendResetToken } from "@/lib/actions/resetToken.action";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email.",
        variant: "destructive",
      });

      setIsLoading(false);

      return;
    }

    try {
      const result = await createAndSendResetToken(email);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Password reset link has been sent!",
        });
      } else {
        toast({
          title: `Error ${result?.status || "Unknown"}`,
          description: result?.error?.message || "Failed to send reset link.",
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
    <>
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <div className="mb-4 flex w-full flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
            Forgot your password?
          </h1>
          <p className="w-full text-center text-sm text-gray-600 md:text-base">
            Enter your email and we&apos;ll send you password reset link.
          </p>
        </div>
        <Input
          required
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="rounded-2xl border-none text-center font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500"
        />
        <div
          onClick={handleSubmit}
          className={`btn-template w-full bg-orange-500 text-white ${
            !isLoading ? "cursor-pointer hover:bg-orange-600" : "cursor-none"
          }`}
        >
          {!isLoading ? "Send" : "Sending..."}
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
