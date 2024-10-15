import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export const phases = {
  FREE: "FREE",
  FIRST_GAME: "FIRST_GAME",
  SECOND_GAME: "SECOND_GAME",
  THIRD_GAME: "THIRD_GAME",
  FOURTH_GAME: "FOURTH_GAME",
}

export const gameStates = {
  MENU: "MENU",
  LEADERBOARD: "LEADERBOARD",
  MATERIAL: "MATERIAL",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
}

export const useGame = create(
  subscribeWithSelector((set) => {
    return {
      // DEFAULT PHASE
      phase: phases.THIRD_GAME,
      gameState: gameStates.MENU,
      canPressEnter: false,
      canChangePhase: { condition: false, phase: "" },

      // CHANGE PHASES METHODS
      changePhase: (phase) => {
        set(() => {
          return { phase }
        })
      },

      setCanChangePhase: (condition, phase) => {
        set(() => ({
          canChangePhase: { condition, phase },
        }))
      },

      setCanPressEnter: (condition) => {
        set(() => {
          return { canPressEnter: condition }
        })
      },

      // CHANGE GAME STATE METHOD
      changeGameState: (gameState) => {
        set(() => {
          return { gameState }
        })
      },

      // PLAYER STATE
      playerState: "Idle",
      setPlayerState: (playerState) => {
        set({
          playerState,
        })
      },
    }
  })
)
