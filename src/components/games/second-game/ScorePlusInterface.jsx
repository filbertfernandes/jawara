import { useRef, useEffect, useState } from 'react'
import { useSecondGame } from './stores/useSecondGame'

const ScorePlusInterface = () => {
    const timeoutId = useRef(null)

    const [isVisible, setIsVisible] = useState(false)
    const [scoreBefore, setScoreBefore] = useState(0)
    const [scoreDifferent, setScoreDifferent] = useState(0)

    const { score } = useSecondGame((state) => ({
        score: state.score,
    }))

    useEffect(() => {
        if (score <= 0) return
            
        // Clear any existing timeout to avoid overlap
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        // Trigger the animation
        setIsVisible(false) // Reset visibility to restart the animation
        requestAnimationFrame(() => {
            setIsVisible(true)
        })
        
        // Set a new timeout to hide the animation after 4000ms
        timeoutId.current = setTimeout(() => {
            setIsVisible(false)
        }, 3000)

        // Handle score plus UI
        setScoreDifferent(score - scoreBefore)
        setScoreBefore(score)
    }, [score])

    return (
        <div className={ `flex justify-center items-center font-bebas text-5xl text-white text-center pointer-events-none absolute top-0 left-0 h-full w-full md:text-6xl lg:text-8xl ${isVisible ? 'animate-bounceInFadeOut' : 'opacity-0'}` }>
            <div>+{ scoreDifferent }</div>
        </div>
    )
}

export default ScorePlusInterface
