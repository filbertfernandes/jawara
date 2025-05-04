import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import BackButton from "../../shared/interfaces/BackButton";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

import { phases, useGame } from "@/hooks/useGame";

const GuideInterface = ({ isFirstTime }) => {
  const t = useTranslations("Home");

  const { changePhase, setIsFirstTime } = useGame((state) => ({
    changePhase: state.changePhase,
    setIsFirstTime: state.setIsFirstTime,
  }));

  const {
    guideIndex,
    guideLength,
    resetGuideIndex,
    incrementGuideIndex,
    decrementGuideIndex,
    setTutorialState,
  } = useTutorial((state) => ({
    guideIndex: state.guideIndex,
    guideLength: state.guideLength,
    resetGuideIndex: state.resetGuideIndex,
    incrementGuideIndex: state.incrementGuideIndex,
    decrementGuideIndex: state.decrementGuideIndex,
    setTutorialState: state.setTutorialState,
  }));

  useEffect(() => {
    resetGuideIndex();
  }, []);

  const handleFinishButton = () => {
    setIsFirstTime(false);
    changePhase(phases.FREE);
  };

  const isFinishStep = isFirstTime && guideIndex + 1 === guideLength;

  return (
    <div className="fixed left-0 top-0 flex size-full justify-center p-10 font-bebas">
      {!isFirstTime && (
        <div className="absolute left-4 top-4">
          <BackButton onClick={() => setTutorialState(tutorialStates.MENU)} />
        </div>
      )}
      <div className="flex size-full items-end justify-center gap-24 text-4xl text-gray-100 lg:gap-60">
        <button
          className={`btn-template bg-orange-500 px-4 text-xl drop-shadow-lg hover:bg-orange-600 lg:text-2xl ${
            isFirstTime && guideIndex === 0
              ? "pointer-events-none opacity-0"
              : ""
          }`}
          onClick={decrementGuideIndex}
        >
          <FaArrowLeft className="mr-3" /> {t("previous")}
        </button>

        <button
          className="btn-template bg-orange-500 px-4 text-xl drop-shadow-lg hover:bg-orange-600 lg:text-2xl"
          onClick={isFinishStep ? handleFinishButton : incrementGuideIndex}
        >
          {isFinishStep ? (
            <>{t("finish")}</>
          ) : (
            <>
              {t("next")} <FaArrowRight className="ml-3" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GuideInterface;
