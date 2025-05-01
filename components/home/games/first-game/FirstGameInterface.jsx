import { addEffect } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { words } from "./stores/constants.js";
import { useFirstGame } from "./stores/useFirstGame.jsx";

import GameMenuInterface from "@/components/home/shared/interfaces/GameMenuInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";
import { updateScore } from "@/lib/actions/score.action.js";
import { getUnseenAchievements } from "@/lib/actions/userAchievement.action.js";

export const FirstGameInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const [score, setScore] = useState(0);

  const time = useRef();

  const { gameState, setAchievementsPopup } = useGame((state) => ({
    gameState: state.gameState,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  const { startGame, mode, level, currentStage } = useFirstGame((state) => ({
    startGame: state.startGame,
    mode: state.mode,
    level: state.level,
    currentStage: state.currentStage,
  }));

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      const onFinish = async () => {
        if (!session?.user?.id) return;

        try {
          const { isGetAchievements } = await updateScore({
            userId: session.user.id,
            game: "game1",
            gameMode: mode,
            score,
          });

          if (isGetAchievements) {
            const { data } = await getUnseenAchievements(session.user.id);
            setAchievementsPopup(data);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      onFinish();
    }
  }, [score]);

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
        {/* Stage Info */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-orange-600/80 px-4 py-1 font-questrial font-bold text-white shadow-md backdrop-blur-sm">
          {`${t("stage")} ${currentStage + 1} / 5`}
        </div>

        <div
          ref={time}
          className="pointer-events-none absolute left-0 top-0 w-full bg-gradient-to-r from-orange-500/80 to-orange-700/80 pt-1 text-center font-bebas text-3xl text-gray-100"
        >
          0.00
        </div>
      </div>

      {gameState === gameStates.GAME && Array.isArray(level[currentStage]) && (
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end gap-2 pr-4 text-right font-questrial font-bold text-gray-100">
          {level[currentStage].map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-orange-600/80 px-3 py-1 shadow-lg backdrop-blur"
            >
              {`${idx + 1}. ${
                item[t("language")].charAt(0).toUpperCase() +
                item[t("language")].slice(1)
              }`}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
