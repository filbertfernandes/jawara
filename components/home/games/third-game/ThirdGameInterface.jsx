import { useEffect, useRef } from "react"

import { gameStates, useGame } from "@/hooks/useGame.jsx"
import { useThirdGame } from "./stores/useThirdGame.jsx"
import ScorePlusInterface from "./ScorePlusInterface.jsx"
import { SoundManager } from "@/lib/SoundManager.jsx"

// IMPORT WORDS
import { words } from "./stores/constants.js"

// INTERFACES
import GameMenuInterface from "@/components/shared/interfaces/GameMenuInterface.jsx"
import { addEffect } from "@react-three/fiber"

export const ThirdGameInterface = () => {
  const time = useRef()

  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const { startGame, mode, score, correctAnswersOrder, answerCount, stage } =
    useThirdGame((state) => ({
      startGame: state.startGame,
      mode: state.mode,
      score: state.score,
      correctAnswersOrder: state.correctAnswersOrder,
      answerCount: state.answerCount,
      stage: state.stage,
    }))

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      // onFinish()
    }
  }, [gameState])

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()
      const thirdGameState = useThirdGame.getState()

      let elapsedTime = 0

      if (state.gameState === gameStates.GAME) {
        elapsedTime = (Date.now() - thirdGameState.startTime) / 1000
      }

      // Calculate remaining time
      const remainingTime = Math.max(
        0,
        thirdGameState.initialTimer - elapsedTime
      ).toFixed(0)

      thirdGameState.timer = remainingTime

      if (time.current) {
        time.current.textContent = thirdGameState.timer
      }

      // Check if time has run out
      if (thirdGameState.timer <= 0) {
        SoundManager.playSound("gameComplete")
        state.changeGameState(gameStates.GAME_OVER)
      }
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  return (
    <>
      {/* IN GAME INTERFACE */}
      <div
        className={`${
          gameState !== gameStates.GAME ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 flex w-full flex-wrap justify-between bg-black/30 px-2 pt-1 text-center font-bebas text-2xl text-white md:text-3xl lg:px-12 lg:text-4xl">
          <div>
            Time Left: <span ref={time}>100</span>
          </div>
          {answerCount < 10 && (
            <div>
              {stage ? stage[correctAnswersOrder[answerCount]].word[mode] : ""}
            </div>
          )}
          <div>Score: {score}</div>
        </div>
      </div>

      {gameState === gameStates.GAME && <ScorePlusInterface />}

      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title="Numbers"
        words={words}
        score={score}
      />
    </>
  )
}
