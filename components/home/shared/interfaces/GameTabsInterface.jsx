import { useCallback } from "react";
import { FaBook } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";

import { gameStates, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

const GameTabButton = ({ icon: Icon, isActive, onClick }) => {
  return (
    <button
      className={`
                btn btn-square btn-lg rounded-2xl text-4xl
                ${
                  isActive
                    ? "border-none bg-orange-500 text-white"
                    : "border-2 border-orange-500 bg-white/50 text-orange-500"
                }
                hover:text-white hover:bg-orange-500 hover:border-none
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
  const { gameState, changeGameState } = useGame((state) => ({
    gameState: state.gameState,
    changeGameState: state.changeGameState,
  }));

  // Memoize active states to avoid unnecessary re-renders
  const isMenuActive = gameState === gameStates.MENU;
  const isLeaderboardActive = gameState === gameStates.LEADERBOARD;
  const isMaterialActive = gameState === gameStates.MATERIAL;

  // Button click handlers
  const handleTabButtonClick = useCallback((gameState) => {
    changeGameState(gameState);
  });

  return (
    <div className="flex w-full justify-evenly px-4 sm:mb-8 sm:ml-4 sm:h-full sm:w-auto sm:flex-col">
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
    </div>
  );
};

export default GameTabsInterface;
