import { useEffect } from "react";

import NumberedBoard from "./NumberedBoard";
import { useThirdGame } from "./stores/useThirdGame";

import { gameStates, useGame } from "@/hooks/useGame";

const Level = () => {
  const { gameState } = useGame((state) => ({
    gameState: state.gameState,
  }));

  const {
    stage,
    nextStage,
    answerCount,
    correctAnswersOrder,
    incrementAnswerCount,
  } = useThirdGame((state) => ({
    stage: state.stage,
    nextStage: state.nextStage,
    answerCount: state.answerCount,
    correctAnswersOrder: state.correctAnswersOrder,
    incrementAnswerCount: state.incrementAnswerCount,
  }));

  useEffect(() => {
    if (!stage) return;

    if (answerCount < stage.length) {
      if (stage[correctAnswersOrder[answerCount]].isAnswered) {
        incrementAnswerCount();
      }
    }

    if (answerCount === stage.length) {
      nextStage();
    }
  }, [answerCount]);

  return (
    <>
      {stage !== null &&
        gameState === gameStates.GAME &&
        stage.map((s, index) => (
          <NumberedBoard
            key={index}
            position={s.position}
            word={s.word}
            isAnswered={s.isAnswered}
            isCorrect={s.isCorrect}
            index={index}
          />
        ))}
    </>
  );
};

export default Level;
