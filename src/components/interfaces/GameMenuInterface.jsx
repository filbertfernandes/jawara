import { useEffect, useState } from "react"
import { useGame } from "../../useGame.jsx"

const GameMenuInterface = ({ startGame, title }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    // MAIN GAME STATE
    const { goToHome } = useGame((state) => ({
        goToHome: state.goToHome
    }))

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }

    return (
        <div className={ `flex flex-col justify-center items-center gap-6 w-full h-[75%] sm:h-full ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold md:text-5xl lg:text-6xl">{ title }</h1>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md md:w-36 md:text-2xl lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown }
            >
                Ngoko
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md md:w-36 md:text-2xl lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } 
            >
                Krama Madya
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md md:w-36 md:text-2xl lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown }
            >
                Krama Alus
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md md:w-36 md:text-2xl lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ goToHome } onKeyDown={ handleKeyDown }
            >
                Back to Home
            </button>
        </div>
    )
}

export default GameMenuInterface