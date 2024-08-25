import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export const phases = {
    FREE: 'FREE',
    FIRST_GAME: 'FIRST_GAME',
    SECOND_GAME: 'SECOND_GAME',
    THIRD_GAME: 'THIRD_GAME',
}

export const useGame = create(subscribeWithSelector((set) => 
{
    return {
        // DEFAULT PHASE
        phase: phases.SECOND_GAME,
        canPressEnter: false,
        canChangePhase: {condition: false, phase: ''},

        // GO TO PHASES METHODS
        goToHome: () => {
            set((state) => {
                return { phase: phases.FREE }
            })
        },

        changePhase: (gamePhase) => {
            set((state) => {
                return { phase: gamePhase }
            })
        },
        
        setCanChangePhase: (condition, phase) => {
            set((state) => ({
                canChangePhase: { condition, phase }
            }));
        },

        setCanPressEnter: (condition) => {
            set((state) => {
                return { canPressEnter: condition }
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