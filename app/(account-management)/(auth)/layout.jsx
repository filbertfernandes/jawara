"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import SocialAuthForm from "@/components/auth/SocialAuthForm";
import routes from "@/constants/routes";

const Layout = ({ children }) => {
  const t = useTranslations("Auth");

  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 900 });

  // Ensure component is mounted before using useMediaQuery
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid SSR mismatch by not rendering anything initially
  }

  return (
    <main className="flex min-h-screen w-full flex-col justify-center font-questrial text-xs md:flex-row lg:text-sm xl:text-base">
      {!isMobile ? (
        <>
          <div className="flex flex-1 flex-wrap items-center justify-center bg-white py-12 text-gray-900">
            <div className="flex w-full flex-wrap justify-center text-center">
              <h1 className="h6-bold w-full">{t("welcome_to")}</h1>
              <Link
                href={routes.HOME}
                className="mb-6 flex w-full justify-center"
              >
                <Image
                  src="/images/jawara/jawara-logo-2.png"
                  alt="Jawara Logo"
                  width={300}
                  height={300}
                />
              </Link>
              <div className="w-3/4 2xl:w-1/2">{children}</div>
            </div>
            <div className="flex w-full justify-center">
              <SocialAuthForm />
            </div>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/jawara/auth-background.jpg')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-orange-100/80" />

            {/* Content */}
            <div className="relative">
              <Link href={routes.HOME}>
                <Image
                  src="/images/jawara/jawara-logo.png"
                  alt="Jawara Logo"
                  width={550}
                  height={550}
                />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex items-center justify-center">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/jawara/auth-background.jpg')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-orange-100/80" />

            {/* Content */}
            <div className="relative">
              <Link href={routes.HOME}>
                <Image
                  src="/images/jawara/jawara-logo.png"
                  alt="Jawara Logo"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
          </div>

          <div className="flex grow flex-wrap items-center justify-center bg-white py-4 text-gray-900">
            <div className="flex w-full flex-wrap justify-center text-center">
              <div className="w-3/4 2xl:w-1/2">{children}</div>
            </div>
            <SocialAuthForm />
          </div>
        </>
      )}
    </main>
  );
};

export default Layout;
