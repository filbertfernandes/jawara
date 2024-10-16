import { RigidBody } from "@react-three/rapier"
import { SoundManager } from "@/lib/SoundManager.jsx"
import { Text } from "@react-three/drei"

export default function NumberedBoard({ position, number }) {
  console.log(number)

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

      <RigidBody type="fixed">
        <mesh position={position} scale={[2.2, 0.2, 2.2]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>
    </>
  )
}
