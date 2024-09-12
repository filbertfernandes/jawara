import { useEffect, useMemo, useState } from "react"

// ZUSTAND
import { gameStates, useGame } from "../../../useGame.jsx"
import { useSecondGame } from "./stores/useSecondGame.jsx"
import BlockAxe from "./BlockAxe.jsx"

export default function Level({ types = [ BlockAxe ] })
{
    const { gameState } = useGame((state) => ({
        gameState: state.gameState,
    }))
    
    const { stage, nextStage, correctCount } = useSecondGame((state) => ({
        stage: state.stage,
        score: state.score,
        nextStage: state.nextStage,
        correctCount: state.correctCount
    }))

    const [coloredBlocks, setColoredBlocks] = useState([])

    useEffect(() => {
        if(!stage) return
            
        setColoredBlocks(stage)
        stage.map((word) => {
            word.isCorrect = false
        })
    }, [stage])

    useEffect(() => {
        if(!stage) return
        
        if(correctCount === stage.length) {
            nextStage()
        }
    }, [correctCount])

    const blocks = useMemo(() => {
        const blocks = []

        for(let i = 0; i < coloredBlocks.length; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks
    }, [types, coloredBlocks])

    return <>        

        {
            stage !== null && 
            gameState === gameStates.GAME && 
            blocks.map(
                (Block, index) => <Block key={ index } coloredBlock={ coloredBlocks[index] } index={ index } />
            ) 
        }
                
    </>

}