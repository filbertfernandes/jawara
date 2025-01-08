import Link from "next/link";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

import ProgressBar from "./ProgressBar";

const Sidebar = ({ chapter }) => {
  return (
    <section className="min-h-screen w-2/5 bg-gray-50 py-4 text-black max-md:hidden sm:py-14 lg:w-[30%]">
      <Link href="/curriculum" className="absolute left-3 top-3">
        <RiArrowLeftSLine className="text-4xl text-black" />
      </Link>
      <div className="mb-6 flex flex-col flex-wrap items-center justify-center">
        <div className="text-sm font-bold text-orange-500 lg:text-base">
          Chapter {chapter.order}
        </div>
        <div className="h3-bold">{chapter.title}</div>
      </div>
      <div className="w-full">
        <ProgressBar title="Pre-Test" first completed />
        <ProgressBar title="Material" active />
        <ProgressBar title="Post-Test" />
      </div>
    </section>
  );
};

export default Sidebar;
