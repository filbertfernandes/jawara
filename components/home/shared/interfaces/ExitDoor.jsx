import { GiExitDoor } from "react-icons/gi";

import { gameStates, useGame } from "@/hooks/useGame";

const ExitDoor = () => {
  const { changeGameState } = useGame((state) => ({
    changeGameState: state.changeGameState,
  }));

  return (
    <div className="absolute left-0 top-0 flex h-full cursor-pointer items-center p-2 text-center text-3xl md:p-4 sm:text-4xl">
      <div>
        <GiExitDoor
          className="cursor-pointer text-white transition-all duration-100 ease-in-out hover:text-gray-200"
          onClick={() => {
            changeGameState(gameStates.MENU);
          }}
        />
      </div>
    </div>
  );
};

export default ExitDoor;
