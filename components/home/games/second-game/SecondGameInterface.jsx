import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useGame } from "@/hooks/useGame.jsx"
import { useSecondGame } from "./stores/useSecondGame.jsx"
import useIsMobile from "@/hooks/useIsMobile.jsx"

// IMPORT WORDS
import { words } from "./stores/constants.js"

// INTERFACES
import GameMenuInterface from "@/components/shared/interfaces/GameMenuInterface.jsx"

// SOUND MANAGER
import { SoundManager } from "@/lib/SoundManager.jsx"
import ScorePlusInterface from "./ScorePlusInterface.jsx"

// DB ACTIONS
import { updateScore } from "@/lib/actions/score.action"

export const SecondGameInterface = () => {
  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const time = useRef()

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
  }))

  async function onFinish() {
    try {
      await updateScore({
        userId: "clerk_12345",
        game: "game2",
        gameMode: mode,
        score: score,
      })
    } catch (error) {
      console.log(error)
      throw error
    } finally {
    }
  }

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()
      const secondGameState = useSecondGame.getState()

      let elapsedTime = 0

      if (state.gameState === gameStates.GAME) {
        elapsedTime = (Date.now() - secondGameState.startTime) / 1000
      }

      // Calculate remaining time
      const remainingTime = Math.max(
        0,
        secondGameState.initialTimer - elapsedTime
      ).toFixed(0)

      secondGameState.timer = remainingTime

      if (time.current) {
        time.current.textContent = secondGameState.timer
      }

      // Check if time has run out
      if (secondGameState.timer <= 0) {
        SoundManager.playSound("gameComplete")
        state.changeGameState(gameStates.GAME_OVER)
      }
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      onFinish()
    }
  }, [gameState])

  // MOVILE CONTROLS
  const isMobile = useIsMobile()

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
          gameState !== gameStates.GAME ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <div className="flex justify-between flex-wrap font-bebas text-2xl text-white bg-black/30 pt-1 px-2 text-center pointer-events-none absolute top-0 left-0 w-full md:text-3xl lg:text-4xl lg:px-12">
          <div>
            Time Left: <span ref={time}>120</span>
          </div>
          {correctCount < 5 && (
            <div>
              {stage ? stage[correctAnswersOrder[correctCount]][mode] : ""}
            </div>
          )}
          <div>Score: {score}</div>
        </div>
      </div>

      {gameState === gameStates.GAME && <ScorePlusInterface />}

      {/* MOBILE CONTROLLERS */}
      <div
        className={`flex justify-between flex-nowrap font-bebas text-white text-2xl pt-1 text-center absolute bottom-0 left-0 w-full md:text-3xl ${
          isMobile === false || gameState !== gameStates.GAME
            ? "opacity-0 pointer-events-none"
            : ""
        }`}
      >
        <div className="flex justify-evenly w-[40%] sm:w-[30%]">
          <div
            className="bg-black/30 w-full px-1 m-2.5 select-none touch-manipulation"
            onTouchStart={(e) => {
              e.preventDefault()
              setMobileLeft(true)
            }}
            onTouchEnd={() => setMobileLeft(false)}
          >
            Left
          </div>

          <div
            className="bg-black/30 w-full px-1 m-2.5 select-none touch-manipulation"
            onTouchStart={(e) => {
              e.preventDefault()
              setMobileRight(true)
            }}
            onTouchEnd={() => setMobileRight(false)}
          >
            Right
          </div>
        </div>

        <div className="flex justify-evenly w-[40%] sm:w-[30%]">
          <div
            className="bg-black/30 w-full px-1 m-2.5 select-none touch-manipulation"
            onTouchStart={(e) => {
              e.preventDefault()
              setMobilePush(true)
            }}
            onTouchEnd={() => setMobilePush(false)}
          >
            Push
          </div>

          <div
            className="bg-black/30 w-full px-1 m-2.5 select-none touch-manipulation"
            onTouchStart={(e) => {
              e.preventDefault()
              setMobileJump(true)
            }}
            onTouchEnd={() => setMobileJump(false)}
          >
            Jump
          </div>
        </div>
      </div>
    </>
  )
}
