import { DndContext } from "@dnd-kit/core";
import { addEffect } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import AnswerSelection from "./AnswerSelection.jsx";
import { words } from "./stores/constants.js";
import { useFirstGame } from "./stores/useFirstGame.jsx";
import TimePlusInterface from "./TimePlusInterface.jsx";

import GameMenuInterface from "@/components/home/shared/interfaces/GameMenuInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";
import { updateScore } from "@/lib/actions/score.action.js";
import { getUnseenAchievements } from "@/lib/actions/userAchievement.action.js";
import { SoundManager } from "@/lib/SoundManager.jsx";

export const FirstGameInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const [score, setScore] = useState(0);

  const time = useRef();
  const [penaltyTime, setPenaltyTime] = useState(0);

  const { gameState, setAchievementsPopup } = useGame((state) => ({
    gameState: state.gameState,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  const {
    startGame,
    mode,
    level,
    currentStage,
    setIsDragging,
    setDraggingItem,
    hoveredLockBox,
    incrementCorrectCount,
  } = useFirstGame((state) => ({
    startGame: state.startGame,
    mode: state.mode,
    level: state.level,
    currentStage: state.currentStage,
    setIsDragging: state.setIsDragging,
    setDraggingItem: state.setDraggingItem,
    hoveredLockBox: state.hoveredLockBox,
    incrementCorrectCount: state.incrementCorrectCount,
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
      elapsedTime += penaltyTime;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current)
        time.current.innerHTML = `${elapsedTime}<span class="ml-1 text-lg">s</span>`;

      // Update the score when the game is over
      if (state.gameState === gameStates.GAME_OVER) {
        setScore(elapsedTime);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, [penaltyTime]);

  useEffect(() => {
    if (gameState !== gameStates.GAME_OVER) {
      setPenaltyTime(0);
    }
  }, [gameState]);

  const handleDragStart = (event) => {
    const item = JSON.parse(event.active.id);

    SoundManager.playSoundPath(item.soundPath);
    setDraggingItem(item.name);
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    setDraggingItem(null);
    if (!level || hoveredLockBox === null) return;

    const item = JSON.parse(event.active.id);

    const levelInput = level[currentStage][hoveredLockBox]; // correct answer based on the hoveredLockBox index

    if (item.name === levelInput[mode].toLowerCase()) {
      if (!levelInput.isCorrect) {
        SoundManager.playSound("correctAnswer");
        incrementCorrectCount();
        levelInput.isCorrect = true;
      }
    } else {
      SoundManager.playSound("wrongAnswer");
      setPenaltyTime((prev) => prev + 5);
    }
  };

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
      {gameState === gameStates.GAME && (
        <>
          <TimePlusInterface penaltyTime={penaltyTime} />
        </>
      )}

      <div
        className={`${
          gameState !== gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        {/* Time Score */}
        <div
          ref={time}
          className="pointer-events-none absolute left-0 top-0 w-full select-none bg-gradient-to-r from-orange-500/80 to-orange-700/80 pt-1 text-center font-bebas text-3xl text-gray-100"
        >
          0.00<span className="ml-1 text-lg">s</span>
        </div>

        {/* Stage Info */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 select-none rounded-md bg-orange-600/80 px-4 py-1 font-questrial font-bold text-gray-100 shadow-md backdrop-blur-sm">
          {`${t("stage")} ${currentStage + 1} / 5`}
        </div>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {gameState === gameStates.GAME &&
          Array.isArray(level[currentStage]) && (
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end gap-10 pr-4 text-right font-questrial font-bold text-gray-100">
              {level[currentStage].map((item, index) => (
                <AnswerSelection key={index} item={item} mode={mode} />
              ))}
            </div>
          )}
      </DndContext>
    </>
  );
};
