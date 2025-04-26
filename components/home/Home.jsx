"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import AvatarCustomizationInterface from "./avatar/AvatarCustomizationInterface";
import NewAchievementPopup from "../shared/NewAchievementPopup";
import { customizationGroups } from "./avatar/stores/customizationGroups";
import { useCustomization } from "./avatar/stores/useCustomization";
import { TranslationInterface } from "./exercise/translation/TranslationInterface";
import LaptopInterface from "./laptop/LaptopInterface";
import TutorialMenuInteface from "./tutorial/interfaces/TutorialMenuInteface";

import Experience from "@/components/home/Experience.jsx";
import { FirstGameInterface } from "@/components/home/games/first-game/FirstGameInterface.jsx";
import { FourthGameInterface } from "@/components/home/games/fourth-game/FourthGameInterface";
import { SecondGameInterface } from "@/components/home/games/second-game/SecondGameInterface.jsx";
import { ThirdGameInterface } from "@/components/home/games/third-game/ThirdGameInterface.jsx";
import FreePhaseInterface from "@/components/home/shared/interfaces/FreePhaseInterface.jsx";
import controls from "@/constants/controls";
import { phases, useGame } from "@/hooks/useGame.jsx";
import { getUserAvatar } from "@/lib/actions/userAvatar.action";

// Dynamically import Joystick with SSR disabled
const Joystick = dynamic(
  () => import("@/components/home/shared/Joystick.jsx"),
  {
    ssr: false,
  }
);

const CanvasLoader = () => {
  return (
    <div className="absolute left-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center bg-orange-100">
      <Image
        src="/images/jawara/jawara-logo.png"
        alt="Jawara Logo"
        width={300}
        height={300}
        className="animate-pulse"
      />
    </div>
  );
};

export default function Home() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const { phase, setJoystickInput } = useGame((state) => ({
    phase: state.phase,
    setJoystickInput: state.setJoystickInput,
  }));

  const { fetchCategories } = useCustomization((state) => ({
    fetchCategories: state.fetchCategories,
  }));

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!userId) {
        // Guest user → Use dummy data
        applyDummyAvatar();
        return;
      }

      try {
        const response = await getUserAvatar({ userId });

        if (response.success && response.data?.avatar) {
          const userAvatarData = response.data.avatar;

          const categories = customizationGroups.map((group) => {
            const userGroup = userAvatarData.find(
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
          setIsCategoriesLoaded(true);
        } else {
          // Logged-in user but no avatar → Use dummy data
          applyDummyAvatar();
        }
      } catch (error) {
        console.error("Failed to fetch user avatar:", error);
        // If there's an error, assume no avatar exists → Use dummy data
        applyDummyAvatar();
      }
    };

    const applyDummyAvatar = () => {
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
      setIsCategoriesLoaded(true);
    };

    fetchUserAvatar();
  }, [userId]);

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

  const handleJoystickMove = (input) => {
    setJoystickInput(input);
  };

  // INTERFACES MAPPING
  const interfaces = {
    [phases.FREE]: <FreePhaseInterface />,
    [phases.TRANSLATION]: <TranslationInterface />,
    [phases.FIRST_GAME]: <FirstGameInterface />,
    [phases.SECOND_GAME]: <SecondGameInterface />,
    [phases.THIRD_GAME]: <ThirdGameInterface />,
    [phases.FOURTH_GAME]: <FourthGameInterface />,
    [phases.TUTORIAL]: <TutorialMenuInteface />,
    [phases.AVATAR_CUSTOMIZATION]: <AvatarCustomizationInterface />,
    [phases.LAPTOP]: <LaptopInterface />,
  };

  // Hide loading screen when both categories and canvas are ready
  useEffect(() => {
    if (isCategoriesLoaded && isCanvasLoaded) {
      setLoading(false);
    }
  }, [isCategoriesLoaded, isCanvasLoaded]);

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
          onCreated={() => setIsCanvasLoaded(true)}
        >
          <Experience />
        </Canvas>

        {/* JOYSTICK */}
        {!loading &&
          (phase === phases.FREE ||
            phase === phases.SECOND_GAME ||
            phase === phases.THIRD_GAME ||
            phase === phases.FOURTH_GAME) && (
            <Joystick onMove={handleJoystickMove} />
          )}
      </KeyboardControls>

      {!loading && interfaces[phase]}

      {loading && <CanvasLoader />}

      <NewAchievementPopup useStore={useGame} />
    </>
  );
}
