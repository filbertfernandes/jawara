import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { words } from "./stores/constants.js";
import { useSecondGame } from "./stores/useSecondGame.jsx";

import ExitDoor from "@/components/shared/interfaces/ExitDoor.jsx";
import GameMenuInterface from "@/components/shared/interfaces/GameMenuInterface.jsx";
import ScorePlusInterface from "@/components/shared/interfaces/ScorePlusInterface.jsx";
import { gameStates, useGame } from "@/hooks/useGame.jsx";
import useIsMobile from "@/hooks/useIsMobile.jsx";
import { updateScore } from "@/lib/actions/score.action";
import { SoundManager } from "@/lib/SoundManager.jsx";
// import { useAuth } from "@clerk/nextjs"

export const SecondGameInterface = () => {
  // const { userId } = useAuth()

  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }));

  const time = useRef();

  const {
    startGame,
    mode,
    score,
    correctAnswersOrder,
    correctCount,
    stage,
    setMobileLeft,
    setMobileRight,
    setMobilePush,
    setMobileJump,
  } = useSecondGame((state) => ({
    startGame: state.startGame,
    mode: state.mode,
    score: state.score,
    correctAnswersOrder: state.correctAnswersOrder,
    correctCount: state.correctCount,
    stage: state.stage,
    setMobileLeft: state.setMobileLeft,
    setMobileRight: state.setMobileRight,
    setMobilePush: state.setMobilePush,
    setMobileJump: state.setMobileJump,
  }));

  async function onFinish() {
    if (!userId) return;

    try {
      await updateScore({
        userId,
        game: "game2",
        gameMode: mode,
        score,
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      console.log("Finished update score");
    }
  }

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
      onFinish();
    }
  }, [gameState]);

  // MOVILE CONTROLS
  const isMobile = useIsMobile();

  return (
    <>
      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title="Colors"
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
            Time Left: <span ref={time}>100</span>
          </div>
          {correctCount < 5 && (
            <div>
              {stage ? stage[correctAnswersOrder[correctCount]][mode] : ""}
            </div>
          )}
          <div>Score: {score}</div>
        </div>
      </div>

      {gameState === gameStates.GAME && (
        <>
          <ScorePlusInterface score={score} />
          <ExitDoor />
        </>
      )}

      {/* MOBILE CONTROLLERS */}
      <div
        className={`absolute bottom-0 left-0 flex w-full flex-nowrap justify-between pt-1 text-center font-bebas text-2xl text-white md:text-3xl ${
          isMobile === false || gameState !== gameStates.GAME
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        <div className="flex w-2/5 justify-evenly sm:w-[30%]">
          <div
            className="m-2.5 w-full touch-manipulation select-none bg-black/30 px-1"
            onTouchStart={(e) => {
              e.preventDefault();
              setMobileLeft(true);
            }}
            onTouchEnd={() => setMobileLeft(false)}
          >
            Left
          </div>

          <div
            className="m-2.5 w-full touch-manipulation select-none bg-black/30 px-1"
            onTouchStart={(e) => {
              e.preventDefault();
              setMobileRight(true);
            }}
            onTouchEnd={() => setMobileRight(false)}
          >
            Right
          </div>
        </div>

        <div className="flex w-2/5 justify-evenly sm:w-[30%]">
          <div
            className="m-2.5 w-full touch-manipulation select-none bg-black/30 px-1"
            onTouchStart={(e) => {
              e.preventDefault();
              setMobilePush(true);
            }}
            onTouchEnd={() => setMobilePush(false)}
          >
            Push
          </div>

          <div
            className="m-2.5 w-full touch-manipulation select-none bg-black/30 px-1"
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
