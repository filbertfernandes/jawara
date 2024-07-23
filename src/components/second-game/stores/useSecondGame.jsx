import { create } from "zustand"
import { words } from "./constants.js"

export const gameStates = {
  MENU: 'MENU',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER',
}

export const generateGameLevel = () => {
    const stage = []
    const nbOptions = 5

    for (let j = 0; j < nbOptions; j++) {

        let word = null

        while (!word || stage.includes(word)) {
            word = words[Math.floor(Math.random() * words.length)]
        }

        stage.push(word)

    }

    return stage
}

export const useSecondGame = create((set) => ({
    stage: null,
    score: 0,
    mode: "",
    gameState: gameStates.MENU,
    timer: 0,
    initialTimer: 100,
    startTime: 0,

    startGame: ({ mode }) => {

        set((state) => {
            const stage = generateGameLevel()
            return { stage, score: 0, mode, gameState: gameStates.GAME, timer: 0, initialTimer: 100, startTime: Date.now() }
        })

    },

    nextStage: () => {

        set((state) => {
            stage = generateGameLevel()
            const score = state.score + 1
            return { stage, score }
        })
        
    },

    gameOver: () => {
        set((state) => {
            return { gameState: gameStates.GAME_OVER }
        })
    },

    goToMenu: () => {
        set((state) => {
            return { gameState: gameStates.MENU }
        })
    }
    
  }))