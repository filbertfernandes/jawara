import { useEffect, useRef } from "react";

import { phases, useGame } from "./useGame.jsx";

import { SoundManager } from "@/lib/SoundManager.jsx";

export default function useBackgroundMusic() {
  const { phase, isMusicMuted } = useGame((state) => ({
    phase: state.phase,
    isMusicMuted: state.isMusicMuted,
  }));

  // Ref to track the currently playing music
  const currentMusicRef = useRef(null);

  useEffect(() => {
    if (isMusicMuted) {
      if (currentMusicRef.current) {
        SoundManager.stopBackgroundMusic(currentMusicRef.current);
        currentMusicRef.current = null;
      }
      return;
    }

    const isFreePhase =
      phase === phases.FREE ||
      phase === phases.TRANSLATION ||
      phase === phases.TUTORIAL ||
      phase === phases.AVATAR_CUSTOMIZATION;

    const newMusic = isFreePhase
      ? "freePhaseBackground"
      : "gamePhaseBackground";

    // Only switch music if it's different from the current playing one
    if (currentMusicRef.current !== newMusic) {
      if (currentMusicRef.current) {
        SoundManager.stopBackgroundMusic(currentMusicRef.current);
      }
      SoundManager.startBackgroundMusic(newMusic);
      currentMusicRef.current = newMusic;
    }

    return () => {
      if (isMusicMuted && currentMusicRef.current) {
        SoundManager.stopBackgroundMusic(currentMusicRef.current);
        currentMusicRef.current = null;
      }
    };
  }, [phase, isMusicMuted]);
}
