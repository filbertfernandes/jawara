import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

import Marble from "./Marble.jsx"
import Level from "./Level.jsx"

export default function ThirdGame() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.x = 0
    camera.position.y = 12
    camera.position.z = 8

    camera.lookAt(0, 2, -3)
  }, [])

  return (
    <>
      <Marble />
      <Level />
    </>
  )
}
