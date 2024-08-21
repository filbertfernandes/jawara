import { Canvas } from '@react-three/fiber'
import { useMemo, useState } from "react"
import { KeyboardControls } from "@react-three/drei"

import Experience from './components/Experience.jsx'
import { phases, useGame } from './useGame.jsx'
import Joystick from './components/Joystick.jsx'
import useIsMobile from './useIsMobile.jsx'

// INTERFACES
import { FirstGameInterface } from './components/first-game/FirstGameInterface.jsx'
import { SecondGameInterface } from './components/second-game/SecondGameInterface.jsx'
import FreePhaseInterface from './components/FreePhaseInterface.jsx'

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
    enter: 'enter'
}

export default function App()
{
    // MAIN GAME STATE
    const { phase } = useGame((state) => ({
        phase: state.phase
    }))

    // KEYBOARD
    const map = useMemo(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
        { name: Controls.enter, keys: ['Enter'] },
    ], [])

    // JOYSTICK
    const [joystickInput, setJoystickInput] = useState({ x: 0, y: 0 })
    const isMobile = useIsMobile()

    const handleJoystickMove = (input) => {
        setJoystickInput(input)
    }

    return (
        <KeyboardControls map={ map }>
            {/* 3D CANVAS */}
            <Canvas
                shadows
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 0, 1, 3 ]
                } }
            >
                <Experience joystickInput={ joystickInput } />
            </Canvas>

            {/* JOYSTICK */}
            { isMobile && phase === phases.FREE && <Joystick onMove={ handleJoystickMove } /> }
            
            {/* INTERFACES */}
            { phase === phases.FREE && <FreePhaseInterface /> }
            { phase === phases.FIRST_GAME && <FirstGameInterface /> }
            { phase === phases.SECOND_GAME && <SecondGameInterface /> }


        </KeyboardControls>
    )
}