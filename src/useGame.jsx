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

        // GO TO PHASES METHODS
        goToHome: () => {
            set((state) => {
                return { phase: phases.FREE }
            })
        },

        goToFirstGame: () => {
            set((state) => {
                return { phase: phases.FIRST_GAME }
            })
        },

        goToSecondGame: () => {
            set((state) => {
                return { phase: phases.SECOND_GAME }
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