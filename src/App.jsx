import { Canvas } from '@react-three/fiber'
import { useMemo } from "react"
import { KeyboardControls } from "@react-three/drei"

import Experience from './components/Experience.jsx'
import { FirstGameInterface } from './components/first-game/FirstGameInterface.jsx'
import { phases, useGame } from './useGame.jsx'

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
}

export default function App()
{
    // MAIN GAME STATE
    const { phase } = useGame((state) => ({
        phase: state.phase
    }))

    const map = useMemo(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
        { name: Controls.enter, keys: ['Enter'] },
    ], [])

    return (
        <KeyboardControls map={ map }>

            <Canvas
                shadows
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 0, 1, 3 ]
                } }
            >
                <Experience />
            </Canvas>

            { phase === phases.FIRST_GAME && <FirstGameInterface /> }

        </KeyboardControls>
    )
}