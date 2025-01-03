import { skies, useGame } from "@/hooks/useGame";

export default function Lights() {
  const { sky } = useGame((state) => ({
    sky: state.sky,
  }));

  return (
    <>
      <directionalLight
        castShadow
        position={[7.5, 7.5, 1]}
        intensity={sky === skies.DAY ? 2 : sky === skies.DAWN ? 1 : 0.7}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />

      <ambientLight intensity={sky === skies.DAY ? 1 : 0.7} />
    </>
  );
}
