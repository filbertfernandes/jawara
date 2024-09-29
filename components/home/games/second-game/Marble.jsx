import { RigidBody, useRapier } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import * as THREE from "three"

// ZUSTAND
import { useGame, gameStates } from "@/hooks/useGame.jsx"
import { useSecondGame } from "./stores/useSecondGame"

// SOUND MANAGER
import { SoundManager } from "@/lib/SoundManager.jsx"

const MARBLE_INITIAL_POSITION = new THREE.Vector3(0, 0, 4)
const MARBLE_ALLOW_PUSH_POSITION_LIMIT = MARBLE_INITIAL_POSITION.z - 3

export default function Marble() {
  const marbleBody = useRef()
  const timeoutId = useRef(null)
  const isMounted = useRef(true) // Track component mount status

  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { rapier, world } = useRapier()

  const [smoothCameraPosition] = useState(
    () => new THREE.Vector3(0, 0.65, MARBLE_INITIAL_POSITION.z + 3.5)
  ) // set camera initial position to 0 0.65 7.5
  const [smoothCameraTarget] = useState(() => new THREE.Vector3(0, 0.25, 3.5))

  // GAME STATE
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }))

  const { mobileLeft, mobileRight, score, resetCombo } = useSecondGame(
    (state) => ({
      mobileLeft: state.mobileLeft,
      mobileRight: state.mobileRight,
      score: state.score,
      resetCombo: state.resetCombo,
    })
  )

  const reset = () => {
    if (timeoutId.current) resetCombo() // reset combo if marble didn't hit correct answer

    if (marbleBody.current) {
      marbleBody.current.setTranslation(MARBLE_INITIAL_POSITION)
      marbleBody.current.setLinvel({ x: 0, y: 0, z: 0 })
      marbleBody.current.setAngvel({ x: 0, y: 0, z: 0 })
    }
  }

  const jump = () => {
    const origin = marbleBody.current.translation()
    origin.y -= 0.31 // add a little 0.01 so it slightly below the player. The player size is 0.3.

    const direction = { x: 0, y: -1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
    const hit = world.castRay(ray, 10, true)

    if (hit.toi < 0.15) marbleBody.current.applyImpulse({ x: 0, y: 0.7, z: 0 })
  }

  const push = () => {
    if (
      !(marbleBody.current.translation().z >= MARBLE_ALLOW_PUSH_POSITION_LIMIT)
    )
      return

    clearTimeout(timeoutId.current)
    timeoutId.current = null

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6
    const torqueStrength = 0.2

    impulse.z -= impulseStrength * 5
    torque.x -= torqueStrength * 5

    SoundManager.playSound("marblePush")
    marbleBody.current.applyImpulse(impulse)
    marbleBody.current.applyTorqueImpulse(torque)

    timeoutId.current = setTimeout(() => {
      if (isMounted.current) {
        reset()
      }
    }, 3000)
  }

  useEffect(() => {
    isMounted.current = true

    const unsubscribeJump = subscribeKeys(
      // selector -> i want to listen to any changes on the key. In this case, a jump key. The changes is between false or true. If it was pressed, it's true.
      (state) => state.jump,

      // when changes happened, it will call this function below. Run jump() when true
      (isJump) => {
        if (isJump) jump() // when isJump true (pressed)
      }
    )

    const unsubscribePush = subscribeKeys(
      (state) => state.forward,

      (isPush) => {
        if (isPush) push()
      }
    )

    const unsubscribeMobileJump = useSecondGame.subscribe(
      (state) => state.mobileJump,
      (isJump) => {
        if (isJump) jump()
      }
    )

    const unsubscribeMobilePush = useSecondGame.subscribe(
      (state) => state.mobilePush,
      (isPush) => {
        if (isPush) push()
      }
    )

    // this part will be called whenever we need to clean things
    return () => {
      isMounted.current = false
      unsubscribeJump()
      unsubscribePush()
      unsubscribeMobileJump()
      unsubscribeMobilePush()
      clearTimeout(timeoutId.current)
    }
  }, [])

  useEffect(() => {
    if (gameState !== gameStates.GAME) return

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
    }

    reset()
  }, [score, gameState])

  useFrame((state, delta) => {
    if (!isMounted.current || !marbleBody.current) return

    /**
     * Controls
     */
    const { left, right } = getKeys()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (left || mobileLeft) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }

    if (right || mobileRight) {
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
    cameraPosition.z = MARBLE_INITIAL_POSITION.z + 3.5
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
    if (marbleBodyPosition.y < -4) reset()
  })

  return (
    <RigidBody
      ref={marbleBody}
      name="SecondGameMarble"
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={MARBLE_INITIAL_POSITION}
      onCollisionEnter={() =>
        SoundManager.playSoundAfterFinished("marbleImpact")
      }
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="tan" />
      </mesh>
    </RigidBody>
  )
}
