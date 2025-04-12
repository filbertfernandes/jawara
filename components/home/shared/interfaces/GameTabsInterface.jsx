import { FaBook, FaQuestion } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoGameController, IoHomeSharp } from "react-icons/io5";

import { gameStates, phases, useGame } from "@/hooks/useGame.jsx";

const GameTabButton = ({ icon: Icon, isActive, onClick }) => {
  return (
    <button
      className={`
                btn btn-square btn-md rounded-2xl text-2xl lg:btn-lg lg:text-4xl
                ${
                  isActive
                    ? "border-none bg-orange-500 text-gray-100"
                    : "border-2 border-orange-500 bg-white text-orange-500"
                }
                hover:text-gray-100 hover:bg-orange-500 hover:border-none
                transition-all duration-300 ease-in-out
            `}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

const GameTabsInterface = () => {
  // GAME STATE
  const { changePhase, gameState, changeGameState } = useGame((state) => ({
    changePhase: state.changePhase,
    gameState: state.gameState,
    changeGameState: state.changeGameState,
  }));

  // Memoize active states to avoid unnecessary re-renders
  const isMenuActive = gameState === gameStates.MENU;
  const isLeaderboardActive = gameState === gameStates.LEADERBOARD;
  const isMaterialActive = gameState === gameStates.MATERIAL;
  const isTutorialActive = gameState === gameStates.GAME_TUTORIAL;

  // Button click handlers
  const handleTabButtonClick = (gameState) => {
    changeGameState(gameState);
  };

  return (
    <div className="flex w-full justify-evenly px-4 sm:mb-8 sm:ml-4 sm:h-full sm:w-auto sm:flex-col">
      <GameTabButton
        icon={IoHomeSharp}
        isActive={false}
        onClick={() => changePhase(phases.FREE)}
      />
      <GameTabButton
        icon={IoGameController}
        isActive={isMenuActive}
        onClick={() => handleTabButtonClick(gameStates.MENU)}
      />
      <GameTabButton
        icon={FaRankingStar}
        isActive={isLeaderboardActive}
        onClick={() => handleTabButtonClick(gameStates.LEADERBOARD)}
      />
      <GameTabButton
        icon={FaBook}
        isActive={isMaterialActive}
        onClick={() => handleTabButtonClick(gameStates.MATERIAL)}
      />
      <GameTabButton
        icon={FaQuestion}
        isActive={isTutorialActive}
        onClick={() => handleTabButtonClick(gameStates.GAME_TUTORIAL)}
      />
    </div>
  );
};

export default GameTabsInterface;
