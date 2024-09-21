import { useEffect } from "react"

// PHASES
import { phases } from "../useGame.jsx"

// SOUND MANAGER
import { SoundManager } from "../components/SoundManager.jsx"

export default function useBackgroundMusic(phase) {
  useEffect(() => {
    if (phase === phases.FREE) {
      SoundManager.stopBackgroundMusic("gamePhaseBackground")
      SoundManager.startBackgroundMusic("freePhaseBackground")
      return () => SoundManager.stopBackgroundMusic("freePhaseBackground")
    } else {
      SoundManager.stopBackgroundMusic("freePhaseBackground")
      SoundManager.startBackgroundMusic("gamePhaseBackground")
      return () => SoundManager.stopBackgroundMusic("gamePhaseBackground")
    }
  }, [phase])
}
