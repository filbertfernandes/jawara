import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

import { gameStates, useSecondGame } from "./stores/useSecondGame.jsx"
import useIsMobile from "../../../custom-hooks/useIsMobile.jsx"

// INTERFACES
import TabsInterface from "../../interfaces/TabsInterface.jsx"
import GameMenuInterface from "../../interfaces/GameMenuInterface.jsx"
import GameOverInterface from "../../interfaces/GameOverInterface.jsx"
import GameLeaderboardInterface from "../../interfaces/GameLeaderboardInterface.jsx"
import GameMaterialInterface from "../../interfaces/GameMaterialInterface.jsx"

// SOUND MANAGER
import { SoundManager } from '../../SoundManager.jsx'

export const SecondGameInterface = () => {

    const time = useRef()

    // SECOND GAME STATE
    const { startGame, gameState, mode, goToMenu, goToLeaderboard, goToMaterial, score, correctAnswersOrder, correctCount, stage, setMobileLeft, setMobileRight, setMobilePush, setMobileJump } = useSecondGame((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
        goToLeaderboard: state.goToLeaderboard,
        goToMaterial: state.goToMaterial,
        score: state.score,
        correctAnswersOrder: state.correctAnswersOrder,
        correctCount: state.correctCount,
        stage: state.stage,
        setMobileLeft: state.setMobileLeft,
        setMobileRight: state.setMobileRight,
        setMobilePush: state.setMobilePush,
        setMobileJump: state.setMobileJump,
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
                SoundManager.playSound('gameComplete')
                state.gameOver()
            }
        })
    
        return () => {
            unsubscribeEffect()
        }
    }, [])

    // MOVILE CONTROLS
    const isMobile = useIsMobile()

    return (
        <>
            {/* TABS INTERFACE */}
            <div
                className={ `dark-layout ${gameState !== gameStates.MENU && gameState !== gameStates.LEADERBOARD && gameState !== gameStates.MATERIAL ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <div className="flex flex-col items-center w-full h-full sm:flex-row md:w-[90%] lg:w-[80%]">
                    <TabsInterface gameState={ gameState } goToMenu={ goToMenu } goToLeaderboard={ goToLeaderboard } goToMaterial={ goToMaterial } />
                    { gameState === gameStates.MENU && <GameMenuInterface startGame={ startGame } title="Warna" />}
                    { gameState === gameStates.LEADERBOARD && <GameLeaderboardInterface />}
                    { gameState === gameStates.MATERIAL && <GameMaterialInterface />}
                </div>
            </div>

            {/* GAME OVER INTERFACE */}
            <div
                className={ `dark-layout ${gameState !== gameStates.GAME_OVER ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <GameOverInterface score={ score } startGame={ startGame } goToMenu={ goToMenu } />
            </div>

            {/* GAME INTERFACE */}
            <div
                className={ `${gameState === gameStates.MENU ? 'opacity-0 pointer-events-none' : ''}` }
            >
                <div className='flex justify-between flex-wrap font-bebas text-sky-50 text-3xl bg-black/20 pt-1 text-center pointer-events-none absolute top-0 left-0 w-full'>
                    <div>Time Left: <span ref={ time } >120</span></div>
                    { correctCount < 5 && <div>{ stage ? stage[correctAnswersOrder[correctCount]][mode] : '' }</div> }
                    <div>Score: { score }</div>
                </div>
                
            </div>

            {/* MOBILE CONTROLLERS */}
            <div className={ `flex justify-between flex-nowrap font-bebas text-sky-50 text-3xl pt-1 text-center absolute bottom-0 left-0 w-full ${isMobile === false || gameState != gameStates.GAME ? 'opacity-0 pointer-events-none' : ''}` } >
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
