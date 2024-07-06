import { useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useRapier, Physics, CuboidCollider, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from '../Lights.jsx'
import { BodyParts } from './first-game/BodyParts.jsx'
import { PlayerController } from "./PlayerController.jsx"
import { phases, useGame } from '../useGame.jsx'
import { usePlayer } from './PlayerContext.jsx'

export default function Experience()
{
    const playerRef = usePlayer()
    
    useEffect(() => {
        if (playerRef.current) {
            console.log('Player component:', playerRef.current)
        }
    }, [playerRef])

    const { phase } = useGame((state) => ({
        phase: state.phase
    }))

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

        {/* LIGHTS */}
        <Lights />

        {/* PLAYER */}
        { phase === phases.FREE && <PlayerController /> }

        {/* FIRST GAME */}
        { phase === phases.FIRST_GAME && <BodyParts /> }

    </>
}