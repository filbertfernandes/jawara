import { useKeyboardControls, Edges, Outlines, Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

import { useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function GamePortal({ phase, portalPosition, game }) {
  const portal = useRef();

  // GO TO GAMES CONTROL
  const [subscribeKeys] = useKeyboardControls();

  const { changePhase, canChangePhase, setCanChangePhase, setCanPressEnter } =
    useGame((state) => ({
      changePhase: state.changePhase,
      canChangePhase: state.canChangePhase,
      setCanChangePhase: state.setCanChangePhase,
      setCanPressEnter: state.setCanPressEnter,
    }));

  useEffect(() => {
    const unsubscribeEnter = subscribeKeys(
      (state) => state.enter,

      (value) => {
        if (value && canChangePhase.condition && canChangePhase.phase !== "") {
          SoundManager.playSound("buttonClick");
          changePhase(canChangePhase.phase);
          setCanPressEnter(false);
          setCanChangePhase(false, "");
        }
      }
    );

    return () => {
      unsubscribeEnter();
    };
  });

  return (
    <>
      <Text
        position={[portalPosition[0], 0.75, portalPosition[2] + 0.76]}
        fontSize={0.45}
        color="white"
        font="./fonts/bebas-neue-v9-latin-regular.woff"
      >
        {game}
      </Text>

      {/* GAME PORTAL */}
      <RigidBody type="fixed">
        <mesh ref={portal} position={portalPosition} scale={[1.5, 2, 1.5]}>
          <boxGeometry />
          <meshStandardMaterial color="rgb(249, 115, 22)" />

          {/* WHITE BRIGHT EDGES */}
          {canChangePhase.condition && canChangePhase.phase === phase && (
            <>
              <Edges linewidth={5} threshold={15} color={[1000, 1000, 1000]} />
              <Outlines thickness={0.01} color={[1, 1, 1]} />
            </>
          )}
        </mesh>

        {/* SENSOR */}
        {portal.current !== undefined && portal.current !== null && (
          <>
            <CuboidCollider
              args={portal.current.scale.toArray()}
              sensor
              position={portal.current.position.toArray()}
              onIntersectionEnter={(other) => {
                if (other.rigidBodyObject.name === "Player") {
                  setCanPressEnter(true);
                  setCanChangePhase(true, phase);
                }
              }}
              onIntersectionExit={(other) => {
                if (other.rigidBodyObject.name === "Player") {
                  setCanPressEnter(false);
                  setCanChangePhase(false, "");
                }
              }}
            />
          </>
        )}
      </RigidBody>
    </>
  );
}
