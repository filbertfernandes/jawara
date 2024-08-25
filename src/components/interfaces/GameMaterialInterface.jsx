import { useEffect, useState } from "react"

// REACT ICONS
import { PiSpeakerHighBold } from "react-icons/pi";

const GameMaterialInterface = ({ words }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col items-center gap-6 w-full h-full mt-8 sm:gap-4 sm:-mt-8 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold lg:text-6xl">Material</h1>

            <div className="flex flex-wrap gap-4 justify-evenly w-full h-full px-4 text-white overflow-y-auto sm:px-0 sm:gap-1">
                {words.map((word, index) => (
                    <div key={ index } className="flex justify-between items-center w-full h-36 bg-stone-800/50 rounded-[1rem] mb-2 pl-4 sm:w-[45%] lg:w-[30%] lg:h-40">
                        <img 
                            src="https://img.freepik.com/free-vector/hand-drawn-eyeball-cartoon-illustration_23-2150873727.jpg" 
                            alt="Logo" 
                            className="w-24 h-24 object-cover rounded-[1rem]" 
                        />
                        <div className="flex flex-col w-full h-full p-4">
                            <div className="text-2xl underline mb-2">{ word.indonesian }</div>
                            <div className="flex justify-between text-base lg:text-xl">
                                <div>
                                    { word.ngoko } <span className="text-[0.5rem] text-white/50 lg:text-xs">(Ngoko)</span>
                                </div>
                                <div>
                                    <PiSpeakerHighBold />
                                </div>
                            </div>
                            <div className="flex justify-between text-base lg:text-xl">
                                <div>
                                    { word.madya } <span className="text-[0.5rem] text-white/50 lg:text-xs">(Krama Madya)</span>
                                </div>
                                <div>
                                    <PiSpeakerHighBold />
                                </div>
                            </div>
                            <div className="flex justify-between text-base lg:text-xl">
                                <div>
                                    { word.alus } <span className="text-[0.5rem] text-white/50 lg:text-xs">(Krama Alus)</span>
                                </div>
                                <div>
                                    <PiSpeakerHighBold />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default GameMaterialInterface