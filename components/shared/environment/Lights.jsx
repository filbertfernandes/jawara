export default function Lights() {
  return (
    <>
      <directionalLight
        castShadow
        position={[7.5, 7.5, 1]}
        intensity={3.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />

      <ambientLight intensity={1.5} />
    </>
  );
}
