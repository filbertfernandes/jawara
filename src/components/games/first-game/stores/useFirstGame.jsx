import { create } from "zustand"
import { words } from "./constants.js"

export const gameStates = {
  MENU: 'MENU',
  LEADERBOARD: 'LEADERBOARD',
  MATERIAL: 'MATERIAL',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER',
}

export const generateGameLevel = ({ nbStages }) => {
  const level = []

  for (let i = 0; i < nbStages; i++) {

    const stage = []
    // const nbOptions = 2 + i
    const nbOptions = 1 // FOR TESTING

    for (let j = 0; j < nbOptions; j++) {

      let word = null

      while (!word || stage.includes(word)) {
        word = words[Math.floor(Math.random() * words.length)]
      }

      stage.push(word)

    }

    level.push(stage)

  }

  return level
}

export const useFirstGame = create((set) => ({
    level: null,
    currentStage: 0,
    mode: '',
    gameState: gameStates.MENU,
    startTime: 0,
    endTime: 0,
    cameraPosition: {x: 0, y: 1, z: 3},

    startGame: ({ mode }) => {
        
        set((state) => {
            if(!mode && state.mode != '') mode = state.mode

            const level = generateGameLevel({ nbStages: 5 })
            return { level, currentStage: 0, mode, gameState: gameStates.GAME, startTime: Date.now(), cameraPosition: {x: 0, y: 1, z: 3} }
        })

    },

    nextStage: () => {

        set((state) => {
            const currentStage = state.currentStage + 1
            return { currentStage }
        })
        
    },

    gameOver: () => {
        set((state) => {
            return { gameState: gameStates.GAME_OVER, endTime: Date.now() }
        })
    },

    goToMenu: () => {
        set((state) => {
            return { gameState: gameStates.MENU }
        })
    },

    goToLeaderboard: () => {
        set((state) => {
            return { gameState: gameStates.LEADERBOARD }
        })
    },

    goToMaterial: () => {
        set((state) => {
            return { gameState: gameStates.MATERIAL }
        })
    }
    
  }))