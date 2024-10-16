import React from "react"
import NumberedBoard from "./NumberedBoard"
import { useThirdGame } from "./stores/useThirdGame"
import { gameStates, useGame } from "@/hooks/useGame"

const Level = () => {
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const { stage } = useThirdGame((state) => ({
    stage: state.stage,
  }))

  return (
    <>
      {stage !== null &&
        gameState === gameStates.GAME &&
        stage.map((s, index) => (
          <NumberedBoard
            key={index}
            position={s.position}
            number={s.word.english}
            index={index}
          />
        ))}
    </>
  )
}

export default Level
