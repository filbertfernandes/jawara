import { GiExitDoor } from "react-icons/gi";

import { gameStates, useGame } from "@/hooks/useGame";
import { SoundManager } from "@/lib/SoundManager";

const ExitDoor = () => {
  const { changeGameState } = useGame((state) => ({
    changeGameState: state.changeGameState,
  }));

  return (
    <div className="absolute left-0 top-0 flex h-full cursor-pointer items-center p-2 text-center font-bebas text-3xl md:p-4 md:text-4xl lg:text-6xl">
      <div>
        <GiExitDoor
          className="cursor-pointer text-white hover:text-orange-500"
          onClick={() => {
            SoundManager.playSound("buttonClick");
            changeGameState(gameStates.MENU);
          }}
        />
      </div>
    </div>
  );
};

export default ExitDoor;
