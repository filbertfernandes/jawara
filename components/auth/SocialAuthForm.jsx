"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

export default function SocialAuthForm() {
  const handleSignIn = async (provider) => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Sign-in Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occured during sign-in",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-3/4 flex-wrap justify-center 2xl:w-1/2">
      <div className="my-4 flex w-full items-center justify-center">
        <div className="w-1/2 border-t border-gray-400"></div>
        <span className="px-4 text-black">Or</span>
        <div className="w-1/2 border-t border-gray-400"></div>
      </div>
      <div
        className="btn-template w-full border bg-white text-black drop-shadow-lg"
        onClick={() => handleSignIn("google")}
      >
        <Image
          src="/images/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Continue with Google</span>
      </div>
    </div>
  );
}
