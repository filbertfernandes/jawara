import { useEffect } from "react";
import { GiExitDoor } from "react-icons/gi";

import { useLaptop } from "./stores/useLaptop";

import { Slider } from "@/components/ui/slider";
import { phases, useGame } from "@/hooks/useGame";

const LaptopInterface = () => {
  const { changePhase } = useGame((state) => ({
    changePhase: state.changePhase,
  }));

  const { screenRotation, setScreenRotation } = useLaptop((state) => ({
    screenRotation: state.screenRotation,
    setScreenRotation: state.setScreenRotation,
  }));

  const handleValueChange = (value) => {
    const sliderValue = value[0];

    const mappedValue = 0.3 + (sliderValue / 100) * (2.4 - 0.3);

    setScreenRotation(mappedValue);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        changePhase(phases.FREE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 flex h-12 w-full items-end justify-center">
        <div className="w-3/4 laptop-sm:w-1/2 lg:w-1/4">
          <Slider
            defaultValue={[((screenRotation - 0.3) / (2.4 - 0.3)) * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleValueChange}
          />
        </div>
      </div>
      <div className="fixed bottom-0 flex h-20 w-full justify-center">
        <div
          className="text-3xl text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-gray-200 sm:text-4xl"
          onClick={() => changePhase(phases.FREE)}
        >
          <GiExitDoor />
        </div>
      </div>
    </>
  );
};

export default LaptopInterface;
