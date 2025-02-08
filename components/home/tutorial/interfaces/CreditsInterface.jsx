import { useEffect, useState } from "react";
import { GiExitDoor } from "react-icons/gi";

import { modelsData, musicData, soundEffectsData } from "../stores/data";
import { tutorialStates, useTutorial } from "../stores/useTutorial";

import { skies, useGame } from "@/hooks/useGame";

const List = ({ title, data }) => (
  <div className="flex w-full flex-col">
    <h5 className="h5-bold">{title}</h5>
    <ul className="list-disc pl-5 font-questrial lg:text-xl ">
      {data.map((item, index) => (
        <li key={index}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {item.name} by <span className="font-bold">{item.author}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const CreditsInterface = () => {
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
    <>
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
          className={`flex size-full flex-col items-center justify-center ${
            isVisible ? "animate-bounceIn" : "opacity-0"
          }`}
        >
          <div className="flex size-[90%] flex-col items-center gap-6 overflow-scroll rounded-3xl bg-gradient-to-r from-orange-500 to-orange-700 p-4 text-white lg:w-3/4 lg:p-8 xl:w-1/2 xl:p-10">
            <div className="h1-bold">Special Thanks To</div>

            {/* Reusable list components */}
            <List title="3D Models" data={modelsData} />
            <List title="Music" data={musicData} />
            <List title="Sound Effects" data={soundEffectsData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditsInterface;
