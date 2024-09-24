"use client"

import { Canvas } from "@react-three/fiber"
import { useMemo, useState } from "react"
import { KeyboardControls } from "@react-three/drei"

import Experience from "@/components/Experience.jsx"
import { phases, useGame } from "@/hooks/useGame.jsx"
import Joystick from "@/components/Joystick.jsx"
import useIsMobile from "@/hooks/useIsMobile.jsx"

// INTERFACES
import { FirstGameInterface } from "@/components/games/first-game/FirstGameInterface.jsx"
import { SecondGameInterface } from "@/components/games/second-game/SecondGameInterface.jsx"
import FreePhaseInterface from "@/components/interfaces/FreePhaseInterface.jsx"

// IMPORT CONTROLS CONSTANTS
import { Controls } from "@/utils/constants.js"

export default function App() {
  // GAME PHASE
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }))

  // KEYBOARD
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.enter, keys: ["Enter"] },
    ],
    []
  )

  // JOYSTICK
  const [joystickInput, setJoystickInput] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  const handleJoystickMove = (input) => {
    setJoystickInput(input)
  }

  // INTERFACES MAPPING
  const gameInterfaces = {
    [phases.FREE]: <FreePhaseInterface />,
    [phases.FIRST_GAME]: <FirstGameInterface />,
    [phases.SECOND_GAME]: <SecondGameInterface />,
  }

  return (
    <KeyboardControls map={map}>
      {/* 3D CANVAS */}
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
        }}
      >
        <Experience joystickInput={joystickInput} />
      </Canvas>

      {/* JOYSTICK */}
      {isMobile && phase === phases.FREE && (
        <Joystick onMove={handleJoystickMove} />
      )}

      {/* INTERFACES */}
      {gameInterfaces[phase]}
    </KeyboardControls>
  )
}
