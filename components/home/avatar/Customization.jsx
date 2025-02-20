import { useEffect, useRef, useState } from "react";

import { useCustomization } from "@/components/avatar/stores/useCustomization";
import { useGame } from "@/hooks/useGame";
import { CameraControls } from "@react-three/drei";

export const DEFAULT_CAMERA_POSITION = [
  -0.024931255730465993, 1.5, 3.378431965696465,
];
export const DEFAULT_CAMERA_TARGET = [0, 1, 0];

const Customization = () => {
  const controls = useRef();
  const currentCategory = useCustomization((state) => state.currentCategory);
  const { playerPosition } = useGame((state) => ({
    playerPosition: state.playerPosition,
  }));
  const [playerPositionCheck, setPlayerPositionCheck] =
    useState(playerPosition);

  useEffect(() => {
    if (!currentCategory) return;

    let cameraPos, cameraTarget;

    if (currentCategory?.cameraPlacement) {
      cameraPos = [
        currentCategory.cameraPlacement.position[0] + playerPosition.x,
        currentCategory.cameraPlacement.position[1] + playerPosition.y,
        currentCategory.cameraPlacement.position[2] + playerPosition.z,
      ];
      cameraTarget = [
        currentCategory.cameraPlacement.target[0] + playerPosition.x,
        currentCategory.cameraPlacement.target[1] + playerPosition.y,
        currentCategory.cameraPlacement.target[2] + playerPosition.z,
      ];
    } else {
      cameraPos = [
        DEFAULT_CAMERA_POSITION[0] + playerPosition.x,
        DEFAULT_CAMERA_POSITION[1] + playerPosition.y,
        DEFAULT_CAMERA_POSITION[2] + playerPosition.z,
      ];
      cameraTarget = [
        DEFAULT_CAMERA_TARGET[0] + playerPosition.x,
        DEFAULT_CAMERA_TARGET[1] + playerPosition.y,
        DEFAULT_CAMERA_TARGET[2] + playerPosition.z,
      ];
    }

    controls.current.setLookAt(...cameraPos, ...cameraTarget, true);
  }, [currentCategory, playerPositionCheck]);

  useEffect(() => {
    if (
      playerPosition.x === playerPositionCheck.x &&
      playerPosition.y === playerPositionCheck.y &&
      playerPosition.z === playerPositionCheck.z
    )
      return;

    setPlayerPositionCheck(playerPosition);
  }, [playerPosition]);

  return (
    <>
      <CameraControls
        ref={controls}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={8}
      />
    </>
  );
};

export default Customization;
