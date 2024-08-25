import { useEffect, useState } from "react"
import { useGame } from "../../useGame.jsx"

// sound manager
import { SoundManager } from '../SoundManager.jsx'

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
        <div className={ `flex flex-col justify-center items-center gap-6 w-full h-[75%] sm:h-full sm:pb-8 lg:gap-10 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold lg:text-6xl">{ title }</h1>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    startGame({ mode: 'ngoko' }) 
                }}
                onKeyDown={ handleKeyDown }
            >
                Ngoko
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    startGame({ mode: 'madya' }) 
                }}
                onKeyDown={ handleKeyDown } 
            >
                Krama Madya
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    startGame({ mode: 'alus' }) 
                }}
                onKeyDown={ handleKeyDown }
            >
                Krama Alus
            </button>

            <button 
                className="p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl"
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    goToHome() 
                }}
                onKeyDown={ handleKeyDown }
            >
                Back to Home
            </button>
        </div>
    )
}

export default GameMenuInterface