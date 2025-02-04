import { useEffect } from "react";

import GuideInterface from "./GuideInterface";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

import { phases, useGame } from "@/hooks/useGame";

const Button = ({ text, onClick, isOutlined = false }) => {
  return (
    <button
      className={`btn-template w-28 px-1 text-sm lg:w-52 lg:p-1.5 lg:text-3xl ${
        isOutlined
          ? "border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
          : "bg-orange-500 text-white hover:bg-orange-600"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TutorialMenuInterface = () => {
  const { changePhase, gameState } = useGame((state) => ({
    changePhase: state.changePhase,
    gameState: state.gameState,
  }));

  const { tutorialState, setTutorialState } = useTutorial((state) => ({
    tutorialState: state.tutorialState,
    setTutorialState: state.setTutorialState,
  }));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        changePhase(phases.FREE);
        setTutorialState(tutorialStates.MENU);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  return tutorialState === tutorialStates.MENU ? (
    <div className="fullscreen-backdrop">
      <div className="flex h-[90%] w-full flex-col items-center justify-center gap-6">
        <Button
          text="Guide"
          onClick={() => setTutorialState(tutorialStates.GUIDE)}
        />
        <Button
          text="Credits"
          onClick={() => setTutorialState(tutorialStates.CREDITS)}
        />
        <Button
          text="Go Back"
          onClick={() => changePhase(phases.FREE)}
          isOutlined
        />
      </div>
    </div>
  ) : tutorialState === tutorialStates.GUIDE ? (
    <>
      <GuideInterface />
    </>
  ) : (
    <div className="fullscreen-backdrop">
      <div>CREDITS</div>
    </div>
  );
};

export default TutorialMenuInterface;
