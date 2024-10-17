import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import Character from "./Character.jsx"
import { useFirstGame } from "./stores/useFirstGame.jsx"
import "./stores/firstGame.css"

export default function FirstGame() {
  const orbitControls = useRef()

  const { camera } = useThree()

  const { cameraPosition } = useFirstGame((state) => ({
    cameraPosition: state.cameraPosition,
  }))

  useEffect(() => {
    camera.position.x = cameraPosition.x
    camera.position.y = cameraPosition.y
    camera.position.z = cameraPosition.z

    orbitControls.current.target.set(0, 1, 0)
    orbitControls.current.update()
  }, [cameraPosition])

  return (
    <>
      {/* ORBIT CONTROLS */}
      <OrbitControls
        ref={orbitControls}
        makeDefault
        enablePan={false}
        enableZoom={true}
        target={[0, 1, 0]}
        maxPolarAngle={Math.PI / 1.78} // Limit vertical panning (up-down)
        minPolarAngle={0}
        maxDistance={5} // Limit zoom out
        minDistance={1} // Limit zoom in
      />

      <Character scale={0.2} position={[0, 0, 0]} />
    </>
  )
}
