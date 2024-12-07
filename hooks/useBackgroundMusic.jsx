import { useEffect } from "react";

import { phases, useGame } from "./useGame.jsx";

import { SoundManager } from "@/lib/SoundManager.jsx";

export default function useBackgroundMusic(phase) {
  const { isMusicMuted } = useGame((state) => ({
    isMusicMuted: state.isMusicMuted,
  }));

  useEffect(() => {
    if (isMusicMuted) {
      SoundManager.stopBackgroundMusic("gamePhaseBackground");
      SoundManager.stopBackgroundMusic("freePhaseBackground");
      return;
    }

    if (phase === phases.FREE) {
      SoundManager.stopBackgroundMusic("gamePhaseBackground");
      SoundManager.startBackgroundMusic("freePhaseBackground");
      return () => SoundManager.stopBackgroundMusic("freePhaseBackground");
    } else {
      SoundManager.stopBackgroundMusic("freePhaseBackground");
      SoundManager.startBackgroundMusic("gamePhaseBackground");
      return () => SoundManager.stopBackgroundMusic("gamePhaseBackground");
    }
  }, [phase, isMusicMuted]);
}
