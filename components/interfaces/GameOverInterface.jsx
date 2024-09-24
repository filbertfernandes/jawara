import { useCallback } from "react"
import { useGame, gameStates } from "@/hooks/useGame.jsx"

// SOUND MANAGER
import { SoundManager } from "../SoundManager.jsx"

// Reusable Button Component
const GameButton = ({ label, onClick }) => (
  <button
    className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
)

const GameOverInterface = ({ score, startGame }) => {
  const { changeGameState } = useGame((state) => ({
    changeGameState: state.changeGameState,
  }))

  // Memoized button click handlers
  const handleRetry = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.GAME)
    startGame({ mode: "" })
  }, [changeGameState, startGame])

  const handleBackToMenu = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.MENU)
  }, [changeGameState])

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault() // Prevent the default space key action
    }
  }

  return (
    <div
      className="flex flex-col justify-center items-center gap-6 w-full h-[90%]"
      onKeyDown={handleKeyDown}
    >
      <div className="text-center">
        <h1 className="h1-bold text-sky-400 drop-shadow-lg">
          CONGRATULATIONS!
        </h1>
        <h5 className="h5-bold text-sky-400 drop-shadow-lg">
          Your score is {score}
        </h5>
      </div>

      <GameButton label="Retry" onClick={handleRetry} />
      <GameButton label="Back to Menu" onClick={handleBackToMenu} />
    </div>
  )
}

export default GameOverInterface
