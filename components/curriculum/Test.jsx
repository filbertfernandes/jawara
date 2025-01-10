import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useCurriculum } from "./stores/useCurriculum";

import {
  getUserProgress,
  incrementCompletedPhases,
  updatePretestScore,
} from "@/lib/actions/userProgress.action";

const Test = ({ questions, chapterId, userProgress }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(questions.length).fill(-1)
  );
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const { phase, changePhase } = useCurriculum((state) => ({
    phase: state.phase,
    changePhase: state.changePhase,
  }));

  useEffect(() => {
    if (userProgress.preTestScore >= 0) {
      setIsFinished(true);
    }
  }, []);

  const handleOptionClick = (index) => {
    // Update the userAnswers state at the current question index
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = index;
      return newAnswers;
    });
  };

  const handleFinished = async () => {
    setQuestionIndex(0);

    let correctCount = 0;

    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }

    setScore(correctCount / questions.length);

    // Call server actions after finishing the test
    try {
      // Update pretest score
      await updatePretestScore(
        chapterId,
        userProgress.userId,
        (correctCount / questions.length) * 100
      );

      // Increment completed phases
      await incrementCompletedPhases(chapterId, userProgress.userId);

      setShowOverlay(true);
      setIsFinished(true);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleCloseOverlay = () => {
    changePhase(phase + 1);
    setShowOverlay(false);
  };

  return (
    <div
      className={`flex size-full flex-col items-center justify-center gap-6 px-4 text-black ${
        showOverlay ? "bg-black/80" : ""
      }`}
    >
      {isFinished ? (
        <div className="text-center">
          <div className="h5-bold mb-1">
            Nice, You&apos;ve finished the pre-test!
          </div>
          <div className="text-sm text-gray-500 lg:text-xl">
            You can start continue learn the content
          </div>
        </div>
      ) : !isStarted ? (
        <>
          <div className="text-center">
            <div className="h5-bold mb-1">
              Let&apos;s see what you already know!
            </div>
            <div className="text-sm text-gray-500 lg:text-xl">
              Your score is private and will not be shown to others.
            </div>
          </div>
          <div
            className="btn-template w-36 cursor-pointer bg-orange-500 text-white hover:bg-orange-600 lg:w-48 lg:text-2xl"
            onClick={() => setIsStarted(true)}
          >
            Start Pretest
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 sm:w-3/4 lg:w-2/3">
          <div className="text-center text-gray-500 sm:text-lg md:text-xl">
            Question {questionIndex + 1} / {questions.length}
          </div>
          <div className="h3-bold flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-center text-white">
            {questions[questionIndex].question}
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            {questions[questionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border px-4 text-center shadow-sm shadow-black/30 hover:bg-gray-200 sm:text-lg md:text-xl ${
                  userAnswers[questionIndex] === index ? "bg-gray-200" : ""
                }`}
                onClick={() => handleOptionClick(index)}
              >
                <div>{["A", "B", "C", "D"][index]}</div>
                <div>{option}</div>
                <div></div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full justify-between sm:text-lg md:text-xl">
            <div
              className={`w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-white ${
                questionIndex === 0 ? "invisible" : ""
              }`}
              onClick={() => setQuestionIndex(questionIndex - 1)}
            >
              Prev
            </div>
            <div
              className="w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-white"
              onClick={
                questionIndex + 1 < questions.length
                  ? () => setQuestionIndex(questionIndex + 1)
                  : () => handleFinished(false)
              }
            >
              {questionIndex + 1 < questions.length ? "Next" : "Finish"}
            </div>
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="absolute flex items-center justify-center">
          <button
            className="absolute -right-8 -top-8 rounded-full p-1 text-3xl text-white sm:text-4xl"
            onClick={handleCloseOverlay}
          >
            <IoMdClose />
          </button>
          <div className="flex size-52 flex-col flex-wrap items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 text-center text-white lg:size-64">
            <div className="mb-2 w-full text-2xl font-bold">Your Score</div>
            <div className="text-6xl font-bold">{(score * 100).toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
