import Image from "next/image";
import { IoMdClose } from "react-icons/io";

import { phases, useGame } from "@/hooks/useGame";

const Button = ({ text, isSelected }) => (
  <div
    className={`flex h-8 cursor-pointer items-center justify-center rounded-xl border-2 p-1 text-center text-sm font-bold sm:p-2 sm:text-2xl ${
      isSelected
        ? "cursor-not-allowed bg-gray-500 text-gray-500"
        : "cursor-pointer bg-white transition-all duration-200 ease-in-out hover:bg-gray-200"
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
    <div className="fullscreen-white translate-y-0 font-questrial text-black transition-transform duration-500 ease-in-out sm:text-2xl">
      {/* Header */}
      <div className="mb-10 flex h-8 w-full items-center justify-between text-gray-500 sm:mb-20 lg:mb-10">
        <IoMdClose
          className="cursor-pointer text-4xl sm:text-5xl"
          onClick={() => changePhase(phases.FREE)}
        />
        <div>Correct Answers = {correctAnswers}</div>
      </div>

      {/* Instruction */}
      <div className="mb-6 flex h-8 w-full items-center text-xl font-bold sm:mb-16 sm:text-3xl lg:mb-6">
        Translate this sentence
      </div>

      {/* Sentence Section */}
      <div className="flex w-full justify-center">
        <div className="flex h-48 w-full sm:h-60 lg:w-3/4">
          <Image
            src="/images/character/jawara-ai.png"
            alt="Jawara AI Character"
            width={175}
            height={175}
            className="h-48 w-auto sm:h-60"
          />
          <div className="ml-1 h-44 w-4/5 rounded-3xl border-2 px-4 py-2 sm:h-48">
            {sentence.english}
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex h-36 w-full flex-wrap gap-2 border-y-2 py-2 sm:gap-4 lg:gap-6">
        {buttonTexts
          .filter((button) => button.isSelected)
          .map((button, index) => (
            <Button
              key={index}
              text={button.text}
              isSelected={!button.isSelected}
            />
          ))}
      </div>
      <div className="flex h-36 w-full flex-wrap gap-2 py-2 sm:gap-4 lg:gap-6">
        {buttonTexts.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            isSelected={button.isSelected}
          />
        ))}
      </div>

      {/* Check Button */}
      <div className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-white hover:bg-orange-600 sm:mt-20 sm:text-3xl lg:mt-10">
        Check
      </div>
    </div>
  );
};
