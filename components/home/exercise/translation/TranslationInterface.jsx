import Image from "next/image";
import { IoMdClose } from "react-icons/io";

import { phases, useGame } from "@/hooks/useGame";

const Button = ({ text, isSelected }) => (
  <div
    className={`flex h-8 cursor-pointer items-center justify-center rounded-xl border-2 p-1 text-center text-sm font-bold ${
      isSelected
        ? "cursor-not-allowed bg-gray-500 text-gray-500"
        : "cursor-pointer bg-white"
    }`}
  >
    {text}
  </div>
);

export const TranslationInterface = () => {
  const correctAnswers = 0;
  const sentence = {
    indonesian:
      "Aku biasanya minum teh dengan roti dan membaca koran di teras bersama anjingku setiap pagi.",
    english:
      "I usually drink tea with bread and read the newspaper on the porch with my dog every morning.",
    javanese:
      "Aku biasane ngeteh karo roti lan maca koran ing teras bareng asuku saben esuk.",
  };

  const buttonTexts = [
    { text: "Aku", isSelected: true },
    { text: "biasane", isSelected: false },
    { text: "ngeteh", isSelected: true },
    { text: "karo", isSelected: false },
    { text: "roti", isSelected: false },
    { text: "lan", isSelected: false },
    { text: "maca", isSelected: false },
    { text: "koran", isSelected: true },
    { text: "ing", isSelected: true },
    { text: "teras", isSelected: true },
    { text: "bareng", isSelected: false },
    { text: "asuku", isSelected: false },
    { text: "saben", isSelected: false },
    { text: "esuk", isSelected: false },
  ];

  const { changePhase } = useGame((state) => ({
    changePhase: state.changePhase,
  }));

  return (
    <div className="fullscreen-white translate-y-0 font-questrial text-black transition-transform duration-500 ease-in-out">
      {/* Header */}
      <div className="mb-10 flex h-8 w-full items-center justify-between text-gray-500">
        <IoMdClose
          className="cursor-pointer text-4xl"
          onClick={() => changePhase(phases.FREE)}
        />
        <div>Correct Answers = {correctAnswers}</div>
      </div>

      {/* Instruction */}
      <div className="h5-bold mb-6 flex h-8 w-full items-center">
        Translate this sentence
      </div>

      {/* Sentence Section */}
      <div className="flex h-48 w-full">
        <Image
          src="/images/character/jawara-ai.png"
          alt="Jawara AI Character"
          width={175}
          height={175}
          className="h-48 w-auto"
        />
        <div className="ml-1 h-44 w-4/5 rounded-3xl border-2 px-4 py-2 text-base">
          {sentence.english}
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex h-36 w-full flex-wrap gap-2 border-y-2 py-2">
        {buttonTexts
          .filter((button) => button.isSelected) // Filter buttons with isSelected === true
          .map((button, index) => (
            <Button
              key={index}
              text={button.text}
              isSelected={!button.isSelected}
            />
          ))}
      </div>
      <div className="flex h-36 w-full flex-wrap gap-2 py-2">
        {buttonTexts.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            isSelected={button.isSelected}
          />
        ))}
      </div>

      {/* Check Button */}
      <div className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-white">
        Check
      </div>
    </div>
  );
};
