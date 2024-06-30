import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import Character from './Character.jsx'

export function BodyParts()
{

    return <>
        <RigidBody type="fixed">
                <mesh position={ [0, -0.1, 0] } scale={ [4, 0.2, 4] } receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
        </RigidBody>

        <Character scale={ 0.2 } position={ [0, 0, 0] } />
                
    </>
}