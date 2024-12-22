import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoNumber } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoBody, IoColorPalette } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Page({ params }) {
  return (
    <div className="fullscreen-orange-100 flex-wrap gap-6 overflow-scroll font-questrial font-bold text-white">
      <Link href="/">
        <div className="absolute left-4 top-4 cursor-pointer text-4xl text-black sm:text-5xl">
          <IoMdClose className="cursor-pointer" />
        </div>
      </Link>

      <div className="flex w-full justify-center">
        <Avatar className="size-32 font-sans">
          <AvatarFallback className="border-4 border-orange-500 bg-white text-7xl font-bold tracking-wider text-orange-500">
            FF
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex h-auto w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 text-center lg:px-6 lg:py-8">
        <h2 className="h2-bold">Filbert Fernandes Lienardy</h2>
      </div>

      <div className="flex max-h-96 min-h-96 w-full flex-wrap justify-center overflow-scroll rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 lg:px-6 lg:py-8">
        <h2 className="h2-bold mb-3 w-full text-center">Awards</h2>
        <div className="flex w-full flex-wrap justify-center gap-6">
          <Image
            src="/images/awards/curriculum-completion.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/top-3.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/top-10.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/top-50.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/top-100.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-1000.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-500.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-250.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-100.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-25.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/correct-translations-1.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/first-time-body-parts.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/first-time-colors.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/first-time-numbers.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
          <Image
            src="/images/awards/first-time-animals.jpg"
            alt="Jawara Logo"
            width={125}
            height={125}
            className="size-[125px] rounded-xl lg:size-[150px]"
          />
        </div>
      </div>

      <div className="flex h-auto w-full flex-col items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 text-center lg:px-6 lg:py-8">
        <h1 className="text-8xl">39</h1>
        <p className="text-base sm:text-lg lg:text-xl">
          Total Correct Translations
        </p>
      </div>

      <div className="mb-8 flex h-auto w-full flex-col items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4 text-center lg:px-10 lg:py-8">
        <h2 className="h2-bold mb-3 w-full text-center">Vocabulary Scores</h2>
        <div className="mb-4 flex w-full flex-wrap items-center border-b-2 border-white pb-4">
          <h3 className="h5-bold">Body Parts</h3>
          <IoBody className="ml-1 text-2xl lg:text-4xl" />
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Ngoko</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Madya</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Alus</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-wrap items-center border-b-2 border-white pb-4">
          <h3 className="h5-bold">Colors</h3>
          <IoColorPalette className="ml-1 text-2xl lg:text-4xl" />
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Ngoko</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Madya</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Alus</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-wrap items-center border-b-2 border-white pb-4">
          <h3 className="h5-bold">Numbers</h3>
          <GoNumber className="ml-1 text-2xl lg:text-4xl" />
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Ngoko</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Madya</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Alus</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-wrap items-center border-b-2 border-white pb-4">
          <h3 className="h5-bold">Animals</h3>
          <MdOutlinePets className="ml-1 text-2xl lg:text-4xl" />
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Ngoko</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Madya</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <h6 className="text-base sm:text-lg lg:text-xl">Krama Alus</h6>
            <h6 className="text-base sm:text-lg lg:text-xl">0</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
