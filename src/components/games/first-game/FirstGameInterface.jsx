import { useEffect, useRef, useState } from "react"
import { addEffect } from "@react-three/fiber"

import { useFirstGame } from "./stores/useFirstGame.jsx"
import { gameStates, useGame } from "../../../useGame.jsx"

// IMPORT WORDS
import { words } from './stores/constants.js'

// INTERFACES
import GameMenuInterface from "../../interfaces/GameMenuInterface.jsx"

export const FirstGameInterface = () => {
    const [score, setScore] = useState(0)

    const time = useRef()

    // GAME STATE
    const { gameState } = useGame((state) => ({
        gameState: state.gameState,
    }))

    const { startGame } = useFirstGame((state) => ({
        startGame: state.startGame,
    }))

    // SCORE
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()
            const firstGameState = useFirstGame.getState()

            let elapsedTime = 0

            if(state.gameState === gameStates.GAME)
                elapsedTime = Date.now() - firstGameState.startTime
            else if(state.gameState === gameStates.GAME_OVER)
                elapsedTime = firstGameState.endTime - firstGameState.startTime

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current)
                time.current.textContent = elapsedTime

            // Update the score when the game is over
            if(state.gameState === gameStates.GAME_OVER) 
                setScore(elapsedTime)
        })

        return () => {
            unsubscribeEffect()
        }
    }, [])
    
    return (
        <>
            {/* GAME MENU INTERFACE */}
            <GameMenuInterface startGame={ startGame } title='Anggota Tubuh' words={ words } score={ score } />

            {/* IN GAME INTERFACE */}
            <div className={ `${gameState !== gameStates.GAME ? 'opacity-0 pointer-events-none' : ''}` } >
                <div ref={ time } className="absolute top-0 left-0 w-full text-white text-3xl bg-black/30 pt-1 text-center pointer-events-none font-bebas">0.00</div>
            </div>
        </>
    )

}
