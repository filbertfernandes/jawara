// react icons
import { IoGameController } from "react-icons/io5"
import { GrTrophy } from "react-icons/gr"
import { FaBook } from "react-icons/fa"

const TabsInterface = () => {
  return (
    <div className="flex justify-evenly w-full mb-4">
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-sky-500 bg-white">
            <IoGameController />
        </button>
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-white/50 bg-white/10 border-white/50 border-2">
            <GrTrophy />
        </button>
        <button className="btn btn-square btn-lg rounded-[1rem] text-4xl text-white/50 bg-white/10 border-white/50 border-2">
            <FaBook />
        </button>
    </div>
  )
}

export default TabsInterface