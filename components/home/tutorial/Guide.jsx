import { Float, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";

import { guideData } from "./stores/data";
import { useTutorial } from "./stores/useTutorial";
import { controlsRef } from "./Tutorial"; // Import the global reference

const Guide = () => {
  const { camera } = useThree();

  const { guideIndex } = useTutorial((state) => ({
    guideIndex: state.guideIndex,
  }));

  useEffect(() => {
    if (controlsRef.current) {
      const tl = gsap.timeline({ ease: "power3.inOut" });

      tl.to(controlsRef.current.target, {
        x: guideData[guideIndex].cameraTargetPosition.x,
        y: guideData[guideIndex].cameraTargetPosition.y,
        z: guideData[guideIndex].cameraTargetPosition.z,
        duration: 2.3,
      }).to(
        camera.position,
        {
          x: guideData[guideIndex].cameraPosition.x,
          y: guideData[guideIndex].cameraPosition.y,
          z: guideData[guideIndex].cameraPosition.z,
          duration: 2.3,
        },
        0
      );

      tl.play();
    }
  }, [guideIndex]);

  return (
    <>
      {guideData.map((item) => (
        <Float
          key={item.information}
          floatIntensity={0.1}
          rotationIntensity={0.1}
        >
          <Text
            position={[
              item.textPosition.x,
              item.textPosition.y,
              item.textPosition.z,
            ]}
            font="./fonts/bebas-neue-v9-latin-regular.woff"
            fontSize={item.textFontSize}
            textAlign="center"
          >
            {item.description}
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
      ))}
    </>
  );
};

export default Guide;
