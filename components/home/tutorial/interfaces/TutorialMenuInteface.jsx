import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

  const { changePhase, isFirstTime } = useGame((state) => ({
    changePhase: state.changePhase,
    isFirstTime: state.isFirstTime,
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

  if (isFirstTime) return <GuideInterface isFirstTime />;

  if (tutorialState === tutorialStates.GUIDE)
    return <GuideInterface isFirstTime={false} />;

  return (
    <>
      <div className="fullscreen-backdrop h-screen flex-col pb-12">
        <div className="flex-1 overflow-hidden">
          {tutorialState === tutorialStates.MENU ? (
            <div
              className={`flex size-full flex-col items-center justify-center gap-6 ${
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
          ) : tutorialState === tutorialStates.CONTROLS ? (
            <ControlsInterface />
          ) : (
            <CreditsInterface />
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 text-center text-gray-300">
          <div className="text-sm font-light uppercase tracking-wider">
            {t("developed_by")}
          </div>
          <div className="text-3xl font-extrabold text-gray-100">
            Filbert Fernandes
          </div>
          <div className="mt-2 flex gap-6">
            <a
              href="https://github.com/filbertfernandes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 transition-all duration-200 hover:scale-110 hover:text-gray-100"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/filbert-fernandes-lienardy-52846a269/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 transition-all duration-200 hover:scale-110 hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/filbertfl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 transition-all duration-200 hover:scale-110 hover:text-white"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/filbert_fernandes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 transition-all duration-200 hover:scale-110 hover:text-white"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialMenuInterface;
