import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useFirstGame } from "./stores/useFirstGame.jsx"
import { useGame } from "../../useGame.jsx"

export const FirstGameInterface = () => {

    const time = useRef()

    // BODY PARTS / FIRST GAME STATE
    const { startGame, gameState, mode, goToMenu } = useFirstGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
    }))

    // MAIN GAME STATE
    const { goToHome } = useGame((state) => ({
        goToHome: state.goToHome
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
                <h1>Anggota Tubuh</h1>
                <button onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown } >Ngoko</button>
                <button onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } >Krama Madya</button>
                <button onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown } >Krama Alus</button>
                <button onClick={ () => goToHome() } onKeyDown={ handleKeyDown } >Back to Home</button>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `game-over ${gameState !== gameStates.GAME_OVER ? 'hidden' : ''}` }
            >
                <h1>CONGRATULATIONS</h1>
                <button onClick={ () => startGame({ mode: mode }) } onKeyDown={ handleKeyDown } >Retry</button>
                <button onClick={ () => goToMenu() } onKeyDown={ handleKeyDown } >Back to Menu</button>
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `game-interface ${gameState === gameStates.MENU ? 'hidden' : ''}` }
            >
                <div ref={ time } className="time">0.00</div>
            </div>
        </>
    )

}
