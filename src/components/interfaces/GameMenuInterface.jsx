import { gameStates, useGame } from "../../useGame.jsx"

// INTERFACES
import GameTabsInterface from "./GameTabsInterface.jsx"
import GameSelectInterface from "./GameSelectInterface.jsx"
import GameOverInterface from "./GameOverInterface.jsx"
import GameLeaderboardInterface from "./GameLeaderboardInterface.jsx"
import GameMaterialInterface from "./GameMaterialInterface.jsx"

const GameMenuInterface = ({ startGame, title, words, score }) => {
    // GAME STATE
    const { gameState } = useGame((state) => ({
        gameState: state.gameState,
    }))

    const interfaceComponentMap = {
        [gameStates.MENU]: <GameSelectInterface startGame={ startGame } title={ title } />,
        [gameStates.LEADERBOARD]: <GameLeaderboardInterface />,
        [gameStates.MATERIAL]: <GameMaterialInterface words={ words } />,
        [gameStates.GAME_OVER]: <GameOverInterface score={ score } startGame={ startGame } />,
    }
    
    return (
        <div
            className={`dark-layout ${gameState === gameStates.GAME ? 'opacity-0 pointer-events-none' : ''}`}
        >
            {gameState !== gameStates.GAME_OVER ? (
                <div className="flex flex-col items-center w-full h-full sm:flex-row md:w-[90%] lg:w-[80%]">
                    <GameTabsInterface />
                    { interfaceComponentMap[gameState] }
                </div>
            ) : (
                interfaceComponentMap[gameState]
            )}
        </div>
    )
}

export default GameMenuInterface