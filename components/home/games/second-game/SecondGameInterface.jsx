import { addEffect } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { words } from "./stores/constants.js";
import { useSecondGame } from "./stores/useSecondGame.jsx";

import GameMenuInterface from "@/components/home/shared/interfaces/GameMenuInterface.jsx";
import ScorePlusInterface from "@/components/home/shared/interfaces/ScorePlusInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";
import { updateScore } from "@/lib/actions/score.action";
import { getUnseenAchievements } from "@/lib/actions/userAchievement.action.js";
import { SoundManager } from "@/lib/SoundManager.jsx";

export const SecondGameInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const isMobile = useMediaQuery({ maxWidth: 900 });

  const { gameState, setAchievementsPopup } = useGame((state) => ({
    gameState: state.gameState,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  const time = useRef();

  const {
    startGame,
    mode,
    score,
    correctAnswersOrder,
    correctCount,
    stage,
    setMobilePush,
    setMobileJump,
  } = useSecondGame((state) => ({
    startGame: state.startGame,
    mode: state.mode,
    score: state.score,
    correctAnswersOrder: state.correctAnswersOrder,
    correctCount: state.correctCount,
    stage: state.stage,
    setMobilePush: state.setMobilePush,
    setMobileJump: state.setMobileJump,
  }));

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      const secondGameState = useSecondGame.getState();

      let elapsedTime = 0;

      if (state.gameState === gameStates.GAME) {
        elapsedTime = (Date.now() - secondGameState.startTime) / 1000;
      }

      // Calculate remaining time
      const remainingTime = Math.max(
        0,
        secondGameState.initialTimer - elapsedTime
      ).toFixed(0);

      secondGameState.timer = remainingTime;

      if (time.current) {
        time.current.textContent = secondGameState.timer;
      }

      // Check if time has run out
      if (secondGameState.timer <= 0) {
        SoundManager.playSound("gameComplete");
        state.changeGameState(gameStates.GAME_OVER);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      const onFinish = async () => {
        if (!session?.user?.id) return;

        try {
          const { isGetAchievements } = await updateScore({
            userId: session.user.id,
            game: "game2",
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
  }, [gameState]);

  useEffect(() => {
    if (correctCount < 5 && stage !== null && gameState === gameStates.GAME) {
      SoundManager.playSoundPath(
        stage[correctAnswersOrder[correctCount]][`${mode}Sound`]
      );
    }
  }, [correctCount, stage]);

  return (
    <>
      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title={t("second_game_title")}
        words={words}
        score={score}
      />

      {/* IN GAME INTERFACE */}
      <div
        className={`${
          gameState !== gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 flex w-full flex-wrap justify-between bg-gradient-to-r from-orange-500/80 to-orange-700/80 px-2 pt-1 text-center font-bebas text-2xl text-gray-100 md:text-3xl lg:px-12 lg:text-4xl">
          <div>
            {t("time_left")}: <span ref={time}>100</span>
          </div>
          {correctCount < 5 && (
            <div>
              {stage ? stage[correctAnswersOrder[correctCount]][mode] : ""}
            </div>
          )}
          <div>
            {t("score")}: {score}
          </div>
        </div>
      </div>

      {gameState === gameStates.GAME && (
        <>
          <ScorePlusInterface score={score} />
        </>
      )}

      {/* MOBILE CONTROLLERS */}
      <div
        className={`absolute bottom-0 right-0 flex w-1/2 flex-nowrap pt-1 text-center font-bebas text-2xl text-gray-100 md:text-3xl ${
          isMobile === false || gameState !== gameStates.GAME
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        <div className="flex w-full flex-col items-end gap-6 px-10 pb-12 sm:pb-6">
          <div
            className="w-full touch-manipulation select-none bg-white/25 sm:w-1/2"
            onTouchStart={(e) => {
              e.preventDefault();
              setMobilePush(true);
            }}
            onTouchEnd={() => setMobilePush(false)}
          >
            Push
          </div>

          <div
            className="w-full touch-manipulation select-none bg-white/25 sm:w-1/2"
            onTouchStart={(e) => {
              e.preventDefault();
              setMobileJump(true);
            }}
            onTouchEnd={() => setMobileJump(false)}
          >
            Jump
          </div>
        </div>
      </div>
    </>
  );
};
