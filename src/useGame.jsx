import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export const phases = {
    FREE: 'FREE',
    FIRST_GAME: 'FIRST_GAME',
    SECOND_GAME: 'SECOND_GAME',
}

export const useGame = create(subscribeWithSelector((set) => 
{
    return {
        // DEFAULT PHASE
        phase: phases.FREE,
        canPressEnter: false,
        canGoToFirstGame: false,
        canGoToSecondGame: false,

        // GO TO PHASES METHODS
        goToHome: () => {
            set((state) => {
                return { phase: phases.FREE }
            })
        },

        goToFirstGame: () => {
            set((state) => {
                return { phase: phases.FIRST_GAME, canPressEnter: false }
            })
        },

        goToSecondGame: () => {
            set((state) => {
                return { phase: phases.SECOND_GAME, canPressEnter: false }
            })
        },

        setCanPressEnter: (condition) => {
            set((state) => {
                return { canPressEnter: condition }
            })
        },

        setCanGoToFirstGame: (condition) => {
            set((state) => {
                return { canGoToFirstGame: condition }
            })
        },

        setCanGoToSecondGame: (condition) => {
            set((state) => {
                return { canGoToSecondGame: condition }
            })
        },

        // PLAYER STATE
        playerState: 'Idle',
        setPlayerState: (playerState) => {
            set({
                playerState,
            })
        }
    }
}))