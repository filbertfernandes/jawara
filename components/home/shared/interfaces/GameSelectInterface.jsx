import { useEffect, useState, useCallback } from "react";

import { useGame, phases, gameStates } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

const GameSelectButton = ({ label, onClick }) => (
  <button
    className="btn-template w-28 bg-orange-500 px-1 text-sm text-white hover:bg-orange-600 lg:w-52 lg:p-1.5 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
);

const OtherButton = ({ label, onClick }) => (
  <button
    className="btn-template w-28 border-2 border-orange-500 bg-white px-1 text-sm text-orange-500 hover:bg-orange-500 hover:text-white lg:w-52 lg:p-1.5 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
);

const GameSelectInterface = ({ startGame, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the popup effect after the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // MAIN GAME STATE
  const { changePhase, changeGameState } = useGame((state) => ({
    changePhase: state.changePhase,
    changeGameState: state.changeGameState,
  }));

  // Memoized button click handlers
  const handleButtonClick = useCallback(
    (mode) => {
      changeGameState(gameStates.GAME);
      startGame({ mode });
    },
    [changeGameState, startGame]
  );

  const handleBackClick = useCallback(() => {
    changeGameState(gameStates.MENU);
    changePhase(phases.FREE);
  }, [changeGameState, changePhase]);

  const handleKeyDown = (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault(); // Prevent the default space key action
    }
  };

  return (
    <div
      className={`flex h-3/4 w-full flex-col items-center justify-center gap-6 sm:h-full sm:pb-8 lg:gap-10 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
      onKeyDown={handleKeyDown}
    >
      <h1 className="h1-bold text-orange-500 drop-shadow-lg">{title}</h1>

      <div className="flex gap-6">
        <GameSelectButton
          label="Ngoko"
          onClick={() => handleButtonClick("ngoko")}
        />
        <GameSelectButton
          label="Krama Madya"
          onClick={() => handleButtonClick("madya")}
        />
        <GameSelectButton
          label="Krama Alus"
          onClick={() => handleButtonClick("alus")}
        />
      </div>

      <div className="mt-10 flex gap-6">
        <OtherButton
          label="How To Play"
          onClick={() => console.log("Pressed")}
        />
        <OtherButton label="Go Back" onClick={handleBackClick} />
      </div>
    </div>
  );
};

export default GameSelectInterface;
