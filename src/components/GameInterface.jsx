import { useGame } from '../useGame.jsx'

export default function GameInterface()
{
    const { canPressEnter, canGoToFirstGame, goToFirstGame, canGoToSecondGame, goToSecondGame } = useGame((state) => ({
        canPressEnter: state.canPressEnter,
        canGoToFirstGame: state.canGoToFirstGame,
        goToFirstGame: state.goToFirstGame,
        canGoToSecondGame: state.canGoToSecondGame,
        goToSecondGame: state.goToSecondGame,
    }))
    
    const goToGame = () => {
        if(canGoToFirstGame) goToFirstGame()
        
        else if(canGoToSecondGame) goToSecondGame()
    }

    return (
        <>
            {/* ENTER */}
            <div
                className={ `press-enter-box ${canPressEnter === false ? 'hidden' : ''}` }
            >
                <div className={ `press-enter` } onClick={ goToGame }>
                    Enter
                </div>
            </div>
        </>
    )

}
