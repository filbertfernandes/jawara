import { useEffect, useRef, useState } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useFirstGame } from "./stores/useFirstGame.jsx"

// INTERFACES
import TabsInterface from "../interfaces/TabsInterface.jsx"
import GameMenuInterface from "../interfaces/GameMenuInterface.jsx"
import GameOverInterface from "../interfaces/GameOverInterface.jsx"

export const FirstGameInterface = () => {
    const [score, setScore] = useState(0)

    const time = useRef()

    // BODY PARTS / FIRST GAME STATE
    const { startGame, gameState, goToMenu, goToLeaderboard, goToMaterial } = useFirstGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        goToMenu: state.goToMenu,
        goToLeaderboard: state.goToLeaderboard,
        goToMaterial: state.goToMaterial,
    }))

    // SCORE
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useFirstGame.getState()

            let elapsedTime = 0

            if(state.gameState === gameStates.GAME)
                elapsedTime = Date.now() - state.startTime
            else if(state.gameState === gameStates.GAME_OVER)
                elapsedTime = state.endTime - state.startTime

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current)
                time.current.textContent = elapsedTime

            // Update the score when the game is over
            if (state.gameState === gameStates.GAME_OVER) 
                setScore(elapsedTime)
        })

        return () => {
            unsubscribeEffect()
        }
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }
    
    return (
        <>
            {/* TABS INTERFACE */}
            <div
                className={ `dark-layout ${gameState !== gameStates.MENU && gameState !== gameStates.LEADERBOARD && gameState !== gameStates.MATERIAL ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <TabsInterface gameState={ gameState } goToMenu={ goToMenu } goToLeaderboard={ goToLeaderboard } goToMaterial={ goToMaterial } />
                { gameState === gameStates.MENU && <GameMenuInterface startGame={ startGame } />}
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `dark-layout ${gameState !== gameStates.GAME_OVER ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <GameOverInterface score={ score } startGame={ startGame } goToMenu={ goToMenu } />
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `${gameState !== gameStates.GAME ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <div ref={ time } className='absolute top-0 left-0 w-full text-sky-50 text-3xl bg-black/30 pt-1 text-center pointer-events-none font-bebas'>0.00</div>
            </div>
        </>
    )

}
