import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Font Awesome arrows

import BackButton from "../../shared/interfaces/BackButton";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

const GuideInterface = () => {
  const t = useTranslations("Home");

  const {
    resetGuideIndex,
    incrementGuideIndex,
    decrementGuideIndex,
    setTutorialState,
  } = useTutorial((state) => ({
    resetGuideIndex: state.resetGuideIndex,
    incrementGuideIndex: state.incrementGuideIndex,
    decrementGuideIndex: state.decrementGuideIndex,
    setTutorialState: state.setTutorialState,
  }));

  useEffect(() => {
    resetGuideIndex();
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 flex size-full justify-center p-10 font-bebas">
        <div className="absolute left-4 top-4">
          <BackButton onClick={() => setTutorialState(tutorialStates.MENU)} />
        </div>
        <div className="flex size-full items-end justify-center gap-60 text-4xl text-white">
          <button
            className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-gray-200"
            onClick={decrementGuideIndex}
          >
            <FaArrowLeft size={32} /> {t("previous")}
          </button>
          <button
            className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-gray-200"
            onClick={incrementGuideIndex}
          >
            {t("next")} <FaArrowRight size={32} />
          </button>
        </div>
      </div>
    </>
  );
};

export default GuideInterface;
