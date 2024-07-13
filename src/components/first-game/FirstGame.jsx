import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import Character from './Character.jsx'
import { useFirstGame } from './store/useFirstGame.jsx'

export function FirstGame()
{
    const { camera } = useThree()

    useEffect((state) => {
        camera.position.x = 0
        camera.position.y = 1
        camera.position.z = 3
    }, [])

    return <>
        
        <Character scale={ 0.2 } position={ [0, 0, 0] } />
                
    </>

}