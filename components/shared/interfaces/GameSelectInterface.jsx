import { useEffect, useState, useCallback } from "react"
import { useGame, phases, gameStates } from "@/hooks/useGame.jsx"

// SOUND MANAGER
import { SoundManager } from "../utils/SoundManager.jsx"

const GameSelectButton = ({ label, onClick }) => (
  <button
    className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
)

const GameSelectInterface = ({ startGame, title }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Trigger the popup effect after the component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // MAIN GAME STATE
  const { changePhase, changeGameState } = useGame((state) => ({
    changePhase: state.changePhase,
    changeGameState: state.changeGameState,
  }))

  // Memoized button click handlers
  const handleNgokoClick = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.GAME)
    startGame({ mode: "ngoko" })
  }, [changeGameState, startGame])

  const handleMadyaClick = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.GAME)
    startGame({ mode: "madya" })
  }, [changeGameState, startGame])

  const handleAlusClick = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.GAME)
    startGame({ mode: "alus" })
  }, [changeGameState, startGame])

  const handleBackClick = useCallback(() => {
    SoundManager.playSound("buttonClick")
    changeGameState(gameStates.MENU)
    changePhase(phases.FREE)
  }, [changeGameState, changePhase])

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault() // Prevent the default space key action
    }
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-6 w-full h-[75%] sm:h-full sm:pb-8 lg:gap-10 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
      onKeyDown={handleKeyDown}
    >
      <h1 className="h1-bold text-sky-400 drop-shadow-lg">{title}</h1>

      <GameSelectButton label="Ngoko" onClick={handleNgokoClick} />
      <GameSelectButton label="Krama Madya" onClick={handleMadyaClick} />
      <GameSelectButton label="Krama Alus" onClick={handleAlusClick} />
      <GameSelectButton label="Back to Home" onClick={handleBackClick} />
    </div>
  )
}

export default GameSelectInterface
