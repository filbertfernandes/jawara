import { Edges, Html, Outlines, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { FaFolder, FaWindows } from "react-icons/fa";

import { useLaptop } from "../../laptop/stores/useLaptop";

import { phases, useGame } from "@/hooks/useGame";

export function Laptop(props) {
  const { nodes, materials } = useGLTF("/models/environment/laptop.glb");

  const [hovered, setHovered] = useState(false);

  const {
    phase,
    setCanPressEnter,
    setCanChangePhase,
    canPressEnter,
    canChangePhase,
    changePhase,
  } = useGame((state) => ({
    phase: state.phase,
    canPressEnter: state.canPressEnter,
    setCanPressEnter: state.setCanPressEnter,
    setCanChangePhase: state.setCanChangePhase,
    canChangePhase: state.canChangePhase,
    changePhase: state.changePhase,
  }));

  const { screenRotation } = useLaptop((state) => ({
    screenRotation: state.screenRotation,
  }));

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.6, 3, 0.7]} position={[-9.1, 4.2, 5.5]} />
        <CuboidCollider
          args={[1, 2, 2]}
          sensor
          position={[-9.6, 2, 5.3]}
          onIntersectionEnter={(other) => {
            if (other.rigidBodyObject.name === "Player") {
              setCanPressEnter(true);
              setCanChangePhase(true, phases.LAPTOP);
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
      </RigidBody>

      <group
        {...props}
        dispose={null}
        scale={3.2}
        onPointerOver={() => {
          if (phase !== phases.FREE) return;

          if (
            !canChangePhase.condition ||
            canChangePhase.phase === phases.LAPTOP
          ) {
            setCanChangePhase(true, phases.LAPTOP);
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
            changePhase(phases.LAPTOP);
          }
        }}
      >
        {phase === phases.LAPTOP && (
          <group
            position={[-2.842, 0.4, 1.659]}
            rotation={[screenRotation, 0, 0]}
          >
            <Html
              transform
              distanceFactor={1.17}
              position={[0, 0, -0.133]}
              rotation-x={-Math.PI / 2}
            >
              <div className="flex h-[4.75rem] w-28 flex-col justify-center border-none bg-white font-questrial text-gray-900">
                <div className="flex size-full flex-wrap items-center justify-center overflow-scroll text-[0.4rem]">
                  <div className="font-bold">Search Players</div>
                </div>
                <div className="flex h-[0.3rem] w-full items-center justify-center bg-gray-900/50 px-1">
                  <div className="flex gap-[0.1rem]">
                    <FaWindows className="text-[0.2rem] text-blue-600" />
                    <FaFolder className="text-[0.2rem] text-yellow-500" />
                    <div className="size-[0.2rem] bg-rose-500"></div>
                    <div className="size-[0.2rem] bg-pink-300"></div>
                    <div className="size-[0.2rem] rounded bg-teal-500"></div>
                    <div className="size-[0.2rem] bg-lime-500"></div>
                    <div className="size-[0.2rem] bg-fuchsia-500"></div>
                    <div className="size-[0.2rem] bg-amber-500"></div>
                    <div className="size-[0.2rem] rounded bg-orange-800"></div>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        )}

        <group position={[-2.843, 0.407, 1.789]} scale={0.012}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001_1.geometry}
            material={materials.HeadPhoneHole}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001_2.geometry}
            material={materials.USB_C_INSIDE}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001_3.geometry}
            material={materials.TouchbarBorder}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001_4.geometry}
            material={materials.Keyboard}
          />
          <group position={[0, -0.509, 0]} scale={5.796}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle006.geometry}
              material={materials["Frame.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle006_1.geometry}
              material={materials.USB_C_INSIDE}
            />
          </group>

          <group position={[-11.786, -0.15, -8.301]} scale={5.796}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle.geometry}
              material={materials["Keyboard.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_1.geometry}
              material={materials.Key}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_2.geometry}
              material={materials.Touchbar}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.KeyboardKeyHole.geometry}
            material={materials["Keyboard.001"]}
            position={[-11.786, -0.152, -8.301]}
            scale={5.796}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RubberFoot.geometry}
            material={materials.DarkRubber}
            position={[-11.951, -0.751, 7.857]}
            scale={5.796}
          />
          <group position={[0.011, -0.211, -10.559]} scale={5.796}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle012.geometry}
              material={materials.HingeBlack}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle012_1.geometry}
              material={materials.HingeMetal}
            />
          </group>
          <group position={[-15.026, 0.031, 0.604]} scale={5.796}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle009.geometry}
              material={materials["Frame.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle009_1.geometry}
              material={materials.SpeakerHole}
            />
          </group>
          <group position={[12.204, 0.031, 0.604]} scale={5.796}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle003.geometry}
              material={materials["Frame.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle003_1.geometry}
              material={materials.SpeakerHole}
            />
          </group>

          <group
            position={[0.007, -0.3, -10.412]}
            rotation={[screenRotation, 0, 0]}
            scale={5.796}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle002.geometry}
              material={materials["Frame.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle002_1.geometry}
              material={materials.Screen}
            >
              {((canChangePhase.condition &&
                canChangePhase.phase === phases.LAPTOP) ||
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
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle002_2.geometry}
              material={materials.ScreenGlass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle002_3.geometry}
              material={materials.Rubber}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle002_4.geometry}
              material={materials.DisplayGlass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.AppleLogo000.geometry}
              material={materials["AppleLogo.004"]}
              position={[0.005, -0.111, -1.795]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={0.579}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/environment/laptop.glb");
