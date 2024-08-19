import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useSecondGame } from "./stores/useSecondGame.jsx"
import { useGame } from "../../useGame.jsx"
import useIsMobile from "../../useIsMobile.jsx"

export const SecondGameInterface = () => {

    const time = useRef()

    // SECOND GAME STATE
    const { startGame, gameState, mode, goToMenu, score, correctAnswersOrder, correctCount, stage, setMobileLeft, setMobileRight, setMobilePush, setMobileJump } = useSecondGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
        score: state.score,
        correctAnswersOrder: state.correctAnswersOrder,
        correctCount: state.correctCount,
        stage: state.stage,
        setMobileLeft: state.setMobileLeft,
        setMobileRight: state.setMobileRight,
        setMobilePush: state.setMobilePush,
        setMobileJump: state.setMobileJump,
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

    // PREVENT DEFAULT SPACE & ENTER KEY ACTION
    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }

    // MOVILE CONTROLS
    const isMobile = useIsMobile()

    return (
        <>
            {/* MENU INTERFACE */}
            <div
                className={ `font-bebas fixed flex flex-col justify-center items-center gap-4 left-0 top-0 w-full h-full bg-black/30 backdrop-blur bg-repeat transition-all duration-1000 ease-in-out ${gameState !== gameStates.MENU ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <h1 className='text-3xl text-teal-400 drop-shadow-lg font-bold'>Warna</h1>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown } >Ngoko</button>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } >Krama Madya</button>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown } >Krama Alus</button>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => goToHome() } onKeyDown={ handleKeyDown } >Back to Home</button>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `font-bebas fixed flex flex-col justify-center items-center gap-4 left-0 top-0 w-full h-full bg-black/30 backdrop-blur bg-repeat transition-all duration-1000 ease-in-out ${gameState !== gameStates.GAME_OVER ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <h1 className='text-3xl text-teal-400 drop-shadow-lg font-bold'>CONGRATULATIONS! Your score is { score }</h1>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: mode }) } onKeyDown={ handleKeyDown } >Retry</button>
                <button className='p-1 bg-stone-800/50 w-28 text-sm text-teal-100 font-semibold rounded-lg shadow-md' onClick={ () => goToMenu() } onKeyDown={ handleKeyDown } >Back to Menu</button>
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `${gameState === gameStates.MENU ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <div className='flex justify-between flex-wrap font-bebas text-teal-50 text-3xl bg-black/20 pt-1 text-center pointer-events-none absolute top-0 left-0 w-full'>
                    <div>Time Left: <span ref={ time } >120</span></div>
                    { correctCount < 5 && <div>{ stage ? stage[correctAnswersOrder[correctCount]][mode] : '' }</div> }
                    <div>Score: { score }</div>
                </div>
                
            </div>

            {/* MOBILE CONTROLLERS */}
            <div className={ `flex justify-between flex-nowrap font-bebas text-teal-50 text-3xl pt-1 text-center absolute bottom-0 left-0 w-full ${isMobile === false ? 'opacity-0 pointer-events-none' : ''}` } >
                <div className="flex justify-evenly w-[30%]">
                    <div 
                        className="border-2 border-black bg-black/20 w-full m-2.5 select-none touch-manipulation" 
                        onTouchStart={ (e) => {
                            e.preventDefault()
                            setMobileLeft(true)
                        } } 
                        onTouchEnd={ () => setMobileLeft(false) }>Left</div>
                    <div 
                        className="border-2 border-black bg-black/20 w-full m-2.5 select-none touch-manipulation" 
                        onTouchStart={ (e) => {
                            e.preventDefault()
                            setMobileRight(true)
                        } } 
                        onTouchEnd={ () => setMobileRight(false) }>Right</div>
                </div>

                <div className="flex justify-evenly w-[30%]">
                    <div 
                        className="border-2 border-black bg-black/20 w-full m-2.5 select-none touch-manipulation" 
                        onTouchStart={ (e) => {
                            e.preventDefault()
                            setMobilePush(true)
                        } } 
                        onTouchEnd={ () => setMobilePush(false) }>Push</div>
                    <div 
                        className="border-2 border-black bg-black/20 w-full m-2.5 select-none touch-manipulation" 
                        onTouchStart={ (e) => {
                            e.preventDefault()
                            setMobileJump(true)
                        } } 
                        onTouchEnd={ () => setMobileJump(false) }>Jump</div>
                </div>
            </div>
        </>
    )

}
