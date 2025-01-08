import Image from "next/image";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";

import chapters from "@/components/curriculum/data/chapters";

const page = () => {
  return (
    <>
      <div className="left-0 top-0 flex size-full flex-wrap justify-center overflow-scroll bg-orange-100 p-4 font-questrial sm:p-14">
        <Link href="/">
          <div className="absolute left-4 top-4 cursor-pointer text-3xl text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-600 sm:text-4xl">
            <GiExitDoor />
          </div>
        </Link>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30"
          >
            <Image
              src={`/images/curriculum/chapter-${chapter.order}.jpg`}
              alt={`Chapter ${chapter.order}`}
              height={500}
              width={500}
              className="h-1/2 object-cover"
            />
            <div className="flex h-1/2 flex-col justify-between">
              <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-black">
                <div className="flex h-1/2 w-full flex-col justify-center">
                  <div className="text-sm font-bold text-orange-500 lg:text-base">
                    Chapter {chapter.order}
                  </div>
                  <div className="h3-bold">{chapter.title}</div>
                </div>
                <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                  {chapter.description}
                </div>
              </div>
              <Link
                href={`/curriculum/${chapter.id}`}
                className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-white"
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
