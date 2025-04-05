import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";

import { useSecondGame } from "./stores/useSecondGame.jsx";

import { SoundManager } from "@/lib/SoundManager.jsx";

export default function BlockAxe({ coloredBlock, index }) {
  const { correctAnswersOrder, correctCount, incrementCorrectCount } =
    useSecondGame((state) => ({
      correctAnswersOrder: state.correctAnswersOrder,
      correctCount: state.correctCount,
      incrementCorrectCount: state.incrementCorrectCount,
    }));

  const obstacle = useRef();

  // State to hold timeOffset and speedFactor
  const [timeOffset, setTimeOffset] = useState(Math.random() * Math.PI * 2);
  const [speedFactor, setSpeedFactor] = useState(Math.random() * 0.6 + 0.4);

  useEffect(() => {
    // Update timeOffset and speedFactor when coloredBlock changes
    setTimeOffset(Math.random() * Math.PI * 2);
    setSpeedFactor(Math.random() * 0.6 + 0.4);
  }, [coloredBlock]);

  useFrame((state) => {
    if (!obstacle.current) return;

    const time = state.clock.getElapsedTime();
    const x = Math.sin(time * speedFactor + timeOffset) * 6.5;
    obstacle.current.setNextKinematicTranslation({
      x,
      y: 0.5,
      z: -10 - index * 3,
    });
  });

  return (
    <RigidBody
      ref={obstacle}
      type="kinematicPosition"
      position={[0, 0.5, -10 - index * 3]}
      restitution={0.2}
      friction={0}
      onCollisionEnter={(other) => {
        console.log("DEBUG collision happened", other);
        if (
          correctAnswersOrder[correctCount] === index &&
          other.rigidBodyObject.name === "SecondGameMarble"
        ) {
          SoundManager.playSound("correctAnswer");
          incrementCorrectCount();
        }
      }}
    >
      <mesh scale={[1.25, 1, 1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={coloredBlock.hexColor} />
      </mesh>
    </RigidBody>
  );
}
