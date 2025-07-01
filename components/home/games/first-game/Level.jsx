import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";

import { useFirstGame } from "./stores/useFirstGame.jsx";

import { useGame, gameStates } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function Level({ characterBody }) {
  const { gameState, changeGameState } = useGame((state) => ({
    gameState: state.gameState,
    changeGameState: state.changeGameState,
  }));

  const {
    level,
    currentStage,
    nextStage,
    correctCount,
    gameOver,
    hoveredLockBox,
    setHoveredLockBox,
    mode,
    draggingItem,
  } = useFirstGame((state) => ({
    level: state.level,
    currentStage: state.currentStage,
    nextStage: state.nextStage,
    correctCount: state.correctCount,
    gameOver: state.gameOver,
    hoveredLockBox: state.hoveredLockBox,
    setHoveredLockBox: state.setHoveredLockBox,
    mode: state.mode,
    draggingItem: state.draggingItem,
  }));

  useEffect(() => {
    if (!level) return;

    if (correctCount === level[currentStage].length) {
      level[currentStage].forEach((word) => {
        word.isCorrect = false;
      });

      if (currentStage < 4) {
        nextStage();
      } else {
        SoundManager.playSound("gameComplete");
        changeGameState(gameStates.GAME_OVER);
        gameOver();
      }
    }
  }, [correctCount]);

  return (
    <>
      {/* HTML */}
      {level !== null &&
        gameState === gameStates.GAME &&
        level[currentStage].map((lockBox, index) => (
          <Html
            key={index}
            position={lockBox.position}
            wrapperClass="label"
            distanceFactor={1.2}
            occlude={[characterBody]}
          >
            <div
              className="flex"
              onMouseEnter={() =>
                !lockBox.isCorrect && setHoveredLockBox(index)
              }
              onMouseLeave={() => setHoveredLockBox(null)}
            >
              <div
                className={`z-0 flex size-14 items-center justify-center ${
                  lockBox.isCorrect ? "bg-orange-600" : "bg-gray-600"
                }`}
              >
                {lockBox.isCorrect ? (
                  <FaUnlock className="text-2xl" />
                ) : (
                  <FaLock className="text-2xl" />
                )}
              </div>
              <div
                className={`z-0 flex h-14 w-32 items-center justify-center bg-white text-2xl font-bold capitalize ${
                  lockBox.isCorrect ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {draggingItem !== null && hoveredLockBox === index
                  ? `${draggingItem}?`
                  : lockBox.isCorrect
                  ? lockBox[mode]
                  : "?????"}
              </div>
            </div>
          </Html>
        ))}
    </>
  );
}
