import { OrbitControls } from '@react-three/drei'
import { Physics, CuboidCollider, RigidBody } from '@react-three/rapier'

import Lights from '../Lights.jsx'
import { BodyParts } from './first-game/BodyParts.jsx'

export default function Experience()
{
    return <>

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