import { useRef, useState } from 'react'
import { useKeyboardControls, Edges, Outlines, useGLTF } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from '../Lights.jsx'
import FirstGame from './first-game/FirstGame.jsx'
import SecondGame from './second-game/SecondGame.jsx'
import PlayerController from "./PlayerController.jsx"
import { phases, useGame } from '../useGame.jsx'
import { useFrame } from '@react-three/fiber'
import { Controls } from '../App.jsx'

// IMPORT ENVIRONMENT
import World from './environment/World.jsx'
import Football from './environment/Football.jsx'

export default function Experience()
{
    // GO TO GAMES CONTROL
    const enterPressed = useKeyboardControls((state) => state[Controls.enter])
    const [ canGoToFirstGame, setCanGoToFirstGame ] = useState(false)
    
    const pinkBox = useRef()

    const { phase, goToFirstGame } = useGame((state) => ({
        phase: state.phase,
        goToFirstGame: state.goToFirstGame
    }))

    useFrame(() => {
        if(enterPressed && canGoToFirstGame) {
            goToFirstGame()
        }
    })

    // LOAD MODELS
    const football = useGLTF('./models/environment/football.glb')
    
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

            {/* Pink Box */}
            <RigidBody 
                type="fixed" 
                name="Pink Box"
            >
                    <mesh ref={ pinkBox } position={ [-8, 0.5, 5] } scale={ [1, 1, 1] } castShadow receiveShadow >
                        <boxGeometry />
                        <meshStandardMaterial color="hotpink" />

                        {/* WHITE BRIGHT EDGES */}
                        { canGoToFirstGame && <Edges linewidth={5} threshold={15} color={ [1000, 1000, 1000] } /> }
                        { canGoToFirstGame && <Outlines thickness={0.01} color={ [1, 1, 1] } /> }
                    </mesh>

                    { 
                        pinkBox.current !== undefined && 
                        <CuboidCollider
                            args={ pinkBox.current.scale.toArray() }
                            sensor
                            position={ pinkBox.current.position.toArray() }
                            onIntersectionEnter={ () => { setCanGoToFirstGame(true) }}
                            onIntersectionExit={ () => { setCanGoToFirstGame(false) }}
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

            {/* Fences */}
            {/* <Fences scale={ 0.55 } /> */}

            {/* Football */}
            <RigidBody colliders="ball" position={ [-3, 5, 12] } restitution={ 0.65 } friction={ 1.5 } >
                {/* <primitive object={ football.scene } scale={ 0.3 } castShadow receiveShadow /> */}
                <Football scale={ 0.3 } /> 
            </RigidBody>

            {/* END ENVIRONEMT */}

            {/* Invisible Collider */}
            <RigidBody type='fixed'>
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ -9.5, 0.75, 0 ] } />
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ 10.3, 0.75, 0 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, -18.8 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, 18.8 ] } />
            </RigidBody>

            {/* PLAYER */}
            {/* { phase === phases.FREE && <PlayerController ref={ player } /> } */}
            <PlayerController />

            {/* FIRST GAME */}
            { phase === phases.FIRST_GAME && <FirstGame /> }

            {/* SECOND GAME */}
            { phase === phases.SECOND_GAME && <SecondGame /> }

        </Physics>

    </>
}