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

// IMPORT ENVIRONMENT
import Tree01 from './environment/Tree01.jsx'
import Flower01 from './environment/Flower01.jsx'

export default function Experience()
{
    // GO TO GAMES CONTROL
    const enterPressed = useKeyboardControls((state) => state[Controls.enter])
    const [ canGoToFirstGame, setCanGoToFirstGame ] = useState(false)
    
    const orbitControls = useRef()
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

        {/* PERF */}
        <Perf position="bottom-right" />

        {/* BACKGROUND COLOR */}
        <color args={ ['#ccf2fc'] } attach="background" />

        {/* ORBIT CONTROLS */}
        <OrbitControls
            ref={ orbitControls }
            makeDefault 
            enablePan={ false } 
            enableZoom={ true }
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 1.65} // Limit vertical panning (up-down)
            minPolarAngle={0}
            maxDistance={5} // Limit zoom out
            minDistance={1} // Limit zoom in
        />

        {/* FLOOR */}
        <RigidBody type="fixed">
                <mesh position={ [0, -0.1, 0] } scale={ [20, 0.2, 40] } receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="#4ec206" />
                </mesh>
        </RigidBody>

        {/* ENVIRONMENT */}

        {/* Pink Box */}
        <RigidBody 
            type="fixed" 
            name="Pink Box"
        >
                <mesh ref={ pinkBox } position={ [-4, 0.5, 5] } scale={ [1, 1, 1] } castShadow receiveShadow >
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

        {/* Tree */}
        <RigidBody type='fixed' colliders={ false } position={ [-4, 0, -12] }>
            <Tree01 scale={ 2 } />
            <CuboidCollider args={ [0.6, 3, 0.6] } />
        </RigidBody>

        {/* Flower */}
        <Flower01 position={ [0, 0, 0] } scale={ 2 }/>
        <Flower01 position={ [1, 0, 0] } scale={ 2 }/>
        <Flower01 position={ [2, 0, 0] } scale={ 2 }/>

        {/* END ENVIRONEMT */}

        {/* LIGHTS */}
        <Lights />

        {/* PLAYER */}
        {/* { phase === phases.FREE && <PlayerController ref={ player } /> } */}
        <PlayerController />

        {/* FIRST GAME */}
        { phase === phases.FIRST_GAME && <FirstGame orbitControls={ orbitControls } /> }

    </>
}