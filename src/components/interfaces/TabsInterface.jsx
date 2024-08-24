// react icons
import { IoGameController } from "react-icons/io5"
import { FaBook } from "react-icons/fa"
import { FaRankingStar } from "react-icons/fa6"

// sfx
import useSound from '../../custom-hooks/useSound.jsx'

const TabsInterface = ({ gameState, goToMenu, goToLeaderboard, goToMaterial }) => {
  const playSound = useSound('./sounds/btn-click-sfx.wav')

  return (
    <div className="flex justify-evenly w-full px-4 sm:w-auto sm:flex-col sm:h-full sm:ml-4">
        <button 
          className={`
            btn btn-square btn-lg rounded-[1rem] text-4xl
            ${gameState === 'MENU' ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
            hover:text-sky-500 hover:bg-white hover:border-none
            transition-all duration-300
          `} 
          onClick={ () => {
            playSound()
            goToMenu()
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
            playSound()
            goToLeaderboard()
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
            playSound()
            goToMaterial()
          } }
        >
            <FaBook />
        </button>
    </div>
  )
}

export default TabsInterface