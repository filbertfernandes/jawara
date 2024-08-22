import { useGame } from "../../useGame.jsx"

const GameMenuInterface = ({ startGame }) => {

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
        <div className="flex flex-col justify-center items-center gap-6 w-full h-[75%]">
            <h1 className='text-4xl text-sky-400 drop-shadow-lg font-bold'>Anggota Tubuh</h1>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'ngoko' }) } onKeyDown={ handleKeyDown } >Ngoko</button>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'madya' }) } onKeyDown={ handleKeyDown } >Krama Madya</button>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ () => startGame({ mode: 'alus' }) } onKeyDown={ handleKeyDown } >Krama Alus</button>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ goToHome } onKeyDown={ handleKeyDown } >Back to Home</button>
        </div>
    )
}

export default GameMenuInterface