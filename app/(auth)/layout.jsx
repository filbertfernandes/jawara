import Image from "next/image";
import Link from "next/link";

import SocialAuthForm from "@/components/auth/SocialAuthForm";

const Layout = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full justify-center font-questrial">
      <div className="flex flex-1 flex-wrap items-center justify-center bg-white text-black">
        <div className="flex w-full flex-wrap justify-center text-center">
          <h1 className="h6-bold w-full">WELCOME TO</h1>
          <Link href="/">
            <Image
              src="/images/jawara/jawara-logo-2.png"
              alt="Jawara Logo"
              width={300}
              height={300}
            />
          </Link>
          {children}
        </div>
        <SocialAuthForm />
      </div>

      <div className="flex flex-1 items-center justify-center bg-orange-100">
        <Image
          src="/images/jawara/jawara-logo.png"
          alt="Jawara Logo"
          width={550}
          height={550}
        />
      </div>
    </main>
  );
};

export default Layout;
