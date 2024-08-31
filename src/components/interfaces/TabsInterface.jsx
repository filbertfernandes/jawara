// REACT ICONS
import { IoGameController } from "react-icons/io5"
import { FaBook } from "react-icons/fa"
import { FaRankingStar } from "react-icons/fa6"

// ZUSTAND
import { gameStates, useGame } from "../../useGame.jsx"

// SOUND MANAGER
import { SoundManager } from '../SoundManager.jsx'

const TabsInterface = () => {
    // GAME STATE
    const { gameState, changeGameState } = useGame((state) => ({
        gameState: state.gameState,
        changeGameState: state.changeGameState,
    }))

    return (
        <div className="flex justify-evenly w-full px-4 sm:w-auto sm:flex-col sm:h-full sm:ml-4 sm:mb-8">
            <button 
                className={`
                    btn btn-square btn-lg rounded-[1rem] text-4xl
                    ${gameState === 'MENU' ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
                    hover:text-sky-500 hover:bg-white hover:border-none
                    transition-all duration-300
                `} 
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    changeGameState(gameStates.MENU)
                } }
            >
                <IoGameController />
            </button>
            
            <button 
                className={`
                    btn btn-square btn-lg rounded-[1rem] text-4xl
                    ${gameState === 'LEADERBOARD' ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
                    hover:text-sky-500 hover:bg-white hover:border-none
                    transition-all duration-300
                `} 
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    changeGameState(gameStates.LEADERBOARD)
                } }
            >
                <FaRankingStar />
            </button>

            <button 
                className={`
                    btn btn-square btn-lg rounded-[1rem] text-4xl
                    ${gameState === 'MATERIAL' ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
                    hover:text-sky-500 hover:bg-white hover:border-none
                    transition-all duration-300
                `} 
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    changeGameState(gameStates.MATERIAL)
                } }
            >
                <FaBook />
            </button>
        </div>
    )
}

export default TabsInterface