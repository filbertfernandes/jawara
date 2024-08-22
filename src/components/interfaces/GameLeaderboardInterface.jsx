import { useEffect, useState } from "react"


const GameLeaderboardInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col items-center gap-6 w-full h-full mt-4 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <div className="flex justify-between text-sky-100 w-[90%] h-10 bg-stone-800/50 px-4 rounded-lg text-md">
                <div className="flex items-center text-center border-sky-400 border-b-2" onClick={ () => console.log('clicked') } >
                    Ngoko
                </div>

                <div className="flex items-center text-center" onClick={ () => console.log('clicked') } >
                    Krama Madya
                </div>

                <div className="flex items-center text-center" onClick={ () => console.log('clicked') } >
                    Krama Alus
                </div>
            </div>
        </div>
    )
}

export default GameLeaderboardInterface