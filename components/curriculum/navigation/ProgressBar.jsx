import { FaDotCircle, FaRegDotCircle } from "react-icons/fa";

import { useCurriculum } from "../stores/useCurriculum";

const ProgressBar = ({ title, first, completed, inProgress, active }) => {
  const { changePhase } = useCurriculum((state) => ({
    changePhase: state.changePhase,
  }));

  return (
    <div
      className={`flex h-28 w-full cursor-pointer items-center justify-center rounded-xl text-gray-900 hover:bg-gray-100 ${
        active && "bg-gray-100"
      }`}
      onClick={completed || inProgress ? () => changePhase(title) : undefined}
    >
      <div className="relative flex w-1/4">
        {!first && (completed || inProgress) && (
          <div className="absolute left-4 top-[-4.8rem]">
            <div className="h-20 w-1 bg-orange-500"></div>
          </div>
        )}
        {completed ? (
          <FaDotCircle className="mr-4 text-4xl text-orange-500" />
        ) : inProgress ? (
          <FaRegDotCircle className="mr-4 text-4xl text-orange-500" />
        ) : (
          <FaRegDotCircle className="mr-4 text-4xl text-gray-300" />
        )}
      </div>
      <div className="flex w-1/2">
        <h5 className="text-xl font-bold lg:text-2xl">{title}</h5>
      </div>
    </div>
  );
};

export default ProgressBar;
