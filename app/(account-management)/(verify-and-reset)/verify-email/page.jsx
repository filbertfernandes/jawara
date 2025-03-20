"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import routes from "@/constants/routes";
import { newVerification } from "@/lib/actions/verificationToken.action";

export default function Page() {
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
          setSuccess("Email is Verified!");
          setEmail(result.data);
        } else {
          setError(result?.error?.message || "An unexpected error occurred.");
        }
      } catch (error) {
        console.error("Submission error:", error);

        setError(
          error?.message?.includes("timed out")
            ? "Request timed out. Please try again."
            : error?.message || "An unexpected error occurred."
        );
      }
    };

    checkVerification();
  }, [token, success, error]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
          {success || error || "Verifying Email..."}
        </h1>
        <div className="w-full text-center text-gray-600 md:text-xl">
          {success ? (
            <>
              Your email <span className="text-orange-500">{email}</span> has
              been successfully verified! You can start sign in to your Jawara
              account. 🚀
            </>
          ) : error ? (
            <>
              <p>Oops! Email verification failed. 😔</p>
              <p>
                This link may be invalid. Try signing in if needed, you&apos;ll
                get further instructions.
              </p>
            </>
          ) : (
            "Please wait while we verify your email..."
          )}
        </div>
      </div>
    </>
  );
}
