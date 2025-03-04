import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import ControlButton from "../../shared/interfaces/ControlButton";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

const ControlsInterface = () => {
  const t = useTranslations("Home");

  const { setTutorialState } = useTutorial((state) => ({
    setTutorialState: state.setTutorialState,
  }));

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fullscreen-backdrop pb-8">
      <div
        className="absolute left-4 top-4 cursor-pointer text-3xl text-white transition-all duration-200 ease-in-out hover:text-gray-200 sm:text-4xl"
        onClick={() => setTutorialState(tutorialStates.MENU)}
      >
        <GiExitDoor />
      </div>
      <div
        className={`flex size-full flex-col items-center justify-center gap-12 lg:gap-20 ${
          isVisible ? "animate-bounceIn" : "opacity-0"
        }`}
      >
        <div className="h1-bold text-white">{t("controls")}</div>
        <div className="flex flex-col gap-2">
          <div className="h3-bold text-center text-white">
            {t("language") === "english" ? "Move" : "Jalan"}
          </div>
          <div className="flex items-center gap-1">
            <ControlButton>A</ControlButton>
            <ControlButton>W</ControlButton>
            <ControlButton>S</ControlButton>
            <ControlButton>D</ControlButton>
            <div className="h5-bold mx-3 text-center text-white">
              {t("language") === "english" ? "Or" : "Atau"}
            </div>
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
          <div className="h3-bold text-center text-white">
            {t("language") === "english" ? "Jump" : "Lompat"}
          </div>
          <ControlButton className="w-36 lg:w-60">
            {t("language") === "english" ? "Space" : "Spasi"}
          </ControlButton>
        </div>
      </div>
    </div>
  );
};

export default ControlsInterface;
