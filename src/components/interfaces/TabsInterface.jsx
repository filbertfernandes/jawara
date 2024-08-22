// react icons
import { IoGameController } from "react-icons/io5"
import { FaBook } from "react-icons/fa"
import { FaRankingStar } from "react-icons/fa6"

const TabsInterface = ({ goToMenu, goToLeaderboard, goToMaterial }) => {
  return (
    <div className="flex justify-evenly w-full mb-4">
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-sky-500 bg-white" onClick={ goToMenu }>
            <IoGameController />
        </button>
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-white/50 bg-white/10 border-white/50 border-2" onClick={ goToLeaderboard }>
            <FaRankingStar />
        </button>
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-white/50 bg-white/10 border-white/50 border-2" onClick={ goToMaterial }>
            <FaBook />
        </button>
    </div>
  )
}

export default TabsInterface