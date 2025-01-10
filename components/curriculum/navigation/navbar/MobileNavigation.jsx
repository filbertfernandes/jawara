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
  const { phase } = useCurriculum((state) => ({
    phase: state.phase,
  }));

  const [userChapterProgress, setUserChapterProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const result = await getUserProgress(chapter.id, userProgress.userId); // Call the server action

        if (result.success) {
          setUserChapterProgress(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("An error occurred while fetching user progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [userProgress, chapter.id, phase]);

  if (error) return <div>{error}</div>;

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
              !loading ? (
                <ProgressBar
                  key={index}
                  title={chapterPhase.name}
                  first={index === 0}
                  completed={userChapterProgress.completedPhases > index}
                  inProgress={userChapterProgress.completedPhases === index}
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
