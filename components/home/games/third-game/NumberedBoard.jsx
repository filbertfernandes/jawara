import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { SoundManager } from "@/lib/SoundManager.jsx"
import { Text } from "@react-three/drei"
import { useThirdGame } from "./stores/useThirdGame"

const NUMBERED_BOARD_SIZE = [2.2, 0.2, 2.2]

export default function NumberedBoard({
  position,
  word,
  isAnswered,
  isCorrect,
  index,
}) {
  const {
    correctAnswersOrder,
    answerCount,
    incrementAnswerCount,
    incrementScore,
    decrementScore,
    setIsCorrect,
    setIsAnswered,
  } = useThirdGame((state) => ({
    correctAnswersOrder: state.correctAnswersOrder,
    answerCount: state.answerCount,
    incrementAnswerCount: state.incrementAnswerCount,
    incrementScore: state.incrementScore,
    decrementScore: state.decrementScore,
    setIsCorrect: state.setIsCorrect,
    setIsAnswered: state.setIsAnswered,
  }))

  return (
    <>
      <Text
        position={[position[0], 0.11, position[2]]}
        fontSize={1.2}
        color="black"
        rotation-x={-Math.PI / 2}
      >
        {word.english}
      </Text>

      <mesh position={position} scale={NUMBERED_BOARD_SIZE}>
        <boxGeometry />
        <meshStandardMaterial
          color={!isAnswered ? "lightgrey" : !isCorrect ? "red" : "green"}
        />
      </mesh>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[
            NUMBERED_BOARD_SIZE[0] / 2,
            NUMBERED_BOARD_SIZE[1] / 2,
            NUMBERED_BOARD_SIZE[2] / 2,
          ]}
          sensor
          position={position}
          onIntersectionEnter={(other) => {
            if (
              other.rigidBodyObject.name === "ThirdGameMarble" &&
              !isAnswered
            ) {
              if (correctAnswersOrder[answerCount] === index) {
                setIsCorrect(index)
                SoundManager.playSound("correctAnswer")
                incrementScore()
              } else {
                SoundManager.playSound("wrongAnswer")
                decrementScore()
              }
              setIsAnswered(index)
              incrementAnswerCount()
            }
          }}
        />
      </RigidBody>
    </>
  )
}
