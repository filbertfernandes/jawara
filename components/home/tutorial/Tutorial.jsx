import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const Tutorial = () => {
  const controls = useRef();

  const { camera } = useThree();

  useEffect(() => {
    camera.position.x = 2;
    camera.position.y = 6;
    camera.position.z = 27;
  }, []);

  return (
    <>
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        target={[2, 0, 0]}
      />
    </>
  );
};

export default Tutorial;
