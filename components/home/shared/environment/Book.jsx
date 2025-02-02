import {
  Edges,
  Outlines,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { phases, useGame } from "@/hooks/useGame";

const Book = () => {
  const { nodes, materials } = useGLTF("./models/environment/book.glb");
  const [hovered, setHovered] = useState(false);
  const [isIntersect, setIsIntersect] = useState(false);

  const router = useRouter();

  const [subscribeKeys] = useKeyboardControls();

  const { phase, setCanPressEnter, canPressEnter, canChangePhase } = useGame(
    (state) => ({
      phase: state.phase,
      canPressEnter: state.canPressEnter,
      setCanPressEnter: state.setCanPressEnter,
      canChangePhase: state.canChangePhase,
    })
  );

  const goToCurriculum = () => {
    setCanPressEnter(false);
    router.push("/curriculum");
  };

  // Handle cursor change with useEffect
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  useEffect(() => {
    const unsubscribeEnter = subscribeKeys(
      (state) => state.enter,

      (value) => {
        if (
          value &&
          canPressEnter &&
          !canChangePhase.condition &&
          canChangePhase.phase === ""
        ) {
          goToCurriculum();
        }
      }
    );

    return () => {
      unsubscribeEnter();
    };
  });

  return (
    <group dispose={null} scale={3.2}>
      <group
        position={[-2.301, 0.426, 1.752]}
        rotation={[-Math.PI, 0.273, -Math.PI]}
        scale={0.112}
      >
        <RigidBody type="fixed" colliders="trimesh" density={7} restitution={0}>
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials["Material.001"]}
            onPointerOver={() => {
              if (phase !== phases.FREE) return;
              setHovered(true);
            }}
            onPointerOut={() => {
              if (hovered) {
                setHovered(false);
              }
            }}
            onClick={goToCurriculum}
          >
            {(hovered || isIntersect) && phase === phases.FREE && (
              <>
                <Edges linewidth={3} threshold={100} color={[10, 10, 10]} />
                <Outlines thickness={0.01} color={[1, 1, 1]} />
              </>
            )}
          </mesh>

          <CuboidCollider
            args={[4, 3, 4]}
            sensor
            position={[0, 0, 0]}
            onIntersectionEnter={(other) => {
              if (other.rigidBodyObject.name === "Player") {
                setCanPressEnter(true);
                setIsIntersect(true);
              }
            }}
            onIntersectionExit={(other) => {
              if (other.rigidBodyObject.name === "Player") {
                setCanPressEnter(false);
                setIsIntersect(false);
              }
            }}
          />
        </RigidBody>
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials["jawara-logo"]}
        />
        <mesh
          geometry={nodes.Cube_3.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </group>
  );
};

export default Book;
