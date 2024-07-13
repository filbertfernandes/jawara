import { useEffect, useRef, useState } from 'react'
import { useKeyboardControls, Edges, Html, OrbitControls, Outlines } from '@react-three/drei'
import { useRapier, Physics, CuboidCollider, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from '../Lights.jsx'
import { FirstGame } from './first-game/FirstGame.jsx'
import { PlayerController } from "./PlayerController.jsx"
import { phases, useGame } from '../useGame.jsx'
import { useFrame } from '@react-three/fiber'
import { Controls } from '../App.jsx'

export default function Experience()
{
    // GO TO GAMES CONTROL
    const enterPressed = useKeyboardControls((state) => state[Controls.enter])
    const [ canGoToFirstGame, setCanGoToFirstGame ] = useState(false)
    
    const pinkBox = useRef()

    const { phase, goToFirstGame } = useGame((state) => ({
        phase: state.phase,
        goToFirstGame: state.goToFirstGame
    }))

    useFrame(() => {
        if(enterPressed && canGoToFirstGame) {
            goToFirstGame()
        }
    })
    
    return <>

        <Perf position="top-left" />

        {/* BACKGROUND COLOR */}
        <color args={ ['#ccf2fc'] } attach="background" />

        <OrbitControls 
            makeDefault 
            enablePan={ true } 
            enableZoom={ true }
            target={[0, 1, 0]}
        />

        <RigidBody type="fixed">
                <mesh position={ [0, -0.1, 0] } scale={ [12, 0.2, 12] } receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
        </RigidBody>

        <RigidBody 
            type="fixed" 
            name="Pink Box"
        >
                <mesh ref={ pinkBox } position={ [-1, 0.5, 3.5] } scale={ [1, 1, 1] } castShadow receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="hotpink" />

                    {/* WHITE BRIGHT EDGES */}
                    { canGoToFirstGame && <Edges linewidth={5} threshold={15} color={ [1000, 1000, 1000] } /> }
                    { canGoToFirstGame && <Outlines thickness={0.01} color={ [1, 1, 1] } /> }
                </mesh>

                { 
                    pinkBox.current !== undefined && 
                    <CuboidCollider
                        args={ pinkBox.current.scale.toArray() }
                        sensor
                        position={ pinkBox.current.position.toArray() }
                        onIntersectionEnter={ () => { setCanGoToFirstGame(true) }}
                        onIntersectionExit={ () => { setCanGoToFirstGame(false) }}
                    /> 
                }
        </RigidBody>

        {/* LIGHTS */}
        <Lights />

        {/* PLAYER */}
        {/* { phase === phases.FREE && <PlayerController ref={ player } /> } */}
        <PlayerController />

        {/* FIRST GAME */}
        { phase === phases.FIRST_GAME && <FirstGame /> }

    </>
}