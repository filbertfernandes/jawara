import { useCallback } from "react";

import { useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function FreePhaseInterface() {
  const {
    changePhase,
    canChangePhase,
    setCanChangePhase,
    canPressEnter,
    setCanPressEnter,
  } = useGame((state) => ({
    changePhase: state.changePhase,
    canChangePhase: state.canChangePhase,
    setCanChangePhase: state.setCanChangePhase,
    canPressEnter: state.canPressEnter,
    setCanPressEnter: state.setCanPressEnter,
  }));

  // Memoized callback to prevent unnecessary re-renders
  const handleEnterButtonClick = useCallback(() => {
    if (canChangePhase.condition && canChangePhase.phase !== "") {
      SoundManager.playSound("buttonClick");
      changePhase(canChangePhase.phase);
      setCanPressEnter(false);
      setCanChangePhase(false, "");
    }
  }, [canChangePhase, changePhase, setCanChangePhase, setCanPressEnter]);

  return (
    <>
      <div
        className={`absolute bottom-0 left-0 mb-2 flex w-full justify-center p-1 font-bebas text-3xl text-white lg:text-4xl ${
          canPressEnter ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="btn-template w-[30%] bg-orange-500 sm:w-[15%] lg:w-[10%]"
          onClick={handleEnterButtonClick}
        >
          Enter
        </div>
      </div>
    </>
  );
}
