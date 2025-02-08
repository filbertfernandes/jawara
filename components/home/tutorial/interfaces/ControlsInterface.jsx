import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import { tutorialStates, useTutorial } from "../stores/useTutorial";

import { skies, useGame } from "@/hooks/useGame";

const ControlButton = ({ children, className = "" }) => (
  <div
    className={`btn btn-square btn-sm bg-gray-800 text-lg text-white lg:btn-md lg:text-2xl ${className}`}
  >
    {children}
  </div>
);

const ControlsInterface = () => {
  const { setTutorialState } = useTutorial((state) => ({
    setTutorialState: state.setTutorialState,
  }));

  const { sky } = useGame((state) => ({
    sky: state.sky,
  }));

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fullscreen-backdrop pb-8">
      <div
        className={`absolute left-4 top-4 cursor-pointer text-3xl transition-all duration-200 ease-in-out sm:text-4xl ${
          sky === skies.NIGHT
            ? "text-white hover:text-gray-200"
            : "text-gray-500 hover:text-gray-600"
        }`}
        onClick={() => setTutorialState(tutorialStates.MENU)}
      >
        <GiExitDoor />
      </div>
      <div
        className={`flex size-full flex-col items-center justify-center gap-12 lg:gap-20 ${
          isVisible ? "animate-bounceIn" : "opacity-0"
        }`}
      >
        <div className="h1-bold text-orange-500">Controls</div>
        <div className="flex flex-col gap-2">
          <div className="h3-bold text-center text-gray-600">Move</div>
          <div className="flex items-center gap-1">
            <ControlButton>A</ControlButton>
            <ControlButton>W</ControlButton>
            <ControlButton>S</ControlButton>
            <ControlButton>D</ControlButton>
            <div className="h5-bold mx-3 text-center text-gray-600">Or</div>
            <ControlButton>
              <FaArrowLeft />
            </ControlButton>
            <ControlButton>
              <FaArrowUp />
            </ControlButton>
            <ControlButton>
              <FaArrowDown />
            </ControlButton>
            <ControlButton>
              <FaArrowRight />
            </ControlButton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h3-bold text-center text-gray-600">Jump</div>
          <ControlButton className="w-36 lg:w-60">Space</ControlButton>
        </div>
      </div>
    </div>
  );
};

export default ControlsInterface;
