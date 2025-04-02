import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useLaptop } from "./stores/useLaptop";
import BackButton from "../shared/interfaces/BackButton";

import { Slider } from "@/components/ui/slider";
import { phases, useGame } from "@/hooks/useGame";

const LaptopInterface = () => {
  const t = useTranslations("Home");

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
      <div className="fixed left-4 top-4 z-10">
        <BackButton onClick={() => changePhase(phases.FREE)} />
      </div>
      <div className="fixed bottom-0 mb-20 flex h-12 w-full items-end justify-center">
        <div className="w-3/4 laptop-sm:w-1/2 lg:w-1/4">
          <h6 className="h6-bold mb-4 text-center font-questrial text-gray-100">
            {t("adjust_screen_rotation")}
          </h6>
          <Slider
            defaultValue={[((screenRotation - 0.3) / (2.4 - 0.3)) * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleValueChange}
          />
        </div>
      </div>
    </>
  );
};

export default LaptopInterface;
