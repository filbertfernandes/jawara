import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import Character from './Character.jsx'
import { useFirstGame } from './store/useFirstGame.jsx'

export function BodyParts()
{
    // const startGame = useFirstGame((state) => state.startGame)
    
    // useEffect(() => {
    //     startGame({ mode: 'ngoko' })
    // }, [])

    return <>
        
        <Character scale={ 0.2 } position={ [0, 0, 0] } />
                
    </>

}