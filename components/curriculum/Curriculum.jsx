"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Skeleton } from "../ui/skeleton";

import chapters from "@/components/curriculum/data/chapters";
import BackButton from "@/components/home/shared/interfaces/BackButton";
import routes from "@/constants/routes";
import { getAllUserProgress } from "@/lib/actions/userProgress.action";

const Curriculum = () => {
  const t = useTranslations("Curriculum");
  const { data: session } = useSession();

  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      const fetchUserProgress = async () => {
        try {
          const result = await getAllUserProgress(session.user.id); // Call the server action with userId

          if (result.success) {
            setUserProgress(result.data); // Store user progress
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
    } else {
      setLoading(false); // Set loading to false if session is not available
    }
  }, [session]); // Only fetch when session is available

  const isChapterCompleted = (chapterId) => {
    const progress = userProgress.find((p) => p.chapterId === chapterId);

    if (progress) {
      const chapter = chapters.find((ch) => ch.id === chapterId);
      const isCompleted = progress.completedPhases === chapter.phases.length;
      return isCompleted;
    }

    return false;
  };

  return (
    <>
      <div className="left-0 top-0 flex size-full flex-wrap justify-center overflow-scroll bg-orange-100 p-4 font-questrial sm:p-14">
        <Link href={routes.HOME}>
          <div className="absolute left-4 top-4">
            <BackButton />
          </div>
        </Link>

        <div className="mb-4 mt-10 flex w-full flex-wrap justify-center gap-2">
          <h1 className="h1-bold w-full text-center text-gray-900">
            {t("welcome_to")} <span className="text-orange-500">Jawara</span>{" "}
            {t("curriculum")}!
          </h1>
          <p className="w-full text-center text-sm text-gray-600 sm:w-3/4 lg:w-1/2 lg:text-lg">
            {t("description")}
          </p>
        </div>

        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30"
            >
              <div className="h-1/2 w-full">
                <Skeleton className="size-full rounded-none" />
              </div>
              <div className="flex h-1/2 flex-col justify-between p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="mt-4 h-12 w-full" />
              </div>
            </div>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          chapters.map((chapter, index) => {
            const isPreviousChapterCompleted =
              index === 0 ||
              (session?.user?.id
                ? isChapterCompleted(chapters[index - 1].id)
                : false);

            return (
              <div
                key={chapter.id}
                className={`relative m-7 inline-block h-[28rem] w-80 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30 ${
                  !isPreviousChapterCompleted ? "opacity-50 grayscale" : ""
                }`} // Apply grayscale and reduced opacity to incomplete chapters
              >
                <Image
                  src={`/images/curriculum/chapter-${chapter.order}.webp`}
                  alt={`Chapter ${chapter.order}`}
                  height={500}
                  width={500}
                  className="h-1/2 object-cover"
                />
                <div className="flex h-1/2 flex-col justify-between">
                  <div className="flex h-3/4 w-full flex-col items-center justify-center text-center text-gray-900">
                    <div className="flex h-1/2 w-full flex-col justify-center">
                      <div className="text-sm font-bold text-orange-500 lg:text-base">
                        {t("chapter")} {chapter.order}
                      </div>
                      <div className="h3-bold">{chapter.title}</div>
                    </div>
                    <div className="h-1/2 w-full px-2 text-sm lg:text-base">
                      {chapter[`description_${t("language")}`]}
                    </div>
                  </div>
                  {isPreviousChapterCompleted ? (
                    <Link
                      href={`${routes.CURRICULUM}/${chapter.id}`}
                      className="flex h-1/4 w-full cursor-pointer items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-gray-100 transition-transform hover:scale-105 hover:from-orange-400 hover:to-orange-600"
                    >
                      {t("start_learning")}
                    </Link>
                  ) : (
                    <div
                      className="flex h-1/4 w-full items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-center text-3xl font-bold text-gray-100"
                      disabled
                    >
                      {t("start_learning")}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Curriculum;
