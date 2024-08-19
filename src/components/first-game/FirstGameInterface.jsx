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
                className={ `font-bebas fixed flex flex-col justify-center items-center gap-4 left-0 top-0 w-full h-full bg-black/30 backdrop-blur bg-repeat transition-all duration-1000 ease-in-out ${gameState !== gameStates.MENU ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <h1 className="text-3xl text-teal-400 drop-shadow-lg font-bold">Anggota Tubuh</h1>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown } >Ngoko</button>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } >Krama Madya</button>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown } >Krama Alus</button>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => goToHome() } onKeyDown={ handleKeyDown } >Back to Home</button>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `font-bebas fixed flex flex-col justify-center items-center gap-4 left-0 top-0 w-full h-full bg-black/30 backdrop-blur bg-repeat transition-all duration-1000 ease-in-out ${gameState !== gameStates.GAME_OVER ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <h1 className="text-3xl text-teal-400 drop-shadow-lg font-bold">CONGRATULATIONS</h1>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => startGame({ mode: mode }) } onKeyDown={ handleKeyDown } >Retry</button>
                <button className="p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md" onClick={ () => goToMenu() } onKeyDown={ handleKeyDown } >Back to Menu</button>
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `${gameState === gameStates.MENU ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <div ref={ time } className="absolute top-0 left-0 w-full text-teal-50 text-3xl bg-black/30 pt-1 text-center pointer-events-none font-bebas">0.00</div>
            </div>
        </>
    )

}
