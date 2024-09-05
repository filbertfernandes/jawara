// REACT ICONS
import { IoGameController } from "react-icons/io5"
import { FaBook } from "react-icons/fa"
import { FaRankingStar } from "react-icons/fa6"

// ZUSTAND
import { gameStates, useGame } from "../../useGame.jsx"

// SOUND MANAGER
import { SoundManager } from '../SoundManager.jsx'

const GameTabButton = ({ icon: Icon, isActive, onClick }) => {
    return (
        <button
            className={`
                btn btn-square btn-lg rounded-[1rem] text-4xl
                ${isActive ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
                hover:text-sky-500 hover:bg-white hover:border-none
                transition-all duration-300
            `}
            onClick={onClick}
        >
            <Icon />
        </button>
    )
}

const GameTabsInterface = () => {
    // GAME STATE
    const { gameState, changeGameState } = useGame((state) => ({
        gameState: state.gameState,
        changeGameState: state.changeGameState,
    }))

    // Memoize active states to avoid unnecessary re-renders
    const isMenuActive = gameState === gameStates.MENU
    const isLeaderboardActive = gameState === gameStates.LEADERBOARD
    const isMaterialActive = gameState === gameStates.MATERIAL

    // Button click handlers
    const handleMenuClick = () => {
        SoundManager.playSound('buttonClick')
        changeGameState(gameStates.MENU)
    }

    const handleLeaderboardClick = () => {
        SoundManager.playSound('buttonClick')
        changeGameState(gameStates.LEADERBOARD)
    }

    const handleMaterialClick = () => {
        SoundManager.playSound('buttonClick')
        changeGameState(gameStates.MATERIAL)
    }

    return (
        <div className="flex justify-evenly w-full px-4 sm:w-auto sm:flex-col sm:h-full sm:ml-4 sm:mb-8">
            <GameTabButton icon={IoGameController} isActive={isMenuActive} onClick={handleMenuClick} />
            <GameTabButton icon={FaRankingStar} isActive={isLeaderboardActive} onClick={handleLeaderboardClick} />
            <GameTabButton icon={FaBook} isActive={isMaterialActive} onClick={handleMaterialClick} />
        </div>
    )
}

export default GameTabsInterface