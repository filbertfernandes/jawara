import GameLeaderboardInterface from "./GameLeaderboardInterface.jsx";
import GameMaterialInterface from "./GameMaterialInterface.jsx";
import GameOverInterface from "./GameOverInterface.jsx";
import GameSelectInterface from "./GameSelectInterface.jsx";
import GameTabsInterface from "./GameTabsInterface.jsx";

import { gameStates, useGame } from "@/hooks/useGame.jsx";

const GameMenuInterface = ({ startGame, title, words, score }) => {
  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }));

  const interfaceComponentMap = {
    [gameStates.MENU]: (
      <GameSelectInterface startGame={startGame} title={title} />
    ),
    [gameStates.LEADERBOARD]: <GameLeaderboardInterface />,
    [gameStates.MATERIAL]: <GameMaterialInterface words={words} />,
    [gameStates.GAME_OVER]: (
      <GameOverInterface score={score} startGame={startGame} />
    ),
  };

  return (
    <div
      className={`dark-layout ${
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
  );
};

export default GameMenuInterface;
