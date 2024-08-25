// sound manager
import { SoundManager } from '../SoundManager.jsx'

const GameOverInterface = ({ score, startGame, goToMenu }) => {

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full h-[90%]">

            <div className="text-center">
                <h1 className='text-4xl text-sky-400 drop-shadow-lg font-bold lg:text-6xl'>CONGRATULATIONS!</h1>
                <h5 className='text-xl text-sky-400 drop-shadow-lg font-bold lg:text-3xl'>Your score is { score }</h5>
            </div>

            <button 
                className='p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl' 
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    startGame({ mode: '' })
                } }
                onKeyDown={ handleKeyDown } 
            >
                Retry
            </button>

            <button 
                className='p-1 bg-stone-800/50 w-28 text-sm text-white font-semibold rounded-lg shadow-md lg:p-1.5 lg:w-52 lg:text-3xl'
                onClick={ () => {
                    SoundManager.playSound('buttonClick')
                    goToMenu()
                } }
                onKeyDown={ handleKeyDown } 
            >
                Back to Menu
            </button>

        </div>
    )
}

export default GameOverInterface