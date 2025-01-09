"use client";

import Link from "next/link";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

import { useCurriculum } from "../../stores/useCurriculum";
import ProgressBar from "../ProgressBar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const dummyUserChapterProgress = {
  _id: "64b9fcd2a4c8e4108a8f2b78",
  userId: "64b9fcd2a4c8e4108a8f2b99",
  chapterId: 1,
  completedPhases: 1,
  preTestScore: 8,
  postTestScore: -1,
  preTestCompletedAt: "2025-01-08T10:00:00Z",
  postTestCompletedAt: null,
};

const MobileNavigation = ({ chapter }) => {
  const { phase } = useCurriculum((state) => ({
    phase: state.phase,
  }));

  const userChapterProgress = dummyUserChapterProgress;

  return (
    <div className="left-0 top-0 p-4 sm:p-14 md:hidden">
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu className="text-3xl text-black" />
        </SheetTrigger>
        <SheetContent className="px-0 py-8 sm:py-16" side="left">
          <SheetHeader>
            <Link href="/curriculum" className="absolute left-3 top-3">
              <RiArrowLeftSLine className="text-4xl text-black" />
            </Link>
            <SheetTitle className="mb-6 flex flex-col flex-wrap items-center justify-center">
              <div className="text-sm font-bold text-orange-500">
                Chapter {chapter.order}
              </div>
              <div className="h3-bold">{chapter.title}</div>
            </SheetTitle>
          </SheetHeader>
          <SheetClose className="w-full">
            {chapter.phases.map((chapterPhase, index) => {
              const isFirst = index === 0;
              const isCompleted = userChapterProgress.completedPhases > index;
              const isInProgress =
                userChapterProgress.completedPhases === index;
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
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
