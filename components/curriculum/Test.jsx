import { useState } from "react";

const Test = ({ questions }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(15).fill(-1));

  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 px-4 text-black">
      {!isStarted ? (
        <>
          <div className="text-center">
            <div className="h5-bold mb-1">
              Let&apos;s see what you already know!
            </div>
            <div className="text-sm text-gray-500">
              Your score is private and will not be shown to others.
            </div>
          </div>
          <div
            className="btn-template w-36 cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => setIsStarted(true)}
          >
            Start Pretest
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 sm:w-3/4 lg:w-2/3">
          <div className="text-center text-gray-500 sm:text-lg md:text-xl">
            Question {questionIndex + 1} / 20
          </div>
          <div className="h3-bold flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-center text-white">
            {questions[questionIndex].question}
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            {questions[questionIndex].options.map((option, index) => (
              <div
                key={index}
                className="flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border px-4 text-center shadow-sm shadow-black/30 hover:bg-gray-200 sm:text-lg md:text-xl"
              >
                <div>{["A", "B", "C", "D"][index]}</div>
                <div>{option}</div>
                <div></div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full justify-between sm:text-lg md:text-xl">
            <div className="w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-white">
              Prev
            </div>
            <div className="w-20 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center font-bold text-white">
              Next
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
