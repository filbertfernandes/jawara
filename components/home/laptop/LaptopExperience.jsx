import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const LaptopExperience = () => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(-9.16, 2.1, 9);
  }, []);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={false}
        minDistance={0.5}
        maxDistance={3}
        target={[-9.1218, 1.8, 6.564374303246011]}
      />
    </>
  );
};

export default LaptopExperience;
