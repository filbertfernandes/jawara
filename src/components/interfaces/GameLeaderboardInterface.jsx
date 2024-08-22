import { useEffect, useState } from "react"


const GameLeaderboardInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col justify-center items-center gap-6 w-full h-[75%] ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className='text-4xl text-sky-400 drop-shadow-lg font-bold'>Leaderboard</h1>
        </div>
    )
}

export default GameLeaderboardInterface