import Image from "next/image";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const page = () => {
  return (
    <>
      <div className="fullscreen-orange-100 flex-wrap overflow-scroll font-questrial">
        <Link href="/">
          <div className="absolute left-4 top-4 cursor-pointer text-3xl text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-600 sm:text-4xl">
            <GiExitDoor />
          </div>
        </Link>
        <div className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
          <Image
            src="/images/curriculum/chapter-1.jpg"
            alt="Chapter-1"
            height={500}
            width={500}
            className="h-1/2 object-cover"
          />
          <div className="flex h-1/2 flex-col justify-between">
            <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="text-sm font-bold text-orange-500 lg:text-base">
                  Chapter 1
                </div>
                <div className="h3-bold">Kenalan</div>
              </div>
              <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                Master basic Javanese greetings, introductions, and simple
                conversation starters!
              </div>
            </div>
            <div className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white">
              Start Learning
            </div>
          </div>
        </div>
        <div className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
          <Image
            src="/images/curriculum/chapter-1.jpg"
            alt="Chapter-1"
            height={500}
            width={500}
            className="h-1/2 object-cover"
          />
          <div className="flex h-1/2 flex-col justify-between">
            <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="text-sm font-bold text-orange-500 lg:text-base">
                  Chapter 1
                </div>
                <div className="h3-bold">Kenalan</div>
              </div>
              <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                Master basic Javanese greetings, introductions, and simple
                conversation starters!
              </div>
            </div>
            <div className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white">
              Start Learning
            </div>
          </div>
        </div>
        <div className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
          <Image
            src="/images/curriculum/chapter-1.jpg"
            alt="Chapter-1"
            height={500}
            width={500}
            className="h-1/2 object-cover"
          />
          <div className="flex h-1/2 flex-col justify-between">
            <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="text-sm font-bold text-orange-500 lg:text-base">
                  Chapter 1
                </div>
                <div className="h3-bold">Kenalan</div>
              </div>
              <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                Master basic Javanese greetings, introductions, and simple
                conversation starters!
              </div>
            </div>
            <div className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white">
              Start Learning
            </div>
          </div>
        </div>
        <div className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
          <Image
            src="/images/curriculum/chapter-1.jpg"
            alt="Chapter-1"
            height={500}
            width={500}
            className="h-1/2 object-cover"
          />
          <div className="flex h-1/2 flex-col justify-between">
            <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="text-sm font-bold text-orange-500 lg:text-base">
                  Chapter 1
                </div>
                <div className="h3-bold">Kenalan</div>
              </div>
              <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                Master basic Javanese greetings, introductions, and simple
                conversation starters!
              </div>
            </div>
            <div className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white">
              Start Learning
            </div>
          </div>
        </div>
        <div className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
          <Image
            src="/images/curriculum/chapter-1.jpg"
            alt="Chapter-1"
            height={500}
            width={500}
            className="h-1/2 object-cover"
          />
          <div className="flex h-1/2 flex-col justify-between">
            <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="text-sm font-bold text-orange-500 lg:text-base">
                  Chapter 1
                </div>
                <div className="h3-bold">Kenalan</div>
              </div>
              <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                Master basic Javanese greetings, introductions, and simple
                conversation starters!
              </div>
            </div>
            <div className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white">
              Start Learning
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
