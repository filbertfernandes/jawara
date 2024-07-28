import { RigidBody, useRapier } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
import { gameStates, useSecondGame } from "./stores/useSecondGame"

export default function Marble()
{
    const marbleBody = useRef()
    const timeoutId = useRef(null);
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const [ smoothCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10)) // set the initial position to 10 10 10
    const [ smoothCameraTarget ] = useState(() => new THREE.Vector3())

    // SECOND GAME STATE
    const { mobileLeft, mobileRight, score, gameState } = useSecondGame((state) => ({
        mobileLeft: state.mobileLeft,
        mobileRight: state.mobileRight,
        score: state.score,
        gameState: state.gameState,
    }))

    const reset = () => {
        // setTranslation to put it back at the origin
        // setLinvel to remove any translation force
        // setAngvel to remove any angular forc

        if(timeoutId.current !== null) {
            clearTimeout(timeoutId.current)
            timeoutId.current = null
        }
        marbleBody.current.setTranslation({ x: 0, y: 1, z: 3.5 })
        marbleBody.current.setLinvel({ x: 0, y: 0, z: 0 })
        marbleBody.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    const jump = () => {
        const origin = marbleBody.current.translation()
        origin.y -= 0.31 // add a little 0.01 so it slightly below the player. The player size is 0.3.

        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if(hit.toi < 0.15)
            marbleBody.current.applyImpulse({ x: 0, y: 0.7, z: 0 })
    }

    const push = () => {
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6
        const torqueStrength = 0.2

        impulse.z -= impulseStrength * 5
        torque.x -= torqueStrength * 5

        const marbleBodyPosition = marbleBody.current.translation()

        if(marbleBodyPosition.z >= -5.3) {
            marbleBody.current.applyImpulse(impulse)
            marbleBody.current.applyTorqueImpulse(torque)

            timeoutId.current = setTimeout(() => {
                reset()
            }, 3000)
        }
    }

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            // selector -> i want to listen to any changes on the key. In this case, a jump key. The changes is between false or true. If it was pressed, it's true.
            (state) => state.jump,

            // when changes happened, it will call this function below. Run jump() when true
            (isJump) => {
                if(isJump) jump() // when isJump true (pressed)
            }
        )

        const unsubscribePush = subscribeKeys(
            (state) => state.forward,

            (isPush) => {
                if(isPush) push()
            }
        )

        const unsubscribeMobileJump = useSecondGame.subscribe(
            (state) => state.mobileJump,
            (isJump) => {
                if(isJump) jump()
            }
        )
        
        const unsubscribeMobilePush = useSecondGame.subscribe(
            (state) => state.mobilePush,
            (isPush) => {
                if(isPush) push()
            }
        )

        // this part will be called whenever we need to clean things
        return () => {
            unsubscribeJump()
            unsubscribePush()
            unsubscribeMobileJump()
            unsubscribeMobilePush()
        }
    }, [])

    useEffect(() => {
        if(score > 0) {
            reset()
        }
    }, [score])

    useEffect(() => {
        if(gameState === gameStates.GAME) {
            reset()
        }
    }, [gameState])

    useFrame((state, delta) => {
        /**
         * Controls
         */
        const { left, right } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta
        
        if(left || mobileLeft) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        if(right || mobileRight) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        marbleBody.current.applyImpulse(impulse)
        marbleBody.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const marbleBodyPosition = marbleBody.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(marbleBodyPosition)
        cameraPosition.z = 7
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(marbleBodyPosition)
        cameraTarget.y += 0.25

        // make it smooth
        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)

        /**
         * Phases
         */
        if(marbleBodyPosition.y < -4)
            reset()

    })

    return <RigidBody 
        ref={ marbleBody } 
        canSleep={ false } 
        colliders="ball" 
        restitution={ 0.2 } 
        friction={ 1 } 
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
        position={ [0, 1, 3.5] }
    >
        <mesh castShadow>
            <icosahedronGeometry args={ [0.3, 1] } />
            <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
    </RigidBody>
}