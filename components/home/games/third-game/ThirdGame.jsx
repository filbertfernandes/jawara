import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import Level from "./Level.jsx";
import Marble from "./Marble.jsx";

export default function ThirdGame() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 11;
    camera.position.z = 9;

    camera.lookAt(0, 3, -3);
  }, []);

  return (
    <>
      <Marble />
      <Level />
    </>
  );
}
