import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { words } from "./constants.js"

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

export const genereateCorrectAnswersOrder = () => {
    // Create an array with integers 0 to 4
    const arr = [0, 1, 2, 3, 4];
    
    // Shuffle the array using Fisher-Yates (Knuth) Shuffle algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    return arr;
}

export const useSecondGame = create(subscribeWithSelector((set) => {
    return {
        stage: null,
        score: 0,
        mode: "",
        timer: 0,
        initialTimer: 120,
        startTime: 0,
        correctAnswersOrder: [],
        correctCount: 0,
        mobileLeft: false,
        mobileRight: false,
        mobilePush: false,
        mobileJump: false,

        startGame: ({ mode }) => {

            set((state) => {
                if(mode === '' && state.mode != '') mode = state.mode

                const stage = generateGameLevel()
                const correctAnswersOrder = genereateCorrectAnswersOrder()
                return { stage, score: 0, mode, timer: 0, initialTimer: 120, startTime: Date.now(), correctAnswersOrder, correctCount: 0 }
            })

        },

        incrementCorrectCount: () => {
            set((state) => {
                const correctCount = state.correctCount + 1
                const score = state.score + 1
                return { correctCount, score }
            })
        },

        nextStage: () => {

            set(() => {
                const stage = generateGameLevel()
                const correctCount = 0
                const correctAnswersOrder = genereateCorrectAnswersOrder()
                return { stage, correctCount, correctAnswersOrder }
            })
            
        },

        // MOBILE CONTROLS
        setMobileLeft: (condition) => {
            set(() => {
                return { mobileLeft: condition }
            })
        },
        
        setMobileRight: (condition) => {
            set(() => {
                return { mobileRight: condition }
            })
        },

        setMobilePush: (condition) => {
            set(() => {
                return { mobilePush: condition }
            })
        },

        setMobileJump: (condition) => {
            set(() => {
                return { mobileJump: condition }
            })
        }
    
    }
}))