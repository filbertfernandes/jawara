import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import Guide from "./Guide";
import { tutorialStates, useTutorial } from "./stores/useTutorial";

import { useGame } from "@/hooks/useGame";

export const controlsRef = { current: null }; // Global reference object

const Tutorial = () => {
  const localRef = useRef();
  const { camera } = useThree();

  const { tutorialState } = useTutorial((state) => ({
    tutorialState: state.tutorialState,
  }));

  const { isFirstTime } = useGame((state) => ({
    isFirstTime: state.isFirstTime,
  }));

  useEffect(() => {
    camera.position.set(2, 6, 27);
    controlsRef.current = localRef.current; // Store reference globally
  }, []);

  return (
    <>
      <OrbitControls
        ref={localRef}
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[2, 0, 0]}
      />

      {(tutorialState === tutorialStates.GUIDE || isFirstTime) && <Guide />}
    </>
  );
};

export default Tutorial;
