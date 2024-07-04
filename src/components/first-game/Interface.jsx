import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useFirstGame } from "./store/useFirstGame"

export const Interface = () => {

    const time = useRef()

    const { startGame, gameState, mode, goToMenu } = useFirstGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
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
    
    return (
        <>
            {/* MENU INTERFACE */}
            <div
                className={ `menu ${gameState !== gameStates.MENU ? 'menu-hidden' : ''}` }
            >
                <h1>Anggota Tubuh</h1>
                <button onClick={ () => startGame({ mode: 'ngoko' }) }>Ngoko</button>
                <button onClick={ () => startGame({ mode: 'madya' }) }>Krama Madya</button>
                <button onClick={ () => startGame({ mode: 'alus' }) }>Krama Alus</button>
                <button>Back to Home</button>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `game-over ${gameState !== gameStates.GAME_OVER ? 'game-over-hidden' : ''}` }
            >
                <h1>GAME OVER</h1>
                <button onClick={ () => startGame({ mode: mode }) }>Retry</button>
                <button onClick={ () => goToMenu() }>Back to Menu</button>
            </div>

            {/* GAME INTERFACE */}
            <div ref={ time } className="time">0.00</div>
        </>
    )

}
