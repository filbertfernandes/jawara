import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

import LoadingSpinner from "@/components/ui/loadingSpinner";
import { phases, useGame } from "@/hooks/useGame";
import {
  getTranslationAttemptsLeft,
  updateTranslationAttemptsLeft,
} from "@/lib/actions/translation.action";
import {
  getTotalCorrectTranslations,
  incrementCorrectTranslations,
} from "@/lib/actions/user.action";
import { SoundManager } from "@/lib/SoundManager";

const Button = ({ id, word, isSelected, isAnswer = false, onClick }) => (
  <div
    className={`flex h-8 cursor-pointer items-center justify-center rounded-xl border-2 p-1 text-center text-sm font-bold sm:p-2 sm:text-2xl ${
      isSelected & !isAnswer
        ? "cursor-not-allowed bg-gray-500 text-gray-500"
        : "cursor-pointer bg-white transition-all duration-200 ease-in-out hover:bg-gray-200"
    }`}
    onClick={() => onClick(id, word, isSelected)}
  >
    {word}
  </div>
);

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
};

export const TranslationInterface = () => {
  const [correctCount, setCorrectCount] = useState(null);
  const [attempsLeft, setAttemptsLeft] = useState(null);
  const [isGeneratingSentence, setIsGeneratingSentence] = useState(false);
  const [sentence, setSentence] = useState(null);
  const [words, setWords] = useState([]);
  const [wordsAnswer, setWordsAnswer] = useState([]);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");

  const sentenceBox = useRef();

  const { userId, changePhase } = useGame((state) => ({
    userId: state.userId,
    changePhase: state.changePhase,
  }));

  useEffect(() => {
    if (!userId) return;

    const fetchAttemptsLeft = async () => {
      try {
        const { attemptsLeft } = await getTranslationAttemptsLeft({
          userId,
        });

        const { totalCorrectTranslations } = await getTotalCorrectTranslations(
          userId
        );

        setAttemptsLeft(attemptsLeft);
        setCorrectCount(totalCorrectTranslations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttemptsLeft();
  }, []);

  const generateSentence = async () => {
    setIsGeneratingSentence(true);

    try {
      const { attemptsLeft } = await updateTranslationAttemptsLeft({
        userId,
      });
      setAttemptsLeft(attemptsLeft);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/generate-sentence`,
        { method: "POST" }
      );

      const aiAnswer = await response.json();
      const sentenceObject = JSON.parse(aiAnswer.reply);

      if (sentenceBox.current) {
        sentenceBox.current.innerText = sentenceObject.english;

        setSentence(sentenceObject);

        const tempWords = shuffleArray(
          sentenceObject.javanese.split(" ").map((word, index) => ({
            id: index,
            word,
            isSelected: false,
          }))
        );
        setWords(tempWords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingSentence(false);
      setIsFeedbackVisible(false);
      setWordsAnswer([]);
    }
  };

  const checkAnswer = async () => {
    setIsCheckingAnswer(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/check-answer`,
        {
          method: "POST",
          body: JSON.stringify({
            javanese: sentence.javanese,
            english: sentence.english,
            indonesian: sentence.indonesian,
            userAnswer: wordsAnswer.map((item) => item.word).join(" "),
          }),
        }
      );

      const aiAnswer = await response.json();
      const { isTrue, feedback, explanation } = JSON.parse(aiAnswer.reply);

      setIsTrue(isTrue);
      setFeedback(feedback);
      setExplanation(explanation);

      if (isTrue) {
        setCorrectCount(correctCount + 1);
        await incrementCorrectTranslations(userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCheckingAnswer(false);
      setIsFeedbackVisible(true);
    }
  };

  const handleWordClick = (id, word, isSelected) => {
    SoundManager.playSound("buttonClick");

    if (isSelected) {
      // Remove the word object from wordsAnswer if already selected
      setWordsAnswer(wordsAnswer.filter((item) => item.id !== id));
    } else {
      // Add the word object to wordsAnswer if not selected
      setWordsAnswer([...wordsAnswer, { id, word }]);
    }

    // Update the isSelected state in words by id
    setWords(
      words.map((w) => (w.id === id ? { ...w, isSelected: !isSelected } : w))
    );
  };

  return (
    <div className="fullscreen-white translate-y-0 flex-col font-questrial text-black transition-transform duration-500 ease-in-out sm:text-2xl">
      {/* Header */}
      <div className="mb-10 flex h-8 w-full items-center justify-between text-gray-500 sm:mb-20 lg:mb-10">
        <IoMdClose
          className="cursor-pointer text-4xl sm:text-5xl"
          onClick={() => changePhase(phases.FREE)}
        />
        <div className="flex items-center gap-2">
          <div>Correct:</div>
          <div>
            {userId
              ? correctCount || <LoadingSpinner className="animate-spin" />
              : "0"}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="mb-6 flex h-8 w-full items-center justify-between sm:mb-16 lg:mb-6">
        <div className="text-xl font-bold sm:text-3xl">
          Translate this sentence
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <div>Daily Limit:</div>
          <div>
            {userId
              ? attempsLeft || <LoadingSpinner className="animate-spin" />
              : "10"}
          </div>
        </div>
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
          <div
            ref={sentenceBox}
            className="ml-1 h-44 w-4/5 rounded-3xl border-2 px-4 py-2 sm:h-48"
          >
            Hi! Welcome to the Translate Javanese exercise. Click &apos;Generate
            Sentence&apos; to start. You have 10 tries per day!
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex h-36 w-full flex-wrap gap-2 border-y-2 py-2 sm:gap-4 lg:gap-6">
        {wordsAnswer.map((word, index) => (
          <Button
            key={index}
            id={word.id}
            word={word.word}
            isSelected={true}
            isAnswer={true}
            onClick={handleWordClick}
          />
        ))}
      </div>
      <div className="flex h-36 w-full flex-wrap gap-2 py-2 sm:gap-4 lg:gap-6">
        {words.map((word, index) => (
          <Button
            key={word.id}
            id={word.id}
            word={word.word}
            isSelected={word.isSelected}
            onClick={handleWordClick}
          />
        ))}
      </div>

      {/* Check Button */}
      <div>
        {userId ? (
          <div
            className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-white hover:bg-orange-600 sm:mt-20 sm:text-3xl lg:mt-10"
            onClick={sentence ? checkAnswer : generateSentence}
          >
            {isCheckingAnswer
              ? "Checking....."
              : sentence
              ? "Check"
              : isGeneratingSentence
              ? "Generating....."
              : "Generate Sentence"}
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-white hover:bg-orange-600 sm:mt-20 sm:text-3xl lg:mt-10"
          >
            Sign In to Generate Sentence
          </Link>
        )}
      </div>

      <div
        className={`
          absolute bottom-0 left-0 z-10 flex flex-col gap-4 justify-center items-center
          min-h-1/4 h-auto w-full flex-wrap p-2
          transition-transform duration-500 ease-in-out
          sm:px-12 sm:py-6 md:gap-6 lg:px-32
          ${isFeedbackVisible ? "translate-y-0" : "translate-y-full"}
          ${isTrue ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}
        `}
      >
        <div className="flex h-8 w-full items-center">
          {isTrue ? (
            <FaCheckCircle className="text-3xl sm:text-5xl" />
          ) : (
            <IoMdCloseCircle className="text-3xl sm:text-5xl" />
          )}
          <h5 className="ml-2 text-2xl font-bold sm:text-4xl">{feedback}</h5>
        </div>
        <div className="w-full text-sm sm:text-lg md:text-xl">
          {explanation}
        </div>
        <div className="flex w-full justify-center">
          <div
            className={`btn-template flex h-8 w-1/2 items-center justify-center text-white ${
              isTrue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-red-700 hover:bg-red-800"
            }`}
            onClick={generateSentence}
          >
            {isGeneratingSentence ? "Generating....." : "Generate Sentence"}
          </div>
        </div>
      </div>
    </div>
  );
};
