import { Bebas_Neue, Questrial } from "next/font/google";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
});

const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${questrial.variable} ${bebas.variable}`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
