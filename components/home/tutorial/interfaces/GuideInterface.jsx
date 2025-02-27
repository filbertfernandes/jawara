import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Font Awesome arrows
import { GiExitDoor } from "react-icons/gi";

import { tutorialStates, useTutorial } from "../stores/useTutorial";

const GuideInterface = () => {
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
        <div className="absolute left-0 top-0 flex h-full cursor-pointer items-center p-2 text-center font-bebas text-3xl sm:text-4xl md:p-4">
          <div>
            <GiExitDoor
              className="cursor-pointer text-white transition-all duration-100 ease-in-out hover:text-gray-200"
              onClick={() => {
                setTutorialState(tutorialStates.MENU);
              }}
            />
          </div>
        </div>
        <div className="flex size-full items-end justify-center gap-60 text-4xl text-white">
          <button
            className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-gray-200"
            onClick={decrementGuideIndex}
          >
            <FaArrowLeft size={32} /> Prev
          </button>
          <button
            className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-gray-200"
            onClick={incrementGuideIndex}
          >
            Next <FaArrowRight size={32} />
          </button>
        </div>
      </div>
    </>
  );
};

export default GuideInterface;
