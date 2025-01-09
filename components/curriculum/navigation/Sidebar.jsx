"use client";

import Link from "next/link";
import { RiArrowLeftSLine } from "react-icons/ri";

import ProgressBar from "./ProgressBar";
import { useCurriculum } from "../stores/useCurriculum";

const dummyUserChapterProgress = {
  _id: "64b9fcd2a4c8e4108a8f2b78", // Example ObjectId as a string
  userId: "64b9fcd2a4c8e4108a8f2b99", // Example ObjectId for the user
  chapterId: 1, // Matches the id of the chapter in `chapters.json`
  completedPhases: 1, // Number of completed phases, e.g., 1 for "Pretest" completed
  preTestScore: 8, // Pre-test score out of 10
  postTestScore: -1, // Post-test not completed yet, default is -1
  preTestCompletedAt: "2025-01-08T10:00:00Z", // Example completion timestamp
  postTestCompletedAt: null, // Not completed yet, so set to `null`
};

const Sidebar = ({ chapter }) => {
  const { phase } = useCurriculum((state) => ({
    phase: state.phase,
  }));

  const userChapterProgress = dummyUserChapterProgress;

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
        {chapter.phases.map((chapterPhase, index) => {
          const isFirst = index === 0;
          const isCompleted = userChapterProgress.completedPhases > index;
          const isInProgress = userChapterProgress.completedPhases === index;
          const isActive = phase === chapterPhase.name;

          return (
            <ProgressBar
              key={index}
              title={chapterPhase.name}
              first={isFirst}
              completed={isCompleted}
              inProgress={isInProgress}
              active={isActive}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
