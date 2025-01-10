"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

import ProgressBar from "./ProgressBar";
import { useCurriculum } from "../stores/useCurriculum";

import { getUserProgress } from "@/lib/actions/userProgress.action";

const Sidebar = ({ chapter, userId }) => {
  const { phase } = useCurriculum((state) => ({
    phase: state.phase,
  }));

  const [userChapterProgress, setUserChapterProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setLoading(true);
        const result = await getUserProgress(chapter.id, userId); // Call server action

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
  }, [userId, chapter.id]);

  if (error) return <div>{error}</div>;

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
            />
          )
        )}
      </div>
    </section>
  );
};

export default Sidebar;
