"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import ProfileExperience from "./ProfileExperience";
import ProfileInterface from "./ProfileInterface";
import { customizationGroups } from "../home/avatar/stores/customizationGroups";
import { useCustomization } from "../home/avatar/stores/useCustomization";

import { useGame } from "@/hooks/useGame";
import { getUserAvatar } from "@/lib/actions/userAvatar.action";
import { api } from "@/lib/api";

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

const Profile = ({ userId }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 900 });

  const { fetchCategories } = useCustomization((state) => ({
    fetchCategories: state.fetchCategories,
  }));

  const { setPlayerState } = useGame((state) => ({
    setPlayerState: state.setPlayerState,
  }));

  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const fetchProfileUser = async () => {
      try {
        const response = await api.users.getById(userId);
        console.log("[DEBUG] fetchProfileUser response", response);
        if (response?.data) {
          setProfileUser(response.data);
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const fetchUserAvatar = async () => {
      try {
        const response = await getUserAvatar({ userId });

        console.log("[DEBUG] fetchUserAvatar response", response);

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
    };

    setPlayerState("idle");
    fetchProfileUser();
    fetchUserAvatar();
  }, [userId]);

  useEffect(() => {
    if (isCanvasLoaded) {
      setLoading(false);
    }
  }, [isCanvasLoaded]);

  return (
    <>
      {profileUser && (
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
      )}

      {!loading && <ProfileInterface profileUser={profileUser} />}

      {loading && <CanvasLoader />}
    </>
  );
};

export default Profile;
