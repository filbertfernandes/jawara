import { RigidBody } from "@react-three/rapier"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"

import { useSecondGame } from "./stores/useSecondGame.jsx"

// SOUND MANAGER
import { SoundManager } from "../../SoundManager.jsx"

export default function BlockAxe({ coloredBlock, index }) {
  const { correctAnswersOrder, correctCount, incrementCorrectCount } =
    useSecondGame((state) => ({
      correctAnswersOrder: state.correctAnswersOrder,
      correctCount: state.correctCount,
      incrementCorrectCount: state.incrementCorrectCount,
    }))

  const obstacle = useRef()

  // State to hold timeOffset and speedFactor
  const [timeOffset, setTimeOffset] = useState(Math.random() * Math.PI * 2)
  const [speedFactor, setSpeedFactor] = useState(Math.random() + 0.5)

  useEffect(() => {
    // Update timeOffset and speedFactor when coloredBlock changes
    setTimeOffset(Math.random() * Math.PI * 2)
    setSpeedFactor(Math.random() + 0.5)
  }, [coloredBlock])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const x = Math.sin(time * speedFactor + timeOffset) * 6.5
    obstacle.current.setNextKinematicTranslation({
      x: x,
      y: 0.5,
      z: -6 - index * 3,
    })
  })

  return (
    <RigidBody
      ref={obstacle}
      type="kinematicPosition"
      position={[0, 0.5, -6 - index * 3]}
      restitution={0.2}
      friction={0}
      onCollisionEnter={(other) => {
        if (
          correctAnswersOrder[correctCount] === index &&
          other.rigidBodyObject.name === "SecondGameMarble"
        ) {
          SoundManager.playSound("correctAnswer")
          incrementCorrectCount()
        }
      }}
    >
      <mesh scale={[1, 1, 1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={coloredBlock.hexColor} />
      </mesh>
    </RigidBody>
  )
}
