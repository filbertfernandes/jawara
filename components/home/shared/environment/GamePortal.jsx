import {
  useKeyboardControls,
  Edges,
  Outlines,
  Text,
  Decal,
} from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";

import { phases, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function GamePortal({
  portalPhase,
  textPosition,
  portalPosition,
  portalScale = [1.5, 2, 1.5],
  portalColor = "rgb(249, 115, 22)",
  portalImage = null,
  game,
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  const portal = useRef();

  // GO TO GAMES CONTROL
  const [subscribeKeys] = useKeyboardControls();

  const {
    phase,
    changePhase,
    canChangePhase,
    setCanChangePhase,
    canPressEnter,
    setCanPressEnter,
  } = useGame((state) => ({
    phase: state.phase,
    changePhase: state.changePhase,
    canChangePhase: state.canChangePhase,
    setCanChangePhase: state.setCanChangePhase,
    canPressEnter: state.canPressEnter,
    setCanPressEnter: state.setCanPressEnter,
  }));

  useEffect(() => {
    const unsubscribeEnter = subscribeKeys(
      (state) => state.enter,

      (value) => {
        if (value && canChangePhase.condition && canChangePhase.phase !== "") {
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
        position={textPosition}
        fontSize={0.45}
        color="white"
        font="./fonts/bebas-neue-v9-latin-regular.woff"
      >
        {game}
      </Text>

      {/* GAME PORTAL */}
      <RigidBody type="fixed">
        <mesh
          ref={portal}
          position={portalPosition}
          scale={portalScale}
          onPointerOver={() => {
            if (phase !== phases.FREE) return;

            if (
              !canChangePhase.condition ||
              canChangePhase.phase === portalPhase
            ) {
              setCanChangePhase(true, portalPhase);
              setHovered(true);
            }
          }}
          onPointerOut={() => {
            if (hovered) {
              setHovered(false);
              if (!canPressEnter) {
                setCanChangePhase(false, "");
              }
            }
          }}
          onClick={() => {
            if (hovered) {
              changePhase(portalPhase);
            }
          }}
        >
          <boxGeometry />
          <meshStandardMaterial color={portalColor} />

          {portalImage && (
            <Decal
              position={[-0.299, 0.1249, 0.15]} // Position of the decal
              rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
              scale={[0.4, 0.75, 0.7]} // Scale of the decal
            >
              <meshBasicMaterial
                map={portalImage}
                polygonOffset
                polygonOffsetFactor={-1} // The material should take precedence over the original
              />
            </Decal>
          )}

          {/* WHITE BRIGHT EDGES */}
          {((canChangePhase.condition &&
            canChangePhase.phase === portalPhase) ||
            hovered) &&
            phase === phases.FREE && (
              <>
                <Edges
                  linewidth={5}
                  threshold={15}
                  color={[1000, 1000, 1000]}
                />
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
                  setCanChangePhase(true, portalPhase);
                }
              }}
              onIntersectionExit={(other) => {
                if (other.rigidBodyObject.name === "Player") {
                  setCanPressEnter(false);
                  setCanChangePhase(false, "");
                  setHovered(false);
                }
              }}
            />
          </>
        )}
      </RigidBody>
    </>
  );
}
