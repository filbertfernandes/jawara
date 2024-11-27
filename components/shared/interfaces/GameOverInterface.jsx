import { useCallback } from "react";

import { useGame, gameStates } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

// Reusable Button Component
const GameButton = ({ label, onClick }) => (
  <button
    className="w-28 rounded-lg bg-stone-800/50 p-1 text-sm font-semibold text-white shadow-md lg:w-52 lg:p-1.5 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
);

const GameOverInterface = ({ score, startGame }) => {
  const { changeGameState } = useGame((state) => ({
    changeGameState: state.changeGameState,
  }));

  // Memoized button click handlers
  const handleRetry = useCallback(() => {
    SoundManager.playSound("buttonClick");
    changeGameState(gameStates.GAME);
    startGame({ mode: "" });
  }, [changeGameState, startGame]);

  const handleBackToMenu = useCallback(() => {
    SoundManager.playSound("buttonClick");
    changeGameState(gameStates.MENU);
  }, [changeGameState]);

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault(); // Prevent the default space key action
    }
  };

  return (
    <div
      className="flex h-[90%] w-full flex-col items-center justify-center gap-6"
      onKeyDown={handleKeyDown}
    >
      <div className="text-center">
        <h1 className="h1-bold text-orange-500 drop-shadow-lg">
          CONGRATULATIONS!
        </h1>
        <h5 className="h5-bold text-orange-500 drop-shadow-lg">
          Your score is {score}
        </h5>
      </div>

      <GameButton label="Retry" onClick={handleRetry} />
      <GameButton label="Back to Menu" onClick={handleBackToMenu} />
    </div>
  );
};

export default GameOverInterface;
