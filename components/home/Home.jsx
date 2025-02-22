"use client";

import { Html, KeyboardControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";

import AvatarCustomizationInterface from "./avatar/AvatarCustomizationInterface";
import { customizationGroups } from "./avatar/stores/customizationGroups";
import { useCustomization } from "./avatar/stores/useCustomization";
import { TranslationInterface } from "./exercise/translation/TranslationInterface";
import TutorialMenuInteface from "./tutorial/interfaces/TutorialMenuInteface";

import Experience from "@/components/home/Experience.jsx";
import { FirstGameInterface } from "@/components/home/games/first-game/FirstGameInterface.jsx";
import { FourthGameInterface } from "@/components/home/games/fourth-game/FourthGameInterface";
import { SecondGameInterface } from "@/components/home/games/second-game/SecondGameInterface.jsx";
import { ThirdGameInterface } from "@/components/home/games/third-game/ThirdGameInterface.jsx";
import FreePhaseInterface from "@/components/home/shared/interfaces/FreePhaseInterface.jsx";
import controls from "@/constants/controls";
import { useAuth } from "@/hooks/useAuth";
import { phases, useGame } from "@/hooks/useGame.jsx";
import useIsMobile from "@/hooks/useIsMobile.jsx";

// Dynamically import Joystick with SSR disabled
const Joystick = dynamic(
  () => import("@/components/home/shared/Joystick.jsx"),
  {
    ssr: false,
  }
);

const CanvasLoader = () => {
  return (
    <Html
      as="div"
      center
      className="absolute left-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center bg-orange-100"
    >
      <Image
        src="/images/jawara/jawara-logo.png"
        alt="Jawara Logo"
        width={300}
        height={300}
        className="animate-pulse"
      />
    </Html>
  );
};

export default function Home() {
  const { loading } = useAuth(); // Use the authentication hook

  const { progress } = useProgress();
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));

  const { fetchCategories } = useCustomization((state) => ({
    fetchCategories: state.fetchCategories,
  }));

  useEffect(() => {
    const dummyUserAvatarData = [
      { groupId: "1", startingAsset: "Head_01", startingColorIndex: 1 },
      { groupId: "2", startingAsset: "Hair_01" },
      { groupId: "9", startingAsset: "Top_02", startingColorIndex: 14 },
      { groupId: "11", startingAsset: "Shoes_01", startingColorIndex: 14 },
    ];

    const categories = customizationGroups.map((group) => {
      const userGroup = dummyUserAvatarData.find(
        (user) => user.groupId === group.id
      );
      return userGroup
        ? {
            ...group,
            startingAsset: userGroup.startingAsset,
            startingColorIndex: userGroup.startingColorIndex,
          }
        : group;
    });

    fetchCategories(categories);
  }, []);

  // KEYBOARD CONTROLS
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
    [phases.TUTORIAL]: <TutorialMenuInteface />,
    [phases.AVATAR_CUSTOMIZATION]: <AvatarCustomizationInterface />,
  };

  if (loading) {
    return <CanvasLoader />; // Show loading screen while fetching user session
  }

  return (
    <>
      <KeyboardControls map={map}>
        {/* 3D CANVAS */}
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Experience joystickInput={joystickInput} />
          </Suspense>
        </Canvas>

        {/* JOYSTICK */}
        {progress >= 100 && isMobile && phase === phases.FREE && (
          <Joystick onMove={handleJoystickMove} />
        )}
      </KeyboardControls>
      {progress >= 100 && gameInterfaces[phase]}
    </>
  );
}
