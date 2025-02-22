import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { useCustomization } from "@/components/home/avatar/stores/useCustomization";
import { useGame } from "@/hooks/useGame";

export const DEFAULT_CAMERA_POSITION = [
  -0.024931255730465993, 1.5, 3.378431965696465,
];
export const DEFAULT_CAMERA_TARGET = [0, 1, 0];

const Customization = () => {
  const { camera } = useThree();
  const controlsRef = useRef();
  const currentCategory = useCustomization((state) => state.currentCategory);
  const { playerPosition } = useGame((state) => ({
    playerPosition: state.playerPosition,
  }));
  const [playerPositionCheck, setPlayerPositionCheck] =
    useState(playerPosition);

  // Set initial target once when mounted
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(
        DEFAULT_CAMERA_TARGET[0] + playerPosition.x,
        DEFAULT_CAMERA_TARGET[1] + playerPosition.y,
        DEFAULT_CAMERA_TARGET[2] + playerPosition.z
      );
      controlsRef.current.update(); // Make sure the update is applied
    }
  }, []); // Runs only once on mount

  useEffect(() => {
    if (!currentCategory || !controlsRef.current) return;

    const tl = gsap.timeline({ ease: "power3.inOut" });

    const cameraTarget = [
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.target[0]
        : DEFAULT_CAMERA_TARGET[0]) + playerPosition.x,
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.target[1]
        : DEFAULT_CAMERA_TARGET[1]) + playerPosition.y,
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.target[2]
        : DEFAULT_CAMERA_TARGET[2]) + playerPosition.z,
    ];
    const cameraPosition = [
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.position[0]
        : DEFAULT_CAMERA_POSITION[0]) + playerPosition.x,
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.position[1]
        : DEFAULT_CAMERA_POSITION[1]) + playerPosition.y,
      (currentCategory.cameraPlacement
        ? currentCategory.cameraPlacement.position[2]
        : DEFAULT_CAMERA_POSITION[2]) + playerPosition.z,
    ];

    // Animate camera and target
    tl.to(controlsRef.current.target, {
      x: cameraTarget[0],
      y: cameraTarget[1],
      z: cameraTarget[2],
      duration: 0.7,
    }).to(
      camera.position,
      {
        x: cameraPosition[0],
        y: cameraPosition[1],
        z: cameraPosition[2],
        duration: 0.7,
      },
      0
    );

    tl.play();
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
      <OrbitControls
        ref={controlsRef}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={8}
        enablePan={false}
      />
    </>
  );
};

export default Customization;
