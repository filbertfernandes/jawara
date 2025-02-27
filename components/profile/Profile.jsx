"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import ProfileExperience from "./ProfileExperience";
import ProfileInterface from "./ProfileInterface";
import { customizationGroups } from "../home/avatar/stores/customizationGroups";
import { useCustomization } from "../home/avatar/stores/useCustomization";

import { useGame } from "@/hooks/useGame";
import { getUserAvatar } from "@/lib/actions/userAvatar.action";

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

const Profile = ({ profileUser }) => {
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 900 });

  const { fetchCategories } = useCustomization((state) => ({
    fetchCategories: state.fetchCategories,
  }));

  const { setPlayerState } = useGame((state) => ({
    setPlayerState: state.setPlayerState,
  }));

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!profileUser) {
        applyDummyAvatar();
        return;
      }

      try {
        const response = await getUserAvatar({ userId: profileUser._id });

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
        } else {
          applyDummyAvatar();
        }
      } catch (error) {
        console.error("Failed to fetch user avatar:", error);
        applyDummyAvatar();
      }

      setIsCategoriesLoaded(true);
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

    setPlayerState("idle");
    fetchUserAvatar();
  }, [profileUser]);

  // Hide loading screen when both categories and canvas are ready
  useEffect(() => {
    if (isCategoriesLoaded && isCanvasLoaded) {
      setLoading(false);
    }
  }, [isCategoriesLoaded, isCanvasLoaded]);

  return (
    <>
      <Canvas
        camera={{
          position: [0, isMobile ? 0.5 : 0.6, 5],
          fov: 45,
        }}
        shadows
        className="-z-10"
        onCreated={() => setIsCanvasLoaded(true)}
      >
        <group position-y={-1}>
          <ProfileExperience profileUser={profileUser} isMobile={isMobile} />
        </group>
      </Canvas>

      {!loading && <ProfileInterface profileUser={profileUser} />}

      {loading && <CanvasLoader />}
    </>
  );
};

export default Profile;
