import { useEffect } from "react"
import { useFourthGame } from "./stores/useFourthGame"
import { gameStates, useGame } from "@/hooks/useGame"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

const Level = () => {
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const {
    stage,
    nextStage,
    answerCount,
    correctAnswersOrder,
    incrementAnswerCount,
  } = useFourthGame((state) => ({
    stage: state.stage,
    nextStage: state.nextStage,
    answerCount: state.answerCount,
    correctAnswersOrder: state.correctAnswersOrder,
    incrementAnswerCount: state.incrementAnswerCount,
  }))

  useEffect(() => {
    if (!stage) return

    if (answerCount < stage.length) {
      if (stage[correctAnswersOrder[answerCount]].isAnswered) {
        incrementAnswerCount()
      }
    }

    if (answerCount === stage.length) {
      nextStage()
    }
  }, [answerCount])

  return (
    <>
      {stage !== null &&
        gameState === gameStates.GAME &&
        stage.map((s, index) => (
          <>
            <RigidBody
              key={index}
              type="kinematicPosition"
              colliders={false}
              scale={1}
              enabledRotations={[false, false, false]}
              position={s.position}
              position-y={
                s.word.rigidPositionY ? s.word.rigidPositionY : s.position[1]
              }
              rotation-y={Math.PI * Math.random()}
            >
              <CuboidCollider
                args={s.word.colliderSize}
                position={s.word.colliderPosition}
              />
              {s.word.model}
            </RigidBody>
          </>
        ))}
    </>
  )
}

export default Level
