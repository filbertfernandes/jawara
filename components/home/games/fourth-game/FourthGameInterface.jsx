import { addEffect } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { words } from "./stores/constants.js";
import { useFourthGame } from "./stores/useFourthGame.jsx";

import GameMenuInterface from "@/components/home/shared/interfaces/GameMenuInterface.jsx";
import ScorePlusInterface from "@/components/home/shared/interfaces/ScorePlusInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";
import { updateScore } from "@/lib/actions/score.action.js";
import { getUnseenAchievements } from "@/lib/actions/userAchievement.action.js";
import { SoundManager } from "@/lib/SoundManager.jsx";

export const FourthGameInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const time = useRef();

  const { gameState, setAchievementsPopup } = useGame((state) => ({
    gameState: state.gameState,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  const {
    startGame,
    mode,
    score,
    correctAnswersOrder,
    answerCount,
    stage,
    selectAnimal,
    incrementScore,
    decrementScore,
    incrementAnswerCount,
  } = useFourthGame((state) => ({
    startGame: state.startGame,
    mode: state.mode,
    score: state.score,
    correctAnswersOrder: state.correctAnswersOrder,
    answerCount: state.answerCount,
    stage: state.stage,
    selectAnimal: state.selectAnimal,
    incrementScore: state.incrementScore,
    decrementScore: state.decrementScore,
    incrementAnswerCount: state.incrementAnswerCount,
  }));

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      const onFinish = async () => {
        if (!session?.user?.id) return;

        try {
          const { isGetAchievements } = await updateScore({
            userId: session.user.id,
            game: "game4",
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

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      const fourthGameState = useFourthGame.getState();

      let elapsedTime = 0;

      if (state.gameState === gameStates.GAME) {
        elapsedTime = (Date.now() - fourthGameState.startTime) / 1000;
      }

      // Calculate remaining time
      const remainingTime = Math.max(
        0,
        fourthGameState.initialTimer - elapsedTime
      ).toFixed(0);

      fourthGameState.timer = remainingTime;

      if (time.current) {
        time.current.textContent = fourthGameState.timer;
      }

      // Check if time has run out
      if (fourthGameState.timer <= 0) {
        SoundManager.playSound("gameComplete");
        state.changeGameState(gameStates.GAME_OVER);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  const handleSelectAnimal = () => {
    if (correctAnswersOrder[answerCount] === selectAnimal) {
      SoundManager.playSound("correctAnswer");
      incrementScore();
    } else {
      SoundManager.playSound("wrongAnswer");
      decrementScore();
    }
    incrementAnswerCount();
  };

  return (
    <>
      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title={t("fourth_game_title")}
        words={words}
        score={score}
      />

      {/* IN GAME INTERFACE */}
      <div
        className={`${
          gameState !== gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 flex w-full flex-wrap justify-between bg-gradient-to-r from-orange-500/80 to-orange-700/80 px-2 pt-1 text-center font-bebas text-2xl text-white md:text-3xl lg:px-12 lg:text-4xl">
          <div>
            {t("time_left")}: <span ref={time}>100</span>
          </div>
          {answerCount < 8 && (
            <div>
              {stage ? stage[correctAnswersOrder[answerCount]].word[mode] : ""}
            </div>
          )}
          <div>
            {t("score")}: {score}
          </div>
        </div>

        {selectAnimal !== null && (
          <div className="absolute bottom-0 left-0 flex w-full flex-wrap justify-center pb-2 font-bebas text-xl text-white md:text-2xl lg:px-12 lg:text-3xl">
            <div
              className="btn-template bg-orange-500 px-8 drop-shadow-lg"
              onClick={handleSelectAnimal}
            >
              Select
            </div>
          </div>
        )}
      </div>

      {gameState === gameStates.GAME && (
        <>
          <ScorePlusInterface score={score} />
        </>
      )}
    </>
  );
};
