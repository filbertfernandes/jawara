"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

import ProgressBar from "./ProgressBar";
import { useCurriculum } from "../stores/useCurriculum";

import routes from "@/constants/routes";
import { getUserProgress } from "@/lib/actions/userProgress.action";

const Sidebar = ({ chapter, userProgress }) => {
  const t = useTranslations("Curriculum");

  const { phase, updatedUserProgress, setUpdatedUserProgress } = useCurriculum(
    (state) => ({
      phase: state.phase,
      updatedUserProgress: state.updatedUserProgress,
      setUpdatedUserProgress: state.setUpdatedUserProgress,
    })
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const result = await getUserProgress(chapter.id, userProgress.userId);

        if (result.success) {
          setUpdatedUserProgress(result.data);
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
    <section className="min-h-screen w-2/5 bg-gray-50 py-4 text-gray-900 max-md:hidden sm:py-14 lg:w-[30%]">
      <Link href={routes.CURRICULUM} className="absolute left-3 top-3">
        <RiArrowLeftSLine className="text-4xl text-gray-900" />
      </Link>
      <div className="mb-6 flex flex-col flex-wrap items-center justify-center">
        <div className="text-sm font-bold text-orange-500 lg:text-base">
          {t("chapter")} {chapter.order}
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
      </div>
    </section>
  );
};

export default Sidebar;
