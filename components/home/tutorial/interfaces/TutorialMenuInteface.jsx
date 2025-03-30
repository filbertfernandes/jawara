import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import ControlsInterface from "./ControlsInterface";
import CreditsInterface from "./CreditsInterface";
import GuideInterface from "./GuideInterface";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

import { phases, useGame } from "@/hooks/useGame";

const Button = ({ text, onClick, isOutlined = false }) => {
  return (
    <button
      className={`btn-template w-28 px-1 text-sm lg:w-52 lg:p-1.5 lg:text-3xl ${
        isOutlined
          ? "border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-gray-100"
          : "bg-orange-500 text-gray-100 hover:bg-orange-600"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TutorialMenuInterface = () => {
  const t = useTranslations("Home");

  const { changePhase } = useGame((state) => ({
    changePhase: state.changePhase,
  }));

  const { tutorialState, setTutorialState } = useTutorial((state) => ({
    tutorialState: state.tutorialState,
    setTutorialState: state.setTutorialState,
  }));

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        changePhase(phases.FREE);
        setTutorialState(tutorialStates.MENU);
      }
    };

    setIsVisible(true);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return tutorialState === tutorialStates.MENU ? (
    <div className="fullscreen-backdrop">
      <div
        className={`flex h-[90%] w-full flex-col items-center justify-center gap-6 ${
          isVisible ? "animate-bounceIn" : "opacity-0"
        }`}
      >
        <Button
          text={t("guide")}
          onClick={() => setTutorialState(tutorialStates.GUIDE)}
        />
        <Button
          text={t("controls")}
          onClick={() => setTutorialState(tutorialStates.CONTROLS)}
        />
        <Button
          text={t("credits")}
          onClick={() => setTutorialState(tutorialStates.CREDITS)}
        />
        <Button
          text={t("go_back")}
          onClick={() => changePhase(phases.FREE)}
          isOutlined
        />
      </div>
    </div>
  ) : tutorialState === tutorialStates.GUIDE ? (
    <>
      <GuideInterface />
    </>
  ) : tutorialState === tutorialStates.CONTROLS ? (
    <>
      <ControlsInterface />
    </>
  ) : (
    <>
      <CreditsInterface />
    </>
  );
};

export default TutorialMenuInterface;
