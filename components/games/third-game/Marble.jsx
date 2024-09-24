import { useRapier, RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
// import useGame from "./stores/useGame.jsx"

export default function Marble()
{
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const [ smoothCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10)) // set the initial position to 10 10 10
    const [ smoothCameraTarget ] = useState(() => new THREE.Vector3())

    const jump = () => {
        const origin = body.current.translation()
        origin.y -= 0.31 // add a little 0.01 so it slightly below the player. The player size is 0.3.

        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if(hit.toi < 0.15)
            body.current.applyImpulse({ x: 0, y: 0.7, z: 0 })
    }

    const reset = () => {
        body.current.setTranslation({ x: 0, y: 1, z: 0 })
        body.current.setLinvel({ x: 0, y: 0, z: 0 })
        body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useEffect(() => {
        // const unsubscribeReset = useGame.subscribe(
        //     (state) => state.phase,
        //     (phase) => {
        //         console.log('phase changed to', phase);

        //         if(phase === 'ready')
        //             reset()
        //     }
        // )

        const unsubscribeJump = subscribeKeys(
            // selector -> i want to listen to any changes on the key. In this case, a jump key. The changes is between false or true
            (state) => state.jump,

            // when changes happened, it will call this function below. Run jump() when true
            (isJump) => {
                if(isJump) jump()
            }
        )

        // to change the phase from start to playing. the selector is any key on the KeyboardControls we defined in index.jsx, so we only have to put 1 argument which is the function
        // const unsubscribeAny = subscribeKeys(
        //     () => {
        //         start()
        //     }
        // )

        // this part will be called whenever we need to clean things
        return () => {
            // unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    useFrame((state, delta) => {
        /**
         * Controls
         */
        const { forward, back, left, right } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if(forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if(back) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if(left) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        if(right) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 5
        cameraPosition.y += 2

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.5

        // make it smooth
        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)

        /**
         * Phases
         */
        if(bodyPosition.y < -4)
            restart()

    })

    return <RigidBody 
        ref={ body } 
        canSleep={ false } 
        colliders="ball" 
        restitution={ 0.2 } 
        friction={ 1 } 
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
        position={ [0, 1, 0] }
    >
        <mesh castShadow>
            <icosahedronGeometry args={ [0.3, 1] } />
            <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
    </RigidBody>
}