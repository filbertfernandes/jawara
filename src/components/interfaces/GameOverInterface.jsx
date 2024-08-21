const GameOverInterface = ({ startGame, goToMenu }) => {

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full h-[75%]">
            <h1 className='text-4xl text-sky-400 drop-shadow-lg font-bold'>CONGRATULATIONS!</h1>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ startGame } onKeyDown={ handleKeyDown } >Retry</button>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ goToMenu } onKeyDown={ handleKeyDown } >Back to Menu</button>
        </div>
    )
}

export default GameOverInterface