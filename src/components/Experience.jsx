import { useRef } from 'react'
import { useKeyboardControls, Edges, Outlines } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from '../Lights.jsx'
import FirstGame from './first-game/FirstGame.jsx'
import SecondGame from './second-game/SecondGame.jsx'
import ThirdGame from './third-game/ThirdGame.jsx'
import PlayerController from "./PlayerController.jsx"
import { phases, useGame } from '../useGame.jsx'
import { useFrame } from '@react-three/fiber'

// IMPORT ENVIRONMENT
import World from './environment/World.jsx'
import Football from './environment/Football.jsx'

export default function Experience({ joystickInput })
{
    // GO TO GAMES CONTROL
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    
    const firstGameBox = useRef()
    const secondGameBox = useRef()

    const { phase, goToFirstGame, goToSecondGame, setCanPressEnter, canGoToFirstGame, setCanGoToFirstGame, canGoToSecondGame, setCanGoToSecondGame } = useGame((state) => ({
        phase: state.phase,
        goToFirstGame: state.goToFirstGame,
        goToSecondGame: state.goToSecondGame,
        setCanPressEnter: state.setCanPressEnter,
        canGoToFirstGame: state.canGoToFirstGame,
        setCanGoToFirstGame: state.setCanGoToFirstGame,
        canGoToSecondGame: state.canGoToSecondGame,
        setCanGoToSecondGame: state.setCanGoToSecondGame,
    }))

    useFrame(() => {
        const { enter } = getKeys()

        if(enter && canGoToFirstGame) {
            setCanGoToFirstGame(false)
            goToFirstGame()
        }
        
        else if(enter && canGoToSecondGame) {
            setCanGoToSecondGame(false)
            goToSecondGame()
        }
    })

    return <>

        {/* PERF */}
        <Perf position="bottom-right" />

        {/* BACKGROUND COLOR */}
        <color args={ ['#ccf2fc'] } attach="background" />

        {/* LIGHTS */}
        <Lights />


        <Physics debug={ false } >

            {/* FLOOR */}
            <RigidBody type="fixed">
                    <mesh position={ [0, -0.1, 0] } scale={ [200, 0.2, 400] } receiveShadow >
                        <boxGeometry />
                        <meshStandardMaterial color="#89CB1F" transparent opacity={ 1 } />
                    </mesh>
            </RigidBody>

            {/* ENVIRONMENT */}

            {/* World */}
            <World scale={0.55} position={ [0, -0.4, 0] } />

            {/* Game Boxex */}
            <RigidBody 
                type="fixed" 
            >
                    <mesh ref={ firstGameBox } position={ [-8, 0.5, 8] } scale={ [1, 1, 1] } castShadow receiveShadow >
                        <boxGeometry />
                        <meshStandardMaterial color="hotpink" />

                        {/* WHITE BRIGHT EDGES */}
                        { canGoToFirstGame && <Edges linewidth={5} threshold={15} color={ [1000, 1000, 1000] } /> }
                        { canGoToFirstGame && <Outlines thickness={0.01} color={ [1, 1, 1] } /> }
                    </mesh>

                    { 
                        firstGameBox.current !== undefined && 
                        <CuboidCollider
                            args={ firstGameBox.current.scale.toArray() }
                            sensor
                            position={ firstGameBox.current.position.toArray() }
                            onIntersectionEnter={ (other) => { 
                                if(other.rigidBodyObject.name === 'Player') {
                                    setCanPressEnter(true)
                                    setCanGoToFirstGame(true) 
                                }
                            }}
                            onIntersectionExit={ (other) => { 
                                if(other.rigidBodyObject.name === 'Player') {
                                    setCanPressEnter(false)
                                    setCanGoToFirstGame(false) 
                                }
                            }}
                        /> 
                    }
            </RigidBody>

            <RigidBody 
                type="fixed" 
            >
                    <mesh ref={ secondGameBox } position={ [-4, 0.5, 8] } scale={ [1, 1, 1] } castShadow receiveShadow >
                        <boxGeometry />
                        <meshStandardMaterial color="purple" />

                        {/* WHITE BRIGHT EDGES */}
                        { canGoToSecondGame && <Edges linewidth={5} threshold={15} color={ [1000, 1000, 1000] } /> }
                        { canGoToSecondGame && <Outlines thickness={0.01} color={ [1, 1, 1] } /> }
                    </mesh>

                    { 
                        secondGameBox.current !== undefined && 
                        <CuboidCollider
                            args={ secondGameBox.current.scale.toArray() }
                            sensor
                            position={ secondGameBox.current.position.toArray() }
                            onIntersectionEnter={ (other) => { 
                                if(other.rigidBodyObject.name === 'Player') {
                                    setCanPressEnter(true)
                                    setCanGoToSecondGame(true) 
                                }
                            }}
                            onIntersectionExit={ (other) => { 
                                if(other.rigidBodyObject.name === 'Player') {
                                    setCanPressEnter(false)
                                    setCanGoToSecondGame(false) 
                                }
                            }}
                        /> 
                    }
            </RigidBody>

            {/* Tree */}
            {/* <RigidBody type='fixed' colliders={ false } position={ [-4, 0, -12] }>
                <Tree01 scale={ 2 } />
                <CuboidCollider args={ [0.6, 3, 0.6] } />
            </RigidBody> */}

            {/* Flower */}
            {/* <Flower01 position={ [0, 0, 0] } scale={ 2 }/> */}

            {/* Football */}
            <RigidBody colliders="ball" position={ [-3, 5, 12] } restitution={ 0.65 } friction={ 1.5 } >
                <Football scale={ 0.3 } /> 
            </RigidBody>

            {/* END ENVIRONEMT */}

            {/* Invisible Collider */}
            <RigidBody type='fixed'>
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ -9.6, 0.75, 0 ] } />
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ 10.35, 0.75, 0 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, -18.8 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, 18.8 ] } />
            </RigidBody>

            {/* PLAYER */}
            {/* { phase === phases.FREE && <PlayerController ref={ player } /> } */}
            <PlayerController joystickInput={ joystickInput } />

            {/* GAME PHASES */}
            { phase === phases.FIRST_GAME && <FirstGame /> }
            { phase === phases.SECOND_GAME && <SecondGame /> }
            { phase === phases.THIRD_GAME && <ThirdGame /> }

        </Physics>

    </>
}