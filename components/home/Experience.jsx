import { Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useTranslations } from "next-intl";
import { Perf } from "r3f-perf";
import { useEffect } from "react";

import Customization from "./avatar/Customization.jsx";
import FirstGame from "./games/first-game/FirstGame.jsx";
import FourthGame from "./games/fourth-game/FourthGame.jsx";
import SecondGame from "./games/second-game/SecondGame.jsx";
import ThirdGame from "./games/third-game/ThirdGame.jsx";
import LaptopExperience from "./laptop/LaptopExperience.jsx";
import Book from "./shared/environment/Book.jsx";
import Football from "./shared/environment/Football.jsx";
import GamePortal from "./shared/environment/GamePortal.jsx";
import { Laptop } from "./shared/environment/Laptop.jsx";
import Lights from "./shared/environment/Lights.jsx";
import PlayerController from "./shared/player/PlayerController.jsx";
import Tutorial from "./tutorial/Tutorial.jsx";

import useBackgroundMusic from "@/hooks/useBackgroundMusic.jsx";
import { phases, skies, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function Experience() {
  const t = useTranslations("Home");

  useBackgroundMusic();

  const { phase, sky, setSky } = useGame((state) => ({
    phase: state.phase,
    sky: state.sky,
    setSky: state.setSky,
  }));

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 7 && currentHour < 16) {
      // Day (07.00 - 15.59)
      setSky(skies.DAY);
    } else if (
      (currentHour >= 16 && currentHour < 18) || // Dawn (16.00 - 17.59)
      (currentHour >= 4 && currentHour < 6) // Dawn (04.00 - 05.59)
    ) {
      setSky(skies.DAWN);
    } else {
      // Night (19.00 - 03.59)
      setSky(skies.NIGHT);
    }
  }, []);

  const gamePhaseComponentMap = {
    [phases.FIRST_GAME]: <FirstGame />,
    [phases.SECOND_GAME]: <SecondGame />,
    [phases.THIRD_GAME]: <ThirdGame />,
    [phases.FOURTH_GAME]: <FourthGame />,
    [phases.TUTORIAL]: <Tutorial />,
    [phases.AVATAR_CUSTOMIZATION]: <Customization />,
    [phases.LAPTOP]: <LaptopExperience />,
  };

  const portals = [
    {
      portalPhase: phases.FIRST_GAME,
      scale: [1.5, 2, 1.5],
      position: [10, 0.5, 4],
      textPosition: [10, 0.75, 4 + 0.76],
      color: "rgb(249, 115, 22)",
      texture: null,
      game: t("first_game_portal"),
    },
    {
      portalPhase: phases.SECOND_GAME,
      scale: [1.5, 2, 1.5],
      position: [14, 0.5, 4],
      textPosition: [14, 0.75, 4 + 0.76],
      color: "rgb(249, 115, 22)",
      texture: null,
      game: t("second_game_portal"),
    },
    {
      portalPhase: phases.THIRD_GAME,
      scale: [1.5, 2, 1.5],
      position: [8, 0.5, 0],
      textPosition: [8, 0.75, 0 + 0.76],
      color: "rgb(249, 115, 22)",
      texture: null,
      game: t("third_game_portal"),
    },
    {
      portalPhase: phases.FOURTH_GAME,
      scale: [1.5, 2, 1.5],
      position: [12, 0.5, 0],
      textPosition: [12, 0.75, 0 + 0.76],
      color: "rgb(249, 115, 22)",
      texture: null,
      game: t("fourth_game_portal"),
    },
    {
      portalPhase: phases.TRANSLATION,
      scale: [4, 2, 1.5],
      position: [2, 0.5, -15],
      textPosition: [2 + 0.8, 0.75, -15 + 0.76],
      color: "rgb(249, 115, 22)",
      texture: useTexture("/images/character/jawara-ai-thumbnail.webp"),
      game: t("translation_exercise_portal"),
    },
  ];

  // WORLD
  const worldFloorModel = useGLTF(
    `./models/environment/${
      sky === skies.NIGHT ? "world-floor-night" : "world-floor"
    }.glb`
  );
  const worldPhysicModel = useGLTF(
    "./models/environment/world-physic-environment.glb"
  );
  const worldNoPhysicModel = useGLTF(
    "./models/environment/world-no-physic-environment.glb"
  );

  return (
    <>
      {/* Perf */}
      {/* <Perf position="bottom-right" /> */}

      {/* Background Color (ccf2fc, ffbe8b, 000a24) */}
      <color
        args={[
          `${
            sky === skies.DAY
              ? "#ccf2fc"
              : sky === skies.DAWN
              ? "#ffbe8b"
              : "#000a24"
          }`,
        ]}
        attach="background"
      />

      {/* Lights */}
      <Lights />

      {/* Sparkles */}
      {sky === skies.NIGHT && (
        <>
          <Sparkles
            size={10}
            scale={[8, 3.5, 8]}
            position={[18, 2.5, 22]}
            speed={1}
            count={30}
            color="#ffff00"
          />
          <Sparkles
            size={10}
            scale={[12, 4, 55]}
            position={[-22, 3, -5]}
            speed={1}
            count={30}
            color="#ffff00"
          />
          <Sparkles
            size={10}
            scale={[40, 4, 6]}
            position={[0, 3, -28]}
            speed={1}
            count={30}
            color="#ffff00"
          />
        </>
      )}

      {/* World No Physic */}
      <primitive object={worldNoPhysicModel.scene} scale={3.2} />

      <Physics debug={false}>
        {/* Invisible Colliders */}
        <RigidBody type="fixed">
          <CuboidCollider
            args={[15.86, 1.25, 0.16]}
            position={[-0.6, 0, -23.4]}
          />
          <CuboidCollider
            args={[0.16, 1.25, 17.1]}
            position={[-16.25, 0, -6.5]}
          />
          <CuboidCollider
            args={[7.43, 1.25, 0.16]}
            position={[-9.07, 0, 10.5]}
          />
          <CuboidCollider args={[3.8, 1.25, 0.16]} position={[-5.4, 0, 17.7]} />
          <CuboidCollider args={[7.4, 1.25, 0.16]} position={[-1.8, 0, 22.5]} />
          <CuboidCollider args={[0.16, 1.25, 3.7]} position={[-1.8, 0, 14]} />
          <CuboidCollider args={[0.16, 1.25, 6]} position={[5.45, 0, 16.5]} />
          <CuboidCollider args={[6.2, 1.25, 0.16]} position={[11.5, 0, 10.5]} />
          <CuboidCollider
            args={[0.16, 1.25, 17.1]}
            position={[17.55, 0, -6.5]}
          />
        </RigidBody>

        {/* World Physic */}
        <RigidBody type="fixed" colliders="cuboid">
          <primitive object={worldFloorModel.scene} scale={3.2} />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh">
          <primitive object={worldPhysicModel.scene} scale={3.2} />
        </RigidBody>

        {/* Game Portals */}
        {(phase === phases.FREE ||
          phase === phases.TUTORIAL ||
          phase === phases.AVATAR_CUSTOMIZATION ||
          phase === phases.LAPTOP) &&
          portals.map(
            ({
              portalPhase,
              scale,
              textPosition,
              position,
              color,
              texture,
              game,
            }) => (
              <GamePortal
                key={portalPhase}
                portalPhase={portalPhase}
                textPosition={textPosition}
                portalScale={scale}
                portalPosition={position}
                portalColor={color}
                portalImage={texture}
                game={game}
              />
            )
          )}

        {/* Soccer Ball */}
        <RigidBody
          colliders="ball"
          position={[2, 0.25, 5]}
          restitution={0.65}
          friction={1.5}
          onCollisionEnter={() =>
            SoundManager.playSoundAfterFinished("soccerBallImpact")
          }
        >
          <Football scale={0.275} />
        </RigidBody>

        {/* Book */}
        <Book />

        {/* Laptop */}
        <Laptop />

        {/* Player */}
        <PlayerController />

        {/* Phases */}
        {gamePhaseComponentMap[phase]}
      </Physics>
    </>
  );
}
