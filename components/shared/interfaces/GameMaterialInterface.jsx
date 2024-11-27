import React, { useEffect, useState, useCallback } from "react";
import { PiSpeakerHighBold } from "react-icons/pi";

import { SoundManager } from "@/lib/SoundManager";

// Reusable component to handle word variants (ngoko, madya, alus)
const WordVariant = ({ variant, label, playSound }) => (
  <div className="mb-2 flex justify-between text-base lg:text-xl">
    <div>
      {variant}{" "}
      <span className="text-[0.5rem] text-white/50 lg:text-xs">({label})</span>
    </div>
    <button onClick={playSound}>
      <PiSpeakerHighBold />
    </button>
  </div>
);

const GameMaterialInterface = ({ words }) => {
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
      className={`mt-8 flex size-full flex-col items-center gap-6 sm:-mt-8 sm:gap-4 lg:ml-8 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-orange-500 drop-shadow-lg">Material</h1>

      <div className="flex size-full flex-wrap justify-evenly gap-4 overflow-y-auto px-4 text-white sm:gap-1 sm:px-0">
        {words.map((word, index) => (
          <div
            key={index}
            className="mb-2 flex h-40 w-full items-center justify-between rounded-2xl bg-stone-800/50 pl-4 sm:w-[45%] xl:h-44 xl:w-[30%]"
          >
            {word.hexColor ? (
              <div
                className="h-24 w-36 rounded-2xl"
                style={{ backgroundColor: word.hexColor }}
              ></div>
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/388/394/non_2x/funny-child-showing-human-body-parts-vector.jpg"
                alt="material-image"
                className="size-24 rounded-2xl object-cover"
                loading="lazy" // Lazy load image for performance
              />
            )}

            <div className="flex size-full flex-col px-4 py-2 xl:py-4">
              <div className="mb-2 text-2xl underline">{word.english}</div>
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
