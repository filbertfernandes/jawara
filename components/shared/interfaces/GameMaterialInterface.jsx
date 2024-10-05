import React, { useEffect, useState, useCallback } from "react"
import { PiSpeakerHighBold } from "react-icons/pi"
import { SoundManager } from "@/lib/SoundManager"

// Reusable component to handle word variants (ngoko, madya, alus)
const WordVariant = ({ variant, label, playSound }) => (
  <div className="flex justify-between text-base mb-2 lg:text-xl">
    <div>
      {variant}{" "}
      <span className="text-[0.5rem] text-white/50 lg:text-xs">({label})</span>
    </div>
    <button onClick={playSound}>
      <PiSpeakerHighBold />
    </button>
  </div>
)

const GameMaterialInterface = ({ words }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Trigger popup effect after component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Memoize the sound handler to prevent unnecessary re-renders
  const handlePlaySound = useCallback(() => {
    SoundManager.playSound("gameComplete")
  }, [])

  return (
    <div
      className={`flex flex-col items-center gap-6 w-full h-full mt-8 sm:gap-4 sm:-mt-8 lg:ml-8 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-sky-400 drop-shadow-lg">Material</h1>

      <div className="flex flex-wrap gap-4 justify-evenly w-full h-full px-4 text-white overflow-y-auto sm:px-0 sm:gap-1">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full h-40 bg-stone-800/50 rounded-[1rem] mb-2 pl-4 sm:w-[45%] xl:w-[30%] xl:h-44"
          >
            {word.hexColor ? (
              <div
                className="w-36 h-24 rounded-[1rem]"
                style={{ backgroundColor: word.hexColor }}
              ></div>
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/388/394/non_2x/funny-child-showing-human-body-parts-vector.jpg"
                alt="material-image"
                className="w-24 h-24 object-cover rounded-[1rem]"
                loading="lazy" // Lazy load image for performance
              />
            )}

            <div className="flex flex-col w-full h-full px-4 py-2 xl:py-4">
              <div className="text-2xl underline mb-2">{word.english}</div>
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
  )
}

export default React.memo(GameMaterialInterface)
