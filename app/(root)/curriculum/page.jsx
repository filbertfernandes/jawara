import Image from "next/image";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";

const page = () => {
  return (
    <>
      <div className="fullscreen-orange-100 flex-wrap overflow-scroll font-questrial">
        <Link
          href="/"
          className="flex w-full cursor-pointer items-center justify-center text-center text-lg text-slate-600 lg:text-xl"
        >
          <GiExitDoor className="mr-1" /> Back to Home
        </Link>
        <div className="relative m-[30px] inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
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
        <div className="relative m-[30px] inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
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
        <div className="relative m-[30px] inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
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
        <div className="relative m-[30px] inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
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
        <div className="relative m-[30px] inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30">
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
