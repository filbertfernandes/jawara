import { useEffect } from "react";

import BackButton from "./BackButton.jsx";
import GameLeaderboardInterface from "./GameLeaderboardInterface.jsx";
import GameMaterialInterface from "./GameMaterialInterface.jsx";
import GameOverInterface from "./GameOverInterface.jsx";
import GameSelectInterface from "./GameSelectInterface.jsx";
import GameTabsInterface from "./GameTabsInterface.jsx";
import GameTutorialInterface from "./GameTutorialInterface.jsx";

import { gameStates, phases, useGame } from "@/hooks/useGame.jsx";

const GameMenuInterface = ({ startGame, title, words, score }) => {
  const { gameState, changeGameState, changePhase } = useGame((state) => ({
    gameState: state.gameState,
    changeGameState: state.changeGameState,
    changePhase: state.changePhase,
  }));

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.code === "Escape" &&
        gameState !== gameStates.GAME &&
        gameStates !== gameStates.GAME_OVER
      ) {
        changePhase(phases.FREE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  const interfaceComponentMap = {
    [gameStates.MENU]: (
      <GameSelectInterface startGame={startGame} title={title} />
    ),
    [gameStates.LEADERBOARD]: <GameLeaderboardInterface />,
    [gameStates.MATERIAL]: <GameMaterialInterface words={words} />,
    [gameStates.GAME_TUTORIAL]: <GameTutorialInterface />,
    [gameStates.GAME_OVER]: (
      <GameOverInterface score={score} startGame={startGame} />
    ),
  };

  return (
    <>
      <div
        className={`fullscreen-backdrop ${
          gameState === gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        {gameState !== gameStates.GAME_OVER ? (
          <div className="flex size-full flex-col items-center sm:flex-row md:w-[90%] lg:w-4/5">
            <GameTabsInterface />
            {interfaceComponentMap[gameState]}
          </div>
        ) : (
          interfaceComponentMap[gameState]
        )}
      </div>
      {gameState === gameStates.GAME && (
        <div className="absolute left-0 top-0 flex h-full cursor-pointer items-center p-2 text-center text-3xl sm:text-4xl md:p-4">
          <BackButton onClick={() => changeGameState(gameStates.MENU)} />
        </div>
      )}
    </>
  );
};

export default GameMenuInterface;
