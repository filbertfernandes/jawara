import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'

import { useGame, gameStates } from "../../../useGame.jsx"
import { useFirstGame } from './stores/useFirstGame.jsx'

// SOUND MANAGER
import { SoundManager } from '../../SoundManager.jsx'

export function Level({ characterBody })
{
    const { gameState, changeGameState } = useGame((state) => ({
        gameState: state.gameState,
        changeGameState: state.changeGameState
    }))

    const { level, currentStage, nextStage, mode, gameOver } = useFirstGame((state) => ({
        level: state.level,
        currentStage: state.currentStage,
        nextStage: state.nextStage,
        mode: state.mode,
        gameOver: state.gameOver
    }))

    const [inputBoxes, setInputBoxes] = useState([]) // all questions (input box need to be filled)
    const [correctCount, setCorrectCount] = useState(0) // correct counts (used for checking when run nextStage or game over)
    const [inputValues, setInputValues] = useState({}) // input values, used to update correct count

    useEffect(() => {
        if(level) {
            setInputBoxes(level[currentStage])
            setCorrectCount(0)
            setInputValues({})
            level[currentStage].map((word, index) => {
                word.isCorrect = false
            })
        }

        if(level && Object.keys(inputValues).length === 0) {
            const totalInputs = level[currentStage].length
            for(let i = 0; i < totalInputs; i++) {
                inputValues[i] = ''
            }
        }
    }, [level, currentStage])

    useEffect(() => {
        if(level) {
            if(correctCount === level[currentStage].length && currentStage < 4) {
                nextStage()
            } else if(correctCount === level[currentStage].length) {
                SoundManager.playSound('gameComplete')
                changeGameState(gameStates.GAME_OVER)
                gameOver()
            }
        }
    }, [correctCount])

    const handleInputChange = (index, event) => {
        SoundManager.playSound('keyboardType')

        const newInputValues = { ...inputValues, [index]: event.target.value };
        setInputValues(newInputValues);
        
        const inputValue = newInputValues[index].toLowerCase() 
        const levelInput = level[currentStage][index] // corecct answer based on the index
        
        // Compare input value with correct answer, if it's true
        if(inputValue === levelInput[mode].toLowerCase()) {
            // If it was false before, then increment the correctCount
            if(!levelInput.isCorrect) {
                SoundManager.playSound('correctAnswer')
                setCorrectCount(prevCount => prevCount + 1)
                levelInput.isCorrect = true
            }
            
        }
        
        else {
            // if it was true before, then decrement the correctCount.
            if(levelInput && levelInput.isCorrect) {
                setCorrectCount(prevCount => prevCount - 1)
                levelInput.isCorrect = false
            }
        }
    }

    const handleNumberHover = (index) => {
        const newInputBoxes = [...inputBoxes]
        newInputBoxes[index].visible = true
        setInputBoxes(newInputBoxes)
    }

    const handleNumberClick = (index) => {
        const newInputBoxes = [...inputBoxes]
        newInputBoxes[index].visible = !newInputBoxes[index].visible
        setInputBoxes(newInputBoxes)
    }

    return <>
        
        {/* HTML */}
        {level !== null && gameState === gameStates.GAME && inputBoxes.map((box, index) => (
            <Html
                key={ index }
                position={ box.position }
                wrapperClass="label"
                distanceFactor={ 1.2 }
                occlude={ [characterBody] }
            >
                <div className={ `number ${box.isCorrect ? 'number-green' : ''}` } onMouseEnter={ () => handleNumberHover(index) } onClick={ () => handleNumberClick(index) }>
                    {index + 1}
                </div>
                <div className= {`input-box ${box.visible ? 'visible' : ''} ${box.isCorrect ? 'input-box-green' : ''}` }>
                    <input 
                        type="text" 
                        value={ inputValues[index] || '' } 
                        onChange={ (event) => handleInputChange(index, event) } 
                    />
                </div>
            </Html>
        ))}
                
    </>

}