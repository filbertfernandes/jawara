import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useSecondGame } from "./stores/useSecondGame.jsx"
import { useGame } from "../../useGame.jsx"

export const SecondGameInterface = () => {

    const time = useRef()

    // BODY PARTS / FIRST GAME STATE
    const { startGame, gameState, mode, goToMenu, score, correctAnswersOrder, correctCount, stage } = useSecondGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
        score: state.score,
        correctAnswersOrder: state.correctAnswersOrder,
        correctCount: state.correctCount,
        stage: state.stage,
    }))

    // MAIN GAME STATE
    const { goToHome } = useGame((state) => ({
        goToHome: state.goToHome
    }))

    // SCORE
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useSecondGame.getState()
    
            let elapsedTime = 0
    
            if (state.gameState === gameStates.GAME) {
                elapsedTime = (Date.now() - state.startTime) / 1000
            }
    
            // Calculate remaining time
            const remainingTime = Math.max(0, state.initialTimer - elapsedTime).toFixed(0)
    
            state.timer = remainingTime
    
            if (time.current) {
                time.current.textContent = state.timer
            }
    
            // Check if time has run out
            if (state.timer <= 0) {
                // Handle game over logic here
                state.gameOver()
            }
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
            {/* MENU INTERFACE */}
            <div
                className={ `menu ${gameState !== gameStates.MENU ? 'hidden' : ''}` }
            >
                <h1>Warna</h1>
                <button onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown } >Ngoko</button>
                <button onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } >Krama Madya</button>
                <button onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown } >Krama Alus</button>
                <button onClick={ () => goToHome() } onKeyDown={ handleKeyDown } >Back to Home</button>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `game-over ${gameState !== gameStates.GAME_OVER ? 'hidden' : ''}` }
            >
                <h1>CONGRATULATIONS! Your score is { score }</h1>
                <button onClick={ () => startGame({ mode: mode }) } onKeyDown={ handleKeyDown } >Retry</button>
                <button onClick={ () => goToMenu() } onKeyDown={ handleKeyDown } >Back to Menu</button>
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `game-interface ${gameState !== gameStates.GAME ? 'hidden' : ''}` }
            >
                <div className="second-game-interface">
                    <div>Time Left: <span ref={ time } >120</span></div>
                    { correctCount < 5 && <div>{ stage ? stage[correctAnswersOrder[correctCount]][mode] : '' }</div> }
                    <div>Score: { score }</div>
                </div>
                
            </div>
        </>
    )

}
