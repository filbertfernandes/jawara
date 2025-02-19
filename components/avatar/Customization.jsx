"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { DEFAULT_CAMERA_POSITION } from "./CameraManager";
import Experience from "./Experience";
import UI from "./UI";

const Customization = () => {
  return (
    <>
      <Leva hidden />
      <UI />
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        shadows
      >
        <color attach="background" args={["#130f30"]} />
        <fog attach="fog" args={["#130f30", 10, 40]} />
        <group position-y={-1}>
          <Experience />
        </group>
      </Canvas>
    </>
  );
};

export default Customization;
