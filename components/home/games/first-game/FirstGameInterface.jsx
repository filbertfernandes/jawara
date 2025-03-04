import { addEffect } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { words } from "./stores/constants.js";
import { useFirstGame } from "./stores/useFirstGame.jsx";

import ExitDoor from "@/components/home/shared/interfaces/ExitDoor.jsx";
import GameMenuInterface from "@/components/home/shared/interfaces/GameMenuInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";

export const FirstGameInterface = () => {
  const t = useTranslations("Home");

  const [score, setScore] = useState(0);

  const time = useRef();

  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }));

  const { startGame } = useFirstGame((state) => ({
    startGame: state.startGame,
  }));

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      const firstGameState = useFirstGame.getState();

      let elapsedTime = 0;

      if (state.gameState === gameStates.GAME)
        elapsedTime = Date.now() - firstGameState.startTime;
      else if (state.gameState === gameStates.GAME_OVER)
        elapsedTime = firstGameState.endTime - firstGameState.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;

      // Update the score when the game is over
      if (state.gameState === gameStates.GAME_OVER) setScore(elapsedTime);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <>
      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title={t("first_game_title")}
        words={words}
        score={score}
      />

      {/* IN GAME INTERFACE */}
      <div
        className={`${
          gameState !== gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div
          ref={time}
          className="pointer-events-none absolute left-0 top-0 w-full bg-gradient-to-r from-orange-500/80 to-orange-700/80 pt-1 text-center font-bebas text-3xl text-white"
        >
          0.00
        </div>
      </div>

      {gameState === gameStates.GAME && (
        <>
          <ExitDoor />
        </>
      )}
    </>
  );
};
