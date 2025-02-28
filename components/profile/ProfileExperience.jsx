import {
  Backdrop,
  Environment,
  Html,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Avatar } from "../home/avatar/Avatar";

const ProfileExperience = ({ profileUser, isMobile }) => {
  const router = useRouter();

  useEffect(() => {
    if (!profileUser) {
      router.refresh();
    }
  }, []);

  return (
    <>
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        target={[isMobile ? 0 : 1.7, isMobile ? 0.3 : 0.5, 0]}
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
      />
      <Environment preset="sunset" environmentIntensity={0.3} />

      <Backdrop scale={[50, 10, 5]} floor={1.5} receiveShadow position-z={-4}>
        <meshStandardMaterial color="#ffd893" />
      </Backdrop>

      <SoftShadows size={52} samples={16} />

      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      {/* Fill Light */}
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />
      {/* Back Lights */}
      <directionalLight
        position={[1, 0.1, -5]}
        intensity={3}
        color={"#ffcd76"}
      />
      <directionalLight
        position={[-1, 0.1, -5]}
        intensity={8}
        color={"#ffcd76"}
      />

      <Html
        as="div"
        position={[0, isMobile ? 2.7 : 2.8, 0]}
        center
        className="relative flex h-24 w-60 flex-col items-center justify-center rounded-lg border bg-white text-center text-xl font-medium text-black shadow-md"
      >
        <h5>Hi! My name is</h5>
        <h5 className="font-bold text-orange-500">{profileUser?.name}</h5>
        <div className="absolute -bottom-6 left-1/2 size-0 -translate-x-1/2 border-[12px] border-transparent border-t-white drop-shadow-md"></div>
      </Html>

      <Avatar />
    </>
  );
};

export default ProfileExperience;
