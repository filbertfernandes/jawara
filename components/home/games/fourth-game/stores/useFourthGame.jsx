import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { words, positions } from "./constants.js"

export const generateGameLevel = () => {
  const stage = []
  const nbOptions = 2
  const usedPositions = []

  for (let j = 0; j < nbOptions; j++) {
    let word = null
    let position = null

    // Find a unique word
    while (!word || stage.some((item) => item.word === word)) {
      word = words[Math.floor(Math.random() * words.length)]
    }

    // Find a unique position
    while (!position || usedPositions.includes(position)) {
      position =
        positions[Math.floor(Math.random() * positions.length)].position
    }

    usedPositions.push(position)

    // Add the word and its position to the stage
    stage.push({ word, position, isAnswered: false, isCorrect: false })
  }

  return stage
}

export const genereateCorrectAnswersOrder = () => {
  const arr = [0, 1]

  /// Shuffle the array using Fisher-Yates (Knuth) Shuffle algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

export const useFourthGame = create(
  subscribeWithSelector((set) => {
    return {
      stage: null,
      score: 0,
      combo: 1,
      mode: "",
      timer: 0,
      initialTimer: 100,
      startTime: 0,
      correctAnswersOrder: [],
      answerCount: 0,

      startGame: ({ mode }) => {
        set((state) => {
          if (mode === "" && state.mode !== "") mode = state.mode

          const stage = generateGameLevel()
          const correctAnswersOrder = genereateCorrectAnswersOrder()
          return {
            stage,
            score: 0,
            combo: 1,
            mode,
            timer: 0,
            initialTimer: 100,
            startTime: Date.now(),
            correctAnswersOrder,
            answerCount: 0,
          }
        })
      },

      incrementAnswerCount: () => {
        set((state) => {
          const answerCount = state.answerCount + 1
          return { answerCount }
        })
      },

      incrementScore: () => {
        set((state) => {
          const score = state.score + state.combo
          const combo = state.combo < 5 ? state.combo + 1 : state.combo
          return { score, combo }
        })
      },

      decrementScore: () => {
        set((state) => {
          const score = state.score - 2
          return {
            combo: 1,
            score,
            stage: state.stage,
            answerCount: state.answerCount,
          }
        })
      },

      nextStage: () => {
        set(() => {
          const stage = generateGameLevel()
          const answerCount = 0
          const correctAnswersOrder = genereateCorrectAnswersOrder()
          return { stage, answerCount, correctAnswersOrder }
        })
      },
    }
  })
)
