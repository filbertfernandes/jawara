import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

import { useCustomization } from "./stores/useCustomization";

export const DEFAULT_CAMERA_POSITION = [-1, 1, 5];
export const DEFAULT_CAMERA_TARGET = [0, 0, 0];

const CameraManager = () => {
  const controls = useRef();
  const currentCategory = useCustomization((state) => state.currentCategory);

  useEffect(() => {
    if (currentCategory.cameraPlacement) {
      controls.current.setLookAt(
        ...currentCategory.cameraPlacement.position,
        ...currentCategory.cameraPlacement.target,
        true
      );
    } else {
      controls.current.setLookAt(
        ...DEFAULT_CAMERA_POSITION,
        ...DEFAULT_CAMERA_TARGET,
        true
      );
    }
  }, [currentCategory]);

  return (
    <CameraControls
      ref={controls}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={8}
    />
  );
};

export default CameraManager;
