import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { PLAYER_INITIAL_POSITION } from "@/components/home/shared/player/PlayerController";
import { SoundManager } from "@/lib/SoundManager";

export const phases = {
  FREE: "FREE",
  TRANSLATION: "TRANSLATION",
  FIRST_GAME: "FIRST_GAME",
  SECOND_GAME: "SECOND_GAME",
  THIRD_GAME: "THIRD_GAME",
  FOURTH_GAME: "FOURTH_GAME",
  TUTORIAL: "TUTORIAL",
  AVATAR_CUSTOMIZATION: "AVATAR_CUSTOMIZATION",
  LAPTOP: "LAPTOP",
};

export const gameStates = {
  MENU: "MENU",
  LEADERBOARD: "LEADERBOARD",
  MATERIAL: "MATERIAL",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
  GAME_TUTORIAL: "GAME_TUTORIAL",
};

export const skies = {
  DAY: "day",
  DAWN: "dawn",
  NIGHT: "night",
};

export const useGame = create(
  subscribeWithSelector((set) => {
    return {
      // DEFAULT PHASE
      isMusicMuted: false,
      phase: phases.FREE,
      gameState: gameStates.MENU,
      canPressEnter: false,
      canChangePhase: { condition: false, phase: "" },
      sky: null,
      playerPosition: PLAYER_INITIAL_POSITION,

      // TOGGLE MUSIC
      toggleMusic: () => {
        set((state) => {
          const isMusicMuted = !state.isMusicMuted;
          return { isMusicMuted };
        });
      },

      // CHANGE PHASES METHODS
      changePhase: (phase) => {
        set(() => {
          SoundManager.playSound("buttonClick");
          return { phase };
        });
      },

      setCanChangePhase: (condition, phase) => {
        set(() => ({
          canChangePhase: { condition, phase },
        }));
      },

      setCanPressEnter: (condition) => {
        set(() => {
          return { canPressEnter: condition };
        });
      },

      // CHANGE GAME STATE METHOD
      changeGameState: (gameState) => {
        set(() => {
          SoundManager.playSound("buttonClick");
          return { gameState };
        });
      },

      // PLAYER STATE
      playerState: "idle",
      setPlayerState: (playerState) => {
        set({
          playerState,
        });
      },

      // SKIES
      setSky: (sky) => {
        set(() => {
          return { sky };
        });
      },

      // PLAYER POSITION INFORMATION
      setPlayerPosition: (playerPosition) => {
        set(() => {
          return { playerPosition };
        });
      },
    };
  })
);
