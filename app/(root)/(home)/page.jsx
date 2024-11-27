"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic"; // Import dynamic
import { useMemo, useState } from "react";

import Experience from "@/components/home/Experience.jsx";
import { FirstGameInterface } from "@/components/home/games/first-game/FirstGameInterface.jsx";
import { FourthGameInterface } from "@/components/home/games/fourth-game/FourthGameInterface";
import { SecondGameInterface } from "@/components/home/games/second-game/SecondGameInterface.jsx";
import { ThirdGameInterface } from "@/components/home/games/third-game/ThirdGameInterface.jsx";
import FreePhaseInterface from "@/components/shared/interfaces/FreePhaseInterface.jsx";
import { phases, useGame } from "@/hooks/useGame.jsx";
import useIsMobile from "@/hooks/useIsMobile.jsx";
import { Controls } from "@/utils/constants.js";

// Dynamically import Joystick with SSR disabled
const Joystick = dynamic(() => import("@/components/shared/Joystick.jsx"), {
  ssr: false,
});

export default function App() {
  // GAME PHASE
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));

  // KEYBOARD
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.enter, keys: ["Enter"] },
    ],
    []
  );

  // JOYSTICK
  const [joystickInput, setJoystickInput] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleJoystickMove = (input) => {
    setJoystickInput(input);
  };

  // INTERFACES MAPPING
  const gameInterfaces = {
    [phases.FREE]: <FreePhaseInterface />,
    [phases.FIRST_GAME]: <FirstGameInterface />,
    [phases.SECOND_GAME]: <SecondGameInterface />,
    [phases.THIRD_GAME]: <ThirdGameInterface />,
    [phases.FOURTH_GAME]: <FourthGameInterface />,
  };

  return (
    <KeyboardControls map={map}>
      {/* 3D CANVAS */}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
        }}
      >
        <Experience joystickInput={joystickInput} />
      </Canvas>

      {/* JOYSTICK */}
      {isMobile && phase === phases.FREE && (
        <Joystick onMove={handleJoystickMove} />
      )}

      {/* INTERFACES */}
      {gameInterfaces[phase]}
    </KeyboardControls>
  );
}
