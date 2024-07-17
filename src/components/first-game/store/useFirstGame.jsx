import { create } from "zustand"
import { words } from "./constants.js"
import { useThree } from "@react-three/fiber"

export const gameStates = {
  MENU: 'MENU',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER',
}

export const generateGameLevel = ({ nbStages }) => {
  const level = []

  for (let i = 0; i < nbStages; i++) {

    const stage = []
    const nbOptions = 2 + (i * 2)
    // const nbOptions = 1 // FOR TESTING

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

const resetCamera = () => {
  const { camera } = useThree()

  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 3
}

export const useFirstGame = create((set) => ({
    level: null,
    currentStage: 0,
    mode: "",
    gameState: gameStates.MENU,
    startTime: 0,
    endTime: 0,
    cameraPosition: {x: 0, y: 1, z: 3},

    startGame: ({ mode }) => {

        set((state) => {
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
    }
    
  }))