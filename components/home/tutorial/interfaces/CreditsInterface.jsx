import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import BackButton from "../../shared/interfaces/BackButton";
import {
  inspirationsData,
  modelsData,
  musicData,
  soundEffectsData,
} from "../stores/data";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

const List = ({ title, data, isMusic = false }) => (
  <div className="flex w-full flex-col">
    <h5 className="h5-bold">{title}</h5>
    <ul className="list-disc pl-5 font-questrial lg:text-xl">
      {data.map((item, index) => (
        <li key={index} className="mb-2">
          {isMusic ? (
            <>
              <div>
                Track:{" "}
                <span className="font-bold">
                  {item.author} - {item.name}
                </span>
              </div>
              <div>
                Music provided by{" "}
                <span className="font-bold">{item.author}</span>
              </div>
              <div>
                Watch:{" "}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-400 hover:underline"
                >
                  YouTube
                </a>
              </div>
            </>
          ) : (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {item.name} by <span className="font-bold">{item.author}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const CreditsInterface = () => {
  const t = useTranslations("Home");

  const { setTutorialState } = useTutorial((state) => ({
    setTutorialState: state.setTutorialState,
  }));

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fullscreen-backdrop">
      <div className="absolute left-4 top-4">
        <BackButton onClick={() => setTutorialState(tutorialStates.MENU)} />
      </div>
      <div
        className={`flex size-full flex-col items-center justify-center ${
          isVisible ? "animate-bounceIn" : "opacity-0"
        }`}
      >
        <div className="flex size-[90%] flex-col items-center gap-6 overflow-scroll rounded-3xl p-4 text-gray-100 lg:w-3/4 lg:p-8 xl:w-1/2 xl:p-10">
          <div className="h1-bold">{t("special_thanks_to")}</div>

          {/* Reusable list components */}
          <List title="3D Models" data={modelsData} />
          <List title="Music" data={musicData} isMusic={true} />
          <List title="Sound Effects" data={soundEffectsData} />
          <List title="Inspirations" data={inspirationsData} />
        </div>
      </div>
    </div>
  );
};

export default CreditsInterface;
