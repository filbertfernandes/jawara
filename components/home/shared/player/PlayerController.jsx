import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Vector3 } from "three";

import { Avatar } from "@/components/home/avatar/Avatar.jsx";
import controls from "@/constants/controls.js";
import { phases, gameStates, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export const PLAYER_INITIAL_POSITION = { x: 2, y: 0.5, z: 18 };
const JUMP_FORCE = 2.7;
const MOVEMENT_SPEED = 0.4;
const MAX_VEL = 4.2;
const RUN_VEL = 2;

// Reusable vector instances
const playerWorldPosition = new Vector3();
const targetLookAt = new Vector3();

// Debounced footstep sound
let footstepTimer;
const playFootstepSound = () => {
  clearTimeout(footstepTimer);
  footstepTimer = setTimeout(() => {
    SoundManager.playSound("move");
  }, 50);
};

export default function PlayerController() {
  const isPortraitMobile = useMediaQuery({ maxWidth: 768 });

  const {
    playerState,
    setPlayerState,
    phase,
    gameState,
    setPlayerPosition,
    joystickInput,
  } = useGame((state) => ({
    playerState: state.playerState,
    setPlayerState: state.setPlayerState,
    phase: state.phase,
    gameState: state.gameState,
    setPlayerPosition: state.setPlayerPosition,
    joystickInput: state.joystickInput,
  }));

  const jumpPressed = useKeyboardControls((s) => s[controls.JUMP]);
  const leftPressed = useKeyboardControls((s) => s[controls.LEFT]);
  const rightPressed = useKeyboardControls((s) => s[controls.RIGHT]);
  const backPressed = useKeyboardControls((s) => s[controls.BACK]);
  const forwardPressed = useKeyboardControls((s) => s[controls.FORWARD]);

  const rigidBody = useRef();
  const isOnFloor = useRef(true);
  const player = useRef();

  const resetPlayer = () => {
    const offsetZ = phase === phases.FREE ? 0 : -10;
    rigidBody.current.setTranslation({
      x: PLAYER_INITIAL_POSITION.x,
      y: PLAYER_INITIAL_POSITION.y,
      z: PLAYER_INITIAL_POSITION.z + offsetZ,
    });
    rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 });
    rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    if (phase === phases.FOURTH_GAME && gameState === gameStates.GAME) {
      resetPlayer();
    }
  }, [gameState]);

  useFrame((state) => {
    const rb = rigidBody.current;
    if (!rb) return;

    if (
      phase !== phases.FREE &&
      phase !== phases.FOURTH_GAME &&
      phase !== phases.AVATAR_CUSTOMIZATION
    )
      return;

    player.current.getWorldPosition(playerWorldPosition);
    setPlayerPosition({ ...playerWorldPosition });

    if (phase === phases.AVATAR_CUSTOMIZATION) return;

    const linvel = rb.linvel();
    const impulse = { x: 0, y: 0, z: 0 };
    let shouldRotate = false;

    if (jumpPressed && isOnFloor.current) {
      impulse.y = JUMP_FORCE;
      isOnFloor.current = false;
    }

    const shouldPlayFootstep = isOnFloor.current && playerState !== "idle";

    const moveIf = (condition, axis, value) => {
      if (condition) {
        impulse[axis] += value;
        shouldRotate = true;
        if (shouldPlayFootstep) playFootstepSound();
      }
    };

    moveIf(rightPressed && linvel.x < MAX_VEL, "x", MOVEMENT_SPEED);
    moveIf(leftPressed && linvel.x > -MAX_VEL, "x", -MOVEMENT_SPEED);
    moveIf(backPressed && linvel.z < MAX_VEL, "z", MOVEMENT_SPEED);
    moveIf(forwardPressed && linvel.z > -MAX_VEL, "z", -MOVEMENT_SPEED);

    // Joystick
    if (
      joystickInput &&
      Math.abs(linvel.x) < MAX_VEL &&
      Math.abs(linvel.z) < MAX_VEL
    ) {
      const { x, y } = joystickInput;
      const magnitude = Math.sqrt(x * x + y * y);
      if (magnitude > 0) {
        const angle = Math.atan2(x, y);
        impulse.x -= MOVEMENT_SPEED * Math.cos(angle);
        impulse.z -= MOVEMENT_SPEED * Math.sin(angle);
        shouldRotate = true;
        if (shouldPlayFootstep) playFootstepSound();
      }
    }

    rb.applyImpulse(impulse, true);

    // State transition
    const isRunning =
      Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL;

    if (isRunning && playerState !== "run") {
      setPlayerState("run");
    } else if (!isRunning && playerState !== "idle" && playerState !== "talk") {
      setPlayerState("idle");
    }

    if (shouldRotate) {
      const angle = Math.atan2(linvel.x, linvel.z);
      player.current.rotation.y = angle;
    }

    if (rb.translation().y < -4) {
      resetPlayer();
    }

    // Camera follow
    const cam = state.camera;
    cam.position.set(
      playerWorldPosition.x,
      playerWorldPosition.y + (isPortraitMobile ? 5 : 3),
      playerWorldPosition.z + (isPortraitMobile ? 10 : 5.5)
    );

    targetLookAt.set(
      playerWorldPosition.x,
      playerWorldPosition.y + (isPortraitMobile ? 2 : 1.6),
      playerWorldPosition.z
    );

    cam.lookAt(targetLookAt);
  });

  useEffect(() => {
    let talkTimer;

    if (playerState === "idle") {
      talkTimer = setInterval(() => {
        setPlayerState("talk");
        setTimeout(() => {
          if (playerState !== "run") setPlayerState("idle");
        }, 4100);
      }, 5000);
    }

    return () => clearInterval(talkTimer);
  }, [playerState]);

  useEffect(() => {
    if (!rigidBody.current) return;

    if (phase === phases.AVATAR_CUSTOMIZATION) {
      player.current.rotation.y = 0;
    }

    if (phase === phases.LAPTOP) {
      rigidBody.current.setTranslation({ x: -10.5, y: 0.5, z: 7 });
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 });
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 });
    }
  }, [phase]);

  return (
    <group>
      <RigidBody
        ref={rigidBody}
        name="Player"
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        position={[
          PLAYER_INITIAL_POSITION.x,
          PLAYER_INITIAL_POSITION.y,
          PLAYER_INITIAL_POSITION.z,
        ]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
      >
        <CapsuleCollider args={[1.15, 0.65]} position={[0, 1.8, 0]} />
        <group ref={player}>
          <Avatar scale={1.7} />
        </group>
      </RigidBody>
    </group>
  );
}
