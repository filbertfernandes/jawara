import React from "react";
import { FaFolder, FaWindows } from "react-icons/fa";

const Taskbar = () => {
  return (
    <div className="flex h-[0.3rem] w-full items-center justify-center bg-gray-900/50 px-1">
      <div className="flex gap-[0.1rem]">
        <FaWindows className="text-[0.2rem] text-blue-600" />
        <FaFolder className="text-[0.2rem] text-yellow-500" />
        <div className="size-[0.2rem] bg-rose-500"></div>
        <div className="size-[0.2rem] bg-pink-300"></div>
        <div className="size-[0.2rem] rounded bg-teal-500"></div>
        <div className="size-[0.2rem] bg-lime-500"></div>
        <div className="size-[0.2rem] bg-fuchsia-500"></div>
        <div className="size-[0.2rem] bg-amber-500"></div>
        <div className="size-[0.2rem] rounded bg-orange-800"></div>
      </div>
    </div>
  );
};

export default Taskbar;
