import { create } from "zustand"
import { words } from "./constants.js"

export const generateGameLevel = ({ nbStages }) => {
  const level = []

  for (let i = 0; i < nbStages; i++) {

    const stage = []
    const nbOptions = 2 + (i * 2)

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
    mode: "ngoko",

    startGame: () => {

        set((state) => {
            const level = generateGameLevel({ nbStages: 5 })
            return { level, currentStage: 0 }
        })

    },

    nextStage: () => {

        set((state) => {
            const currentStage = state.currentStage + 1
            return { currentStage }
        })
        
    },
  }))