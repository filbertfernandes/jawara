import { useKeyboardControls } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

import { useFourthGame } from "./stores/useFourthGame";

import { gameStates, useGame } from "@/hooks/useGame";
import { SoundManager } from "@/lib/SoundManager";

const Level = () => {
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }));

  const {
    stage,
    nextStage,
    answerCount,
    correctAnswersOrder,
    selectAnimal,
    setSelectAnimal,
    incrementScore,
    decrementScore,
    incrementAnswerCount,
  } = useFourthGame((state) => ({
    stage: state.stage,
    nextStage: state.nextStage,
    answerCount: state.answerCount,
    correctAnswersOrder: state.correctAnswersOrder,
    selectAnimal: state.selectAnimal,
    setSelectAnimal: state.setSelectAnimal,
    incrementScore: state.incrementScore,
    decrementScore: state.decrementScore,
    incrementAnswerCount: state.incrementAnswerCount,
  }));

  useEffect(() => {
    if (!stage) return;

    if (answerCount === stage.length) {
      nextStage();
    }
  }, [answerCount]);

  const [subscribeKeys] = useKeyboardControls();

  useEffect(() => {
    const unsubscribeEnter = subscribeKeys(
      (state) => state.enter,

      (value) => {
        if (value && selectAnimal !== null) {
          if (correctAnswersOrder[answerCount] === selectAnimal) {
            SoundManager.playSound("correctAnswer");
            incrementScore();
          } else {
            SoundManager.playSound("wrongAnswer");
            decrementScore();
          }
          incrementAnswerCount();
        }
      }
    );

    return () => {
      unsubscribeEnter();
    };
  });

  return (
    <>
      {stage !== null &&
        gameState === gameStates.GAME &&
        stage.map((s, index) => (
          <RigidBody
            key={index}
            type="kinematicPosition"
            colliders={false}
            scale={1}
            enabledRotations={[false, false, false]}
            position={[
              s.position[0],
              s.word.rigidPositionY ? s.word.rigidPositionY : s.position[1],
              s.position[2],
            ]}
            rotation-y={Math.PI * Math.random()}
          >
            <CuboidCollider
              args={s.word.colliderSize}
              position={s.word.colliderPosition}
            />
            <CuboidCollider
              sensor
              args={[
                s.word.colliderSize[0] + 0.5,
                s.word.colliderSize[1] + 0.5,
                s.word.colliderSize[2] + 0.5,
              ]}
              position={s.word.colliderPosition}
              onIntersectionEnter={(other) => {
                if (other.rigidBodyObject.name === "Player") {
                  setSelectAnimal(index);
                }
              }}
              onIntersectionExit={(other) => {
                if (other.rigidBodyObject.name === "Player") {
                  setSelectAnimal(null);
                }
              }}
            />
            {s.word.model}
          </RigidBody>
        ))}
    </>
  );
};

export default Level;
