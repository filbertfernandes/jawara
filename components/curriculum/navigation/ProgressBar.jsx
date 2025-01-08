import { FaDotCircle, FaRegDotCircle } from "react-icons/fa";

const ProgressBar = ({ title, first, completed, active }) => {
  return (
    <div
      className={`flex h-28 w-full items-center justify-center rounded-xl text-black hover:cursor-pointer hover:bg-gray-100 ${
        active && "bg-gray-100"
      }`}
    >
      <div className="relative flex w-1/4">
        {!first && (completed || active) && (
          <div className="absolute left-4 top-[-4.8rem]">
            <div className="h-20 w-1 bg-orange-500"></div>
          </div>
        )}
        {completed ? (
          <FaDotCircle className="mr-4 text-4xl text-orange-500" />
        ) : active ? (
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
