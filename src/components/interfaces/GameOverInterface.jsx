const GameOverInterface = ({ startGame, goToMenu }) => {

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default space key action
        }
    }

    return (
        <>
            <h1 className='text-3xl text-sky-400 drop-shadow-lg font-bold'>CONGRATULATIONS</h1>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ startGame } onKeyDown={ handleKeyDown } >Retry</button>
            <button className='p-1 bg-stone-800/50 w-28 text-sm text-sky-100 font-semibold rounded-lg shadow-md' onClick={ goToMenu } onKeyDown={ handleKeyDown } >Back to Menu</button>
        </>
    )
}

export default GameOverInterface