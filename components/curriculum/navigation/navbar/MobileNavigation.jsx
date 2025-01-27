"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
import { getUserProgress } from "@/lib/actions/userProgress.action";

const MobileNavigation = ({ chapter, userProgress }) => {
  const { phase, updatedUserProgress } = useCurriculum((state) => ({
    phase: state.phase,
    updatedUserProgress: state.updatedUserProgress,
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!updatedUserProgress || chapter.id !== updatedUserProgress?.chapterId)
      return;

    setIsLoading(false);
  }, [updatedUserProgress]);

  return (
    <div className="absolute left-0 top-0 p-4 sm:p-14 md:hidden">
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
            {chapter.phases.map((chapterPhase, index) =>
              !isLoading ? (
                <ProgressBar
                  key={index}
                  title={chapterPhase.name}
                  first={index === 0}
                  completed={updatedUserProgress.completedPhases > index}
                  inProgress={updatedUserProgress.completedPhases === index}
                  active={phase === chapterPhase.name}
                />
              ) : (
                <ProgressBar
                  key={index}
                  title={chapterPhase.name}
                  first={index === 0}
                  completed={userProgress.completedPhases > index}
                  inProgress={userProgress.completedPhases === index}
                  active={phase === chapterPhase.name}
                />
              )
            )}
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
