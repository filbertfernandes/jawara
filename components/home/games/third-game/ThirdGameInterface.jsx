import { useEffect } from "react"

import { gameStates, useGame } from "@/hooks/useGame.jsx"
import { useThirdGame } from "./stores/useThirdGame.jsx"

// IMPORT WORDS
import { words } from "./stores/constants.js"

// INTERFACES
import GameMenuInterface from "@/components/shared/interfaces/GameMenuInterface.jsx"

export const ThirdGameInterface = () => {
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const { startGame, score } = useThirdGame((state) => ({
    startGame: state.startGame,
    score: state.score,
  }))

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      // onFinish()
    }
  }, [gameState])

  return (
    <>
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
