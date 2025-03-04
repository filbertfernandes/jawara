import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useState, useCallback } from "react";
import { PiSpeakerHighBold } from "react-icons/pi";

import { SoundManager } from "@/lib/SoundManager";

// Reusable component to handle word variants (ngoko, madya, alus)
const WordVariant = ({ variant, label, playSound }) => (
  <div className="mb-3">
    <div className="-mb-2 flex justify-between text-xl md:text-2xl lg:text-3xl">
      <div>{variant} </div>
      <button onClick={playSound}>
        <PiSpeakerHighBold />
      </button>
    </div>
    <span className="text-sm text-white/75 md:text-base lg:text-lg">
      ({label})
    </span>
  </div>
);

const GameMaterialInterface = ({ words }) => {
  const t = useTranslations("Home");

  const [isVisible, setIsVisible] = useState(false);

  // Trigger popup effect after component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Memoize the sound handler to prevent unnecessary re-renders
  const handlePlaySound = useCallback(() => {
    SoundManager.playSound("gameComplete");
  }, []);

  return (
    <div
      className={`mt-8 flex size-full flex-col items-center ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-white drop-shadow-lg">{t("material")}</h1>

      <div className="mt-4 flex size-full flex-wrap justify-evenly overflow-y-auto px-4 pb-32 text-white">
        {words.map((word, index) => (
          <div
            key={index}
            className="my-5 flex h-60 w-full items-center justify-between rounded-2xl sm:my-10 sm:w-[90%] md:h-64 lg:h-72 xl:w-[45%]"
          >
            {word.type === "colors" ? (
              <div
                className="h-full w-3/4 sm:w-[90%]"
                style={{ backgroundColor: word.hexColor }}
              ></div>
            ) : word.type === "numbers" ? (
              ""
            ) : (
              <Image
                src={word.image}
                alt="material-image"
                width={500}
                height={500}
                className="h-full w-[45%] object-cover sm:w-1/2"
                loading="lazy" // Lazy load image for performance
              />
            )}

            <div className="flex size-full flex-col bg-gradient-to-r from-orange-500 to-orange-700 p-4 xl:py-4">
              <div className="mb-4 text-center text-2xl md:text-3xl lg:text-4xl">
                {word[t("language")]}
              </div>
              <WordVariant
                variant={word.ngoko}
                label="Ngoko"
                playSound={handlePlaySound}
              />
              <WordVariant
                variant={word.madya}
                label="Krama Madya"
                playSound={handlePlaySound}
              />
              <WordVariant
                variant={word.alus}
                label="Krama Alus"
                playSound={handlePlaySound}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(GameMaterialInterface);
