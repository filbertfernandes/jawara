import { useEffect, useRef, useState } from "react"
import { addEffect } from "@react-three/fiber"
import { useFirstGame } from "./stores/useFirstGame.jsx"
import { gameStates, useGame } from "@/hooks/useGame.jsx"
import { words } from "./stores/constants.js"
import GameMenuInterface from "@/components/shared/interfaces/GameMenuInterface.jsx"
import ExitDoor from "@/components/shared/interfaces/ExitDoor.jsx"

export const FirstGameInterface = () => {
  const [score, setScore] = useState(0)

  const time = useRef()

  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const { startGame } = useFirstGame((state) => ({
    startGame: state.startGame,
  }))

  // SCORE
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()
      const firstGameState = useFirstGame.getState()

      let elapsedTime = 0

      if (state.gameState === gameStates.GAME)
        elapsedTime = Date.now() - firstGameState.startTime
      else if (state.gameState === gameStates.GAME_OVER)
        elapsedTime = firstGameState.endTime - firstGameState.startTime

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      if (time.current) time.current.textContent = elapsedTime

      // Update the score when the game is over
      if (state.gameState === gameStates.GAME_OVER) setScore(elapsedTime)
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  return (
    <>
      {/* GAME MENU INTERFACE */}
      <GameMenuInterface
        startGame={startGame}
        title="Body Parts"
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
          className="pointer-events-none absolute left-0 top-0 w-full bg-black/30 pt-1 text-center font-bebas text-3xl text-white"
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
  )
}
