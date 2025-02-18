"use client";

import { Canvas } from "@react-three/fiber";

import { DEFAULT_CAMERA_POSITION } from "./CameraManager";
import Experience from "./Experience";
import UI from "./UI";

const Customization = () => {
  return (
    <>
      <UI />
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        shadows
      >
        <color attach="background" args={["#555"]} />
        <fog attach="fog" args={["#555", 15, 25]} />
        <group position-y={-1}>
          <Experience />
        </group>
      </Canvas>
    </>
  );
};

export default Customization;
