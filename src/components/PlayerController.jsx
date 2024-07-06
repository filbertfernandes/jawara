import * as THREE from 'three'
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import Player from './Player.jsx'
import { Controls } from '../App.jsx'
import { usePlayer } from './PlayerContext.jsx'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3

export const PlayerController = () => {
    const jumpPressed = useKeyboardControls((state) => state[Controls.jump])
    const leftPressed = useKeyboardControls((state) => state[Controls.left])
    const rightPressed = useKeyboardControls((state) => state[Controls.right])
    const backPressed = useKeyboardControls((state) => state[Controls.back])
    const forwardPressed = useKeyboardControls((state) => state[Controls.forward])

    const rigidBody = useRef()
    const isOnFloor = useRef(true)
    const player = usePlayer()

    useFrame((state) => {
        const impulse = { x: 0, y: 0, z: 0 }
        if (jumpPressed && isOnFloor.current) {
            impulse.y += JUMP_FORCE
            isOnFloor.current = false
        }

        const linvel = rigidBody.current.linvel()
        let changeRotation = false
        if (rightPressed && linvel.x < MAX_VEL) {
            impulse.x += MOVEMENT_SPEED
            changeRotation = true
        }
        if (leftPressed && linvel.x > -MAX_VEL) {
            impulse.x -= MOVEMENT_SPEED
            changeRotation = true
        }
        if (backPressed && linvel.z < MAX_VEL) {
            impulse.z += MOVEMENT_SPEED
            changeRotation = true
        }
        if (forwardPressed && linvel.z > -MAX_VEL) {
            impulse.z -= MOVEMENT_SPEED
            changeRotation = true
        }

        rigidBody.current.applyImpulse(impulse, true)

        if (changeRotation) {
            const angle = Math.atan2(linvel.x, linvel.z)
            player.current.rotation.y = angle
        }

        // CAMERA FOLLOW
        const playerWorldPosition = player.current.getWorldPosition(new THREE.Vector3())
        state.camera.position.x = playerWorldPosition.x
        state.camera.position.y = 5
        state.camera.position.z = playerWorldPosition.z + 6

        const targetLookAt = new THREE.Vector3(playerWorldPosition.x, playerWorldPosition.y + 1.5, playerWorldPosition.z)

        state.camera.lookAt(targetLookAt)
    })

    return (
        <group>

            <RigidBody 
                ref={ rigidBody } 
                colliders={ false } 
                scale={ [0.5, 0.5, 0.5] } 
                enabledRotations={ [false, false, false] }
                onCollisionEnter={() => {
                    isOnFloor.current = true;
                }}
            >
                <CapsuleCollider args={ [0.8, 0.4] } position={ [0, 1.2, 0] } />
                <group ref={ player }>
                    <Player scale={ 0.4 } />
                </group>
            </RigidBody>

        </group>
    )
}