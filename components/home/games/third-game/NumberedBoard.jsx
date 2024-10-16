import { RigidBody } from "@react-three/rapier"
import { SoundManager } from "@/lib/SoundManager.jsx"
import { Text } from "@react-three/drei"
import { useThirdGame } from "./stores/useThirdGame"

export default function NumberedBoard({ position, number, index }) {
  const { correctAnswersOrder, answerCount, incrementAnswerCount } =
    useThirdGame((state) => ({
      correctAnswersOrder: state.correctAnswersOrder,
      answerCount: state.answerCount,
      incrementAnswerCount: state.incrementAnswerCount,
    }))

  return (
    <>
      <Text
        position={[position[0], 0.11, position[2]]}
        fontSize={1.2}
        color="black"
        rotation-x={-Math.PI / 2}
      >
        {number}
      </Text>

      <RigidBody
        type="fixed"
        onCollisionEnter={(other) => {
          if (other.rigidBodyObject.name === "ThirdGameMarble") {
            if (correctAnswersOrder[answerCount] === index) {
              SoundManager.playSound("correctAnswer")
            }
            incrementAnswerCount()
          }
        }}
      >
        <mesh position={position} scale={[2.2, 0.1, 2.2]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>
    </>
  )
}
