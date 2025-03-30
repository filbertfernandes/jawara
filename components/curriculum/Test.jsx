import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useCurriculum } from "./stores/useCurriculum";

import {
  incrementCompletedPhases,
  updatePosttestScore,
  updatePretestScore,
} from "@/lib/actions/userProgress.action";

const Test = ({ chapter, isPostTest = false }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(chapter.questions.length).fill(-1)
  );
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetry, setIsRetry] = useState(true);

  const { phase, changePhase, updatedUserProgress } = useCurriculum(
    (state) => ({
      phase: state.phase,
      changePhase: state.changePhase,
      updatedUserProgress: state.updatedUserProgress,
    })
  );

  useEffect(() => {
    if (!updatedUserProgress || chapter.id !== updatedUserProgress?.chapterId)
      return;

    setIsLoading(false);

    const { preTestScore, postTestScore } = updatedUserProgress;

    if (!isPostTest) {
      setIsFinished(preTestScore >= 0);
    } else {
      const isPostTestPassed =
        updatedUserProgress.completedPhases === chapter.phases.length;
      const isPostTestRetry =
        postTestScore >= 0 &&
        postTestScore < 70 &&
        updatedUserProgress.completedPhases < chapter.phases.length;

      setIsFinished(isPostTestPassed || isPostTestRetry);
      setIsRetry(isPostTestRetry);
    }
  }, [updatedUserProgress]);

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

    // Calculate the correct answers and score
    chapter.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = (correctCount / chapter.questions.length) * 100;
    setScore(calculatedScore);

    const updateProgress = async (calculatedScore) => {
      try {
        if (!isPostTest) {
          await updatePretestScore(
            chapter.id,
            updatedUserProgress.userId,
            calculatedScore
          );
          await incrementCompletedPhases(
            chapter.id,
            updatedUserProgress.userId
          );
        } else {
          if (updatedUserProgress.postTestScore < 0) {
            await updatePosttestScore(
              chapter.id,
              updatedUserProgress.userId,
              calculatedScore
            );
          }
          if (
            calculatedScore >= 70 ||
            updatedUserProgress.completedPhases >= chapter.phases.length
          ) {
            await incrementCompletedPhases(
              chapter.id,
              updatedUserProgress.userId
            );
          }
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    };

    // Determine if retry is needed
    if (
      isPostTest &&
      calculatedScore < 70 &&
      updatedUserProgress.completedPhases < chapter.phases.length
    ) {
      setIsRetry(true);
    } else {
      setIsRetry(false);
    }

    await updateProgress(calculatedScore);

    setShowOverlay(true);
    setIsFinished(true);
  };

  const handleCloseOverlay = () => {
    if (!isPostTest) {
      changePhase(chapter.phases[1].name);
    }

    setShowOverlay(false);
  };

  const handleRetry = () => {
    setIsFinished(false);
    setIsRetry(false);
    setIsStarted(true);
  };

  return (
    <div
      className={`flex size-full flex-col items-center justify-center gap-6 px-4 text-gray-900 ${
        showOverlay ? "bg-black/70" : ""
      }`}
    >
      {isLoading ? (
        <div className="text-center">
          <div className="h5-bold mb-1">Loading...</div>
        </div>
      ) : isFinished ? (
        <>
          <div className="text-center">
            <div className="h5-bold mb-1">
              {!isPostTest
                ? "Nice, You've finished the pre-test!"
                : isRetry
                ? "Try again!"
                : "Congratulations, You've finished this chapter!"}
            </div>
            <div className="text-sm text-gray-600 lg:text-xl">
              {!isPostTest
                ? "You can start continue learn the content."
                : isRetry
                ? "You should get 70 and higher score to complete this chapter."
                : "You still can retry the test for exercise."}
            </div>
          </div>
          {isPostTest && (
            <div
              className="btn-template w-36 cursor-pointer bg-orange-500 text-gray-100 hover:bg-orange-600 lg:w-48 lg:text-2xl"
              onClick={handleRetry}
            >
              Retry
            </div>
          )}
        </>
      ) : !isStarted ? (
        <>
          <div className="text-center">
            <div className="h5-bold mb-1">
              {!isPostTest
                ? "Let's see what You already know!"
                : "Let's see what You've learned!"}
            </div>
            <div className="text-sm text-gray-600 lg:text-xl">
              Your score is private and will not be shown to others.
            </div>
          </div>
          <div
            className="btn-template w-36 cursor-pointer bg-orange-500 text-gray-100 hover:bg-orange-600 lg:w-48 lg:text-2xl"
            onClick={() => setIsStarted(true)}
          >
            {!isPostTest ? "Start Pretest" : "Start Posttest"}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 sm:w-3/4 lg:w-2/3">
          <div className="text-center text-gray-600 sm:text-lg md:text-xl">
            Question {questionIndex + 1} / {chapter.questions.length}
          </div>
          <div className="h3-bold flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-center text-gray-100">
            {chapter.questions[questionIndex].question}
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            {chapter.questions[questionIndex].options.map((option, index) => (
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
              className={`w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-gray-100 ${
                questionIndex === 0 ? "invisible" : ""
              }`}
              onClick={() => setQuestionIndex(questionIndex - 1)}
            >
              Prev
            </div>
            <div
              className="w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-gray-100"
              onClick={
                questionIndex + 1 < chapter.questions.length
                  ? () => setQuestionIndex(questionIndex + 1)
                  : () => handleFinished()
              }
            >
              {questionIndex + 1 < chapter.questions.length ? "Next" : "Finish"}
            </div>
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="absolute flex items-center justify-center">
          <button
            className="absolute -right-8 -top-8 rounded-full p-1 text-3xl text-gray-100 sm:text-4xl"
            onClick={handleCloseOverlay}
          >
            <IoMdClose />
          </button>
          <div className="flex size-52 flex-col flex-wrap items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 text-center text-gray-100 lg:size-64">
            <div className="mb-2 w-full text-2xl font-bold">Your Score</div>
            <div className="text-6xl font-bold">{score.toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
