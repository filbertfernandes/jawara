import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import PdfComponent from "./PdfComponent";
import { useCurriculum } from "./stores/useCurriculum";

import { incrementCompletedPhases } from "@/lib/actions/userProgress.action";

const Content = ({ chapter, chapterPhase }) => {
  const t = useTranslations("Curriculum");

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { phase, changePhase, updatedUserProgress } = useCurriculum(
    (state) => ({
      phase: state.phase,
      changePhase: state.changePhase,
      updatedUserProgress: state.updatedUserProgress,
    })
  );

  useEffect(() => {
    if (!updatedUserProgress || chapter.id !== updatedUserProgress?.chapterId)
      return;

    setIsLoading(false);

    if (updatedUserProgress.completedPhases >= chapterPhase.id) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [phase, updatedUserProgress]);

  const handleFinished = async () => {
    try {
      await incrementCompletedPhases(chapter.id, updatedUserProgress.userId);
      setIsFinished(true);
      setIsStarted(false);
      changePhase(chapter.phases[chapterPhase.id].name_english);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-xl font-bold text-gray-600">
            {t("loading")}...
          </div>
        </div>
      ) : isStarted ? (
        <PdfComponent
          isFinished={isFinished}
          chapterPhase={chapterPhase}
          onFinish={handleFinished}
        />
      ) : isFinished ? (
        <div className="flex size-full flex-col items-center justify-center gap-6 px-4 text-gray-900">
          <div className="text-center">
            <div className="h5-bold mb-1">
              {t("material_finished")} {chapterPhase.name_english}!
            </div>
            <div className="text-sm text-gray-600 lg:text-xl">
              {t("material_finished_description")}
            </div>
          </div>
          <div
            className="btn-template w-36 cursor-pointer bg-orange-500 text-gray-100 hover:bg-orange-600 lg:w-48 lg:text-2xl"
            onClick={() => setIsStarted(true)}
          >
            {t("start_learning")}
          </div>
        </div>
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-6 px-4 text-gray-900">
          <div className="text-center">
            <div className="h5-bold mb-1">{t("material_title")}</div>
            <div className="text-sm text-gray-600 lg:text-xl">
              {t("material_description")}
            </div>
          </div>
          <div
            className="btn-template w-36 cursor-pointer bg-orange-500 text-gray-100 hover:bg-orange-600 lg:w-48 lg:text-2xl"
            onClick={() => setIsStarted(true)}
          >
            {t("start_learning")}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
