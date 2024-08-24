import { useEffect, useRef } from 'react'
import { useKeyboardControls, Edges, Outlines } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

import { useGame } from '../../useGame.jsx'

// sound manager
import { SoundManager } from '../SoundManager.jsx'

export default function GamePortal({ phase, portalPosition })
{
    const portal = useRef()

    // GO TO GAMES CONTROL
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    const { changePhase, canChangePhase, setCanChangePhase, setCanPressEnter } = useGame((state) => ({
        changePhase: state.changePhase,
        canChangePhase: state.canChangePhase,
        setCanChangePhase: state.setCanChangePhase,
        setCanPressEnter: state.setCanPressEnter,
    }))

    useEffect(() => {
        const unsubscribeEnter = subscribeKeys(
            (state) => state.enter,

            (value) => {
                if(value && canChangePhase.condition && canChangePhase.phase != '') {
                    SoundManager.playSound('buttonClick')
                    changePhase(canChangePhase.phase)
                    setCanPressEnter(false)
                    setCanChangePhase(false, '')
                }
            }
        )

        return () => {
            unsubscribeEnter()
        }
    })

    return <>

        {/* Game Boxex */}
        <RigidBody type="fixed" >
                <mesh ref={ portal } position={ portalPosition } scale={ [1, 1, 1] } castShadow receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="hotpink" />

                    {/* WHITE BRIGHT EDGES */}
                    {canChangePhase.condition && canChangePhase.phase === phase && (
                        <>
                            <Edges linewidth={5} threshold={15} color={[1000, 1000, 1000]} />
                            <Outlines thickness={0.01} color={[1, 1, 1]} />
                        </>
                    )}
                </mesh>

                {/* SENSOR */}
                { 
                    portal.current !== undefined && 
                    <CuboidCollider
                        args={ portal.current.scale.toArray() }
                        sensor
                        position={ portal.current.position.toArray() }
                        onIntersectionEnter={ (other) => { 
                            if(other.rigidBodyObject.name === 'Player') {
                                setCanPressEnter(true)
                                setCanChangePhase(true, phase) 
                            }
                        }}
                        onIntersectionExit={ (other) => { 
                            if(other.rigidBodyObject.name === 'Player') {
                                setCanPressEnter(false)
                                setCanChangePhase(false, '') 
                            }
                        }}
                    /> 
                }
        </RigidBody>

    </>
}