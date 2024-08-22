import { useEffect, useState } from "react"


const GameLeaderboardInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col gap-6 items-center w-full h-full mt-4 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold">Leaderboard</h1>

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

            <div className="flex justify-between text-sky-100 w-full h-full bg-stone-800/50 px-4 rounded-t-3xl text-md">
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default GameLeaderboardInterface