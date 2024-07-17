import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import Character from './Character.jsx'
import { useFirstGame } from './store/useFirstGame.jsx'

export function FirstGame({ orbitControls })
{
    const { camera } = useThree()

    const { cameraPosition } = useFirstGame((state) => ({
        cameraPosition: state.cameraPosition
    }))

    useEffect(() => {
        camera.position.x = cameraPosition.x
        camera.position.y = cameraPosition.y
        camera.position.z = cameraPosition.z

        orbitControls.current.target.set(0, 1, 0)
        orbitControls.current.update()
    }, [cameraPosition])

    return <>
        
        <Character scale={ 0.2 } position={ [0, 0, 0] } />
                
    </>

}