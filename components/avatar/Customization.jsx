"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useEffect } from "react";

import { DEFAULT_CAMERA_POSITION } from "./CameraManager";
import Experience from "./Experience";
import { customizationGroups } from "./stores/customizationGroups";
import { useCustomization } from "./stores/useCustomization";
import UI from "./UI";

const Customization = () => {
  const { fetchCategories } = useCustomization((state) => ({
    fetchCategories: state.fetchCategories,
  }));

  useEffect(() => {
    const dummyUserAvatarData = [
      { groupId: "1", startingAsset: "Head_02", startingColorIndex: 5 },
      { groupId: "2", startingAsset: "Hair_05", startingColorIndex: 7 },
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
