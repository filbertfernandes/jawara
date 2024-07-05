import { OrbitControls } from '@react-three/drei'
import { Physics, CuboidCollider, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from '../Lights.jsx'
import { BodyParts } from './first-game/BodyParts.jsx'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <color args={ ['#ccf2fc'] } attach="background" />

        <OrbitControls 
            makeDefault 
            enablePan={ true } 
            enableZoom={ true }
            target={[0, 1, 0]}
        />

        <Physics debug={ true }>
            <Lights />

            <BodyParts />
        </Physics>

    </>
}