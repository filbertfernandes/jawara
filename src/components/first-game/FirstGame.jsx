import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import Character from './Character.jsx'
import { useFirstGame } from './store/useFirstGame.jsx'

export function FirstGame()
{
    const { camera } = useThree()

    const { cameraPosition } = useFirstGame((state) => ({
        cameraPosition: state.cameraPosition
    }))

    useEffect((state) => {
        camera.position.x = cameraPosition.x
        camera.position.y = cameraPosition.y
        camera.position.z = cameraPosition.z
    }, [cameraPosition])

    return <>
        
        <Character scale={ 0.2 } position={ [0, 0, 0] } />
                
    </>

}