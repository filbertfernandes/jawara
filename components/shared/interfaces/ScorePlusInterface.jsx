import { useRef, useEffect, useState } from "react"

const ScorePlusInterface = ({ score }) => {
  const timeoutId = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const [scoreBefore, setScoreBefore] = useState(0)
  const [scoreDifferent, setScoreDifferent] = useState(0)

  useEffect(() => {
    if (score - scoreBefore === 0) return

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
    <div
      className={`pointer-events-none absolute left-0 top-0 flex size-full items-center justify-center text-center font-bebas text-5xl md:text-6xl lg:text-8xl ${
        scoreDifferent > 0 ? "text-white" : "text-red-600"
      } ${isVisible ? "animate-bounceInFadeOut" : "opacity-0"}`}
    >
      <div>
        {scoreDifferent > 0 ? `+${scoreDifferent}` : `${scoreDifferent}`}
      </div>
    </div>
  )
}

export default ScorePlusInterface
