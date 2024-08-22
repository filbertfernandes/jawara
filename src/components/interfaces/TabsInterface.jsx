// react icons
import { IoGameController } from "react-icons/io5"
import { FaBook } from "react-icons/fa"
import { FaRankingStar } from "react-icons/fa6"

const TabsInterface = ({ gameState, goToMenu, goToLeaderboard, goToMaterial }) => {
  return (
    <div className="flex justify-evenly w-full mb-4 px-4 md:justify-center md:gap-20 lg:gap-32">
        <button 
          className={`
            btn btn-square btn-lg rounded-[1rem] text-4xl
            ${gameState === 'MENU' ? 'text-sky-500 bg-white border-none' : 'text-white/50 bg-white/10 border-white/50 border-2'}
            hover:text-sky-500 hover:bg-white hover:border-none
            transition-all duration-300
          `} 
          onClick={ goToMenu }
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
          onClick={ goToLeaderboard }
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
          onClick={ goToMaterial }
        >
            <FaBook />
        </button>
    </div>
  )
}

export default TabsInterface