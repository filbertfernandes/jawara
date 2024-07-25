import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";

import { gameStates, useSecondGame } from "./stores/useSecondGame.jsx";
import { useFrame } from "@react-three/fiber";

export function BlockAxe ({ coloredBlock, index }) 
{
    const { correctAnswersOrder, correctCount, incrementCorrectCount } = useSecondGame((state) => ({
        correctAnswersOrder: state.correctAnswersOrder,
        correctCount: state.correctCount,
        incrementCorrectCount: state.incrementCorrectCount
    }))

    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)
    const speedFactor = Math.random() + 0.5

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const x = Math.sin(time * speedFactor + timeOffset) * 6.5
        obstacle.current.setNextKinematicTranslation({ x: x, y: 0.5, z: -6 - (index * 3) })
    })
    
    return <RigidBody 
                ref={ obstacle } 
                type="kinematicPosition" 
                position={ [0, 0.5, -6 - (index * 3)] } 
                restitution={ 0.2 } 
                friction={ 0 }
                onCollisionEnter={() => {
                    if(correctAnswersOrder[correctCount] === index) {
                        incrementCorrectCount()
                    }
                }}
            >
                <mesh scale={ [1, 1, 1] } castShadow receiveShadow>
                    <boxGeometry />
                    <meshStandardMaterial color={ coloredBlock.hexColor } />
                </mesh>
            </RigidBody>
}

export function Level({ types = [ BlockAxe ] })
{   
    const { stage, score, mode, gameState, nextStage, gameOver, correctCount } = useSecondGame((state) => ({
        stage: state.stage,
        score: state.score,
        nextStage: state.nextStage,
        gameState: state.gameState,
        mode: state.mode,
        gameOver: state.gameOver,
        correctCount: state.correctCount
    }))

    const [coloredBlocks, setColoredBlocks] = useState([])

    useEffect(() => {
        if(stage) {
            setColoredBlocks(stage)
            stage.map((word) => {
                word.isCorrect = false
            })
        }
    }, [stage])

    useEffect(() => {
        if(stage) {
            if(correctCount === stage.length) {
                nextStage()
            }
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

        {stage !== null && gameState === gameStates.GAME && blocks.map((Block, index) => <Block key={ index } coloredBlock={ coloredBlocks[index] } index={ index } />) }
                
    </>

}