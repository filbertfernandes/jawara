"use client";

import { Html, KeyboardControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useMemo, useState } from "react";

import { TranslationInterface } from "./exercise/translation/TranslationInterface";

import Experience from "@/components/home/Experience.jsx";
import { FirstGameInterface } from "@/components/home/games/first-game/FirstGameInterface.jsx";
import { FourthGameInterface } from "@/components/home/games/fourth-game/FourthGameInterface";
import { SecondGameInterface } from "@/components/home/games/second-game/SecondGameInterface.jsx";
import { ThirdGameInterface } from "@/components/home/games/third-game/ThirdGameInterface.jsx";
import FreePhaseInterface from "@/components/home/shared/interfaces/FreePhaseInterface.jsx";
import constants from "@/constants/constants";
import controls from "@/constants/controls";
import { phases, useGame } from "@/hooks/useGame.jsx";
import useIsMobile from "@/hooks/useIsMobile.jsx";
import { api } from "@/lib/api";

// Dynamically import Joystick with SSR disabled
const Joystick = dynamic(
  () => import("@/components/home/shared/Joystick.jsx"),
  {
    ssr: false,
  }
);

const CanvasLoader = ({ progress }) => {
  return (
    <Html
      as="div"
      center
      className="absolute left-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center bg-orange-100"
    >
      <p className="h5-bold text-orange-500">
        {progress !== 0 ? `${progress}%` : "Loading..."}
      </p>
      <div className="mt-6 h-4 w-1/4 overflow-hidden rounded-full bg-orange-500/20">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-orange-500 transition-all duration-300 ease-in-out"
        ></div>
      </div>
    </Html>
  );
};

export default function Home() {
  const { loaded } = useProgress();
  const progress = Math.round((loaded / constants.TOTAL_3D_OBJECT) * 100);

  const { setUserId, setUser, phase } = useGame((state) => ({
    setUserId: state.setUserId,
    setUser: state.setUser,
    phase: state.phase,
  }));

  // SET USER SESSION
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const updateSession = async () => {
      await update();
    };

    updateSession();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      return await api.users.getById(session.user.id);
    };

    const fetchAndSetUser = async () => {
      if (status === "authenticated" && session?.user?.id) {
        setUserId(session.user.id);

        const user = await getUser();
        setUser(user);
      } else {
        setUserId(null);
        setUser(null);
      }
    };

    fetchAndSetUser();
  }, [status, session]);

  // KEYBOARD
  const map = useMemo(
    () => [
      { name: controls.FORWARD, keys: ["ArrowUp", "KeyW"] },
      { name: controls.BACK, keys: ["ArrowDown", "KeyS"] },
      { name: controls.LEFT, keys: ["ArrowLeft", "KeyA"] },
      { name: controls.RIGHT, keys: ["ArrowRight", "KeyD"] },
      { name: controls.JUMP, keys: ["Space"] },
      { name: controls.ENTER, keys: ["Enter"] },
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
    [phases.TRANSLATION]: <TranslationInterface />,
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
        <Suspense fallback={<CanvasLoader progress={progress} />}>
          <Experience joystickInput={joystickInput} />
        </Suspense>
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
