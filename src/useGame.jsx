import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export const phases = {
    FREE: 'FREE',
    FIRST_GAME: 'FIRST_GAME',
}

export const useGame = create(subscribeWithSelector((set) => 
{
    return {
        // phase: phases.FREE
        phase: phases.FIRST_GAME,

        goToHome: () => {
            set((state) => {
                return { phase: phases.FREE }
            })
        },

        goToFirstGame: () => {
            set((state) => {
                return { phase: phases.FIRST_GAME }
            })
        }
    }
}))