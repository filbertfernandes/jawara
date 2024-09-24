import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

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

export const useSecondGame = create(subscribeWithSelector((set) => {
    return {
        

    
    }
}))