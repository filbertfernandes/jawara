import { Sparkles, useGLTF } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";

import Lights from "../shared/environment/Lights.jsx";
import FirstGame from "./games/first-game/FirstGame.jsx";
import FourthGame from "./games/fourth-game/FourthGame.jsx";
import SecondGame from "./games/second-game/SecondGame.jsx";
import ThirdGame from "./games/third-game/ThirdGame.jsx";
import Football from "../shared/environment/Football.jsx";
import GamePortal from "../shared/environment/GamePortal.jsx";
import PlayerController from "../shared/player/PlayerController.jsx";

import useBackgroundMusic from "@/hooks/useBackgroundMusic.jsx";
import { phases, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function Experience({ joystickInput }) {
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));

  useBackgroundMusic(phase);

  const gamePhaseComponentMap = {
    [phases.FIRST_GAME]: <FirstGame />,
    [phases.SECOND_GAME]: <SecondGame />,
    [phases.THIRD_GAME]: <ThirdGame />,
    [phases.FOURTH_GAME]: <FourthGame />,
  };

  const portals = [
    { phase: phases.FIRST_GAME, position: [10, 0.5, 4], game: "Body\nParts" },
    { phase: phases.SECOND_GAME, position: [14, 0.5, 4], game: "Colors" },
    { phase: phases.THIRD_GAME, position: [8, 0.5, 0], game: "Numbers" },
    { phase: phases.FOURTH_GAME, position: [12, 0.5, 0], game: "Animals" },
  ];

  // WORLD
  const worldModel = useGLTF("./models/environment/world.glb");
  const worldNoPhysicModel = useGLTF(
    "./models/environment/world-no-physic-environment.glb"
  );

  return (
    <>
      {/* Perf */}
      {/* <Perf position="bottom-right" /> */}

      {/* Background Color (ccf2fc, ffbe8b, 000a24) */}
      <color args={["#000a24"]} attach="background" />

      {/* Lights */}
      <Lights />

      {/* Sparkles */}
      <Sparkles
        size={8}
        scale={[9, 3.5, 9]}
        position={[18, 2.5, 22]}
        speed={0.3}
        count={30}
      />

      <Sparkles
        size={8}
        scale={[9, 4, 55]}
        position={[-20, 3, -5]}
        speed={0.3}
        count={30}
      />

      <Sparkles
        size={8}
        scale={[40, 4, 6]}
        position={[0, 3, -28]}
        speed={0.3}
        count={30}
      />

      {/* World No Physic */}
      <primitive object={worldNoPhysicModel.scene} scale={3.2} />

      <Physics debug={false}>
        {/* Invisible Colliders */}
        <RigidBody type="fixed">
          <CuboidCollider
            args={[15.86, 1.35, 0.16]}
            position={[-0.6, 0, -23.4]}
          />
          <CuboidCollider
            args={[0.16, 1.35, 17.1]}
            position={[-16.25, 0, -6.5]}
          />
          <CuboidCollider
            args={[7.43, 1.35, 0.16]}
            position={[-9.07, 0, 10.5]}
          />
          <CuboidCollider args={[3.8, 1.35, 0.16]} position={[-5.4, 0, 17.7]} />
          <CuboidCollider args={[7.4, 1.35, 0.16]} position={[-1.8, 0, 22.5]} />
          <CuboidCollider args={[0.16, 1.35, 3.7]} position={[-1.8, 0, 14]} />
          <CuboidCollider args={[0.16, 1.35, 6]} position={[5.45, 0, 16.5]} />
          <CuboidCollider args={[6.2, 1.35, 0.16]} position={[11.5, 0, 10.5]} />
          <CuboidCollider
            args={[0.16, 1.35, 17.1]}
            position={[17.55, 0, -6.5]}
          />
        </RigidBody>

        {/* World */}
        <RigidBody type="fixed" colliders="trimesh">
          <primitive object={worldModel.scene} scale={3.2} />
        </RigidBody>

        {/* Game Portals */}
        {phase === phases.FREE &&
          portals.map(({ phase, position, game }) => (
            <GamePortal
              key={phase}
              phase={phase}
              portalPosition={position}
              game={game}
            />
          ))}

        {/* Soccer Ball */}
        <RigidBody
          colliders="ball"
          position={[0, 10, -10]}
          restitution={0.65}
          friction={1.5}
          onCollisionEnter={() =>
            SoundManager.playSoundAfterFinished("soccerBallImpact")
          }
        >
          <Football scale={0.25} />
        </RigidBody>

        {/* Player */}
        <PlayerController joystickInput={joystickInput} />

        {/* Phases */}
        {gamePhaseComponentMap[phase]}
      </Physics>
    </>
  );
}
