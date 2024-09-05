import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Lights from './Lights.jsx'
import FirstGame from './games/first-game/FirstGame.jsx'
import SecondGame from './games/second-game/SecondGame.jsx'
import ThirdGame from './games/third-game/ThirdGame.jsx'
import PlayerController from "./PlayerController.jsx"
import { phases, useGame } from '../useGame.jsx'

// IMPORT ENVIRONMENT
import GamePortal from './environment/GamePortal.jsx'
import World from './environment/World.jsx'
import Football from './environment/Football.jsx'

// SOUND MANAGER
import useBackgroundMusic from '../hooks/useBackgroundMusic.jsx'

export default function Experience({ joystickInput })
{
    const { phase } = useGame((state) => ({
        phase: state.phase,
    }))

    useBackgroundMusic(phase)

    const gamePhaseComponentMap = {
        [phases.FIRST_GAME]: <FirstGame />,
        [phases.SECOND_GAME]: <SecondGame />,
        [phases.THIRD_GAME]: <ThirdGame />,
    }

    return <>

        {/* PERF */}
        <Perf position="bottom-right" />

        {/* BACKGROUND COLOR */}
        <color args={ ['#ccf2fc'] } attach="background" />

        {/* LIGHTS */}
        <Lights />

        <Physics debug={ false } >

            {/* FIXED RIGID BODIES */}
            <RigidBody type='fixed'>
                {/* FLOOR */}
                <mesh position={ [0, -0.1, 0] } scale={ [200, 0.2, 400] } receiveShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="#89CB1F" />
                </mesh>

                {/* INVISIBLE COLLIDER */}
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ -9.6, 0.75, 0 ] } />
                <CuboidCollider args={ [0.2, 0.75, 22] } position={ [ 10.35, 0.75, 0 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, -18.8 ] } />
                <CuboidCollider args={ [10, 0.75, 0.2] } position={ [ 0, 0.75, 18.8 ] } />
            </RigidBody>

            {/* ENVIRONMENT */}
            <World scale={0.55} position={ [0, -0.4, 0] } />
            <GamePortal phase={ phases.FIRST_GAME } portalPosition={ [-8, 0.5, 8] } />
            <GamePortal phase={ phases.SECOND_GAME } portalPosition={ [-4, 0.5, 8] } />

            {/* Soccer Ball */}
            <RigidBody 
                colliders="ball" 
                position={ [-3, 5, 12] } 
                restitution={ 0.65 } 
                friction={ 1.5 }
                onCollisionEnter={ () => SoundManager.playSoundAfterFinished('soccerBallImpact') }
            >
                <Football scale={0.3} />
            </RigidBody>
            {/* END ENVIRONEMT */}

            {/* PLAYER */}
            <PlayerController joystickInput={ joystickInput } />

            {/* PHASES */}
            { gamePhaseComponentMap[phase] }

        </Physics>

    </>
}