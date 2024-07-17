import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { gameStates, useFirstGame } from './store/useFirstGame.jsx'


export function Level({ characterBody })
{
    const { level, currentStage, nextStage, gameState, mode, gameOver } = useFirstGame((state) => ({
        level: state.level,
        currentStage: state.currentStage,
        nextStage: state.nextStage,
        gameState: state.gameState,
        mode: state.mode,
        gameOver: state.gameOver
    }))

    const [inputBoxes, setInputBoxes] = useState([])
    const [correctCount, setCorrectCount] = useState(0)
    const [numberOfInput, setNumberOfInput] = useState(0)
    const [inputValues, setInputValues] = useState({})

    useEffect(() => {
        if(level) {
            setInputBoxes(level[currentStage])
            setNumberOfInput(level[currentStage].length)
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
                gameOver()
            }
        }
    }, [correctCount])

    const handleInputChange = (index, event) => {
        const newInputValues = { ...inputValues, [index]: event.target.value };
        setInputValues(newInputValues);
        
        if(mode === 'ngoko') {

            const inputValue = newInputValues[index].toLowerCase() 
            const levelInput = level[currentStage][index] // corecct answer based on the index

            // Compare input value with correct answer, if it's true
            if(inputValue === levelInput.ngoko.toLowerCase()) {
                // If it was false before, then increment the correctCount
                if(!levelInput.isCorrect) {
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