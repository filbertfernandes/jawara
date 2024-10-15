import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { SoundManager } from "@/lib/SoundManager.jsx"

export default function NumberedBoard({ position }) {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={position} scale={[2.2, 0.3, 2.2]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>
    </>
  )
}
