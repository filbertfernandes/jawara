import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import Level from "./Level.jsx";
import Marble from "./Marble.jsx";

export default function ThirdGame() {
  const { camera } = useThree();

  const isPortraitMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = isPortraitMobile ? 17 : 11;
    camera.position.z = isPortraitMobile ? 15 : 9;

    camera.lookAt(0, 3, -3);
  }, [isPortraitMobile]);

  return (
    <>
      <Marble />
      <Level />
    </>
  );
}
