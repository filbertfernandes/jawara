import Image from "next/image";

export default function SocialAuthForm() {
  return (
    <div className="flex w-[50%] flex-wrap justify-center">
      <div class="my-4 flex w-full items-center justify-center">
        <div class="w-[50%] border-t border-gray-400"></div>
        <span class="px-4 text-gray-600">Or</span>
        <div class="w-[50%] border-t border-gray-400"></div>
      </div>
      <div className="btn-template w-[75%] border bg-white text-black drop-shadow-lg">
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
