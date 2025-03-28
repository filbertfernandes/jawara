import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useThirdGame } from "./stores/useThirdGame";

import { useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

const MARBLE_INITIAL_POSITION = new THREE.Vector3(0, 0, -5);

export default function Marble() {
  const marbleBody = useRef();
  const isMounted = useRef(true); // Track component mount status

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  // GAME STATE
  const { gameState, joystickInput } = useGame((state) => ({
    gameState: state.gameState,
    joystickInput: state.joystickInput,
  }));

  const { stage } = useThirdGame((state) => ({
    stage: state.stage,
  }));

  const reset = () => {
    if (marbleBody.current) {
      marbleBody.current.setTranslation(MARBLE_INITIAL_POSITION);
      marbleBody.current.setLinvel({ x: 0, y: 0, z: 0 });
      marbleBody.current.setAngvel({ x: 0, y: 0, z: 0 });
    }
  };

  const jump = () => {
    const origin = marbleBody.current.translation();
    origin.y -= 0.31; // add a little 0.01 so it slightly below the player. The player size is 0.3.

    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.641)
      marbleBody.current.applyImpulse({ x: 0, y: 0.8, z: 0 });
  };

  useEffect(() => {
    isMounted.current = true;

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,

      (isJump) => {
        if (isJump) jump();
      }
    );

    const unsubscribeMobileJump = useThirdGame.subscribe(
      (state) => state.mobileJump,
      (isJump) => {
        if (isJump) jump();
      }
    );

    return () => {
      isMounted.current = false;
      unsubscribeJump();
      unsubscribeMobileJump();
    };
  }, []);

  useEffect(() => {
    reset();
  }, [gameState, stage]);

  useFrame((state, delta) => {
    if (!isMounted.current || !marbleBody.current) return;

    /**
     * Controls
     */
    const { forward, back, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.65 * delta;
    const torqueStrength = 0.25 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (back) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (joystickInput) {
      const { x, y } = joystickInput;
      const distance = Math.sqrt(x * x + y * y); // Computes the Euclidean distance from the center to the joystick's current position

      if (distance > 0) {
        const angle = Math.atan2(x, y); // Computes the angle in radians from the x and y values. This angle indicates the direction of movement.
        const normalizedX = Math.cos(angle);
        const normalizedZ = Math.sin(angle);

        // Apply impulse
        impulse.x -= normalizedX * impulseStrength;
        impulse.z -= normalizedZ * impulseStrength;

        // Apply torque (to mimic rolling behavior)
        torque.x -= normalizedZ * torqueStrength; // Rotate based on forward/backward movement
        torque.z += normalizedX * torqueStrength; // Rotate based on left/right movement
      }
    }

    marbleBody.current.applyImpulse(impulse);
    marbleBody.current.applyTorqueImpulse(torque);

    if (marbleBody.current.translation().y < -4) reset();
  });

  return (
    <RigidBody
      ref={marbleBody}
      name="ThirdGameMarble"
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
        <meshStandardMaterial flatShading color="orangered" />
      </mesh>
    </RigidBody>
  );
}
