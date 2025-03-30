import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ onClick }) => {
  return (
    <div
      className="pointer-events-auto flex size-8 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-3xl text-gray-100 transition-all duration-300 ease-in-out hover:bg-orange-600 lg:size-10 lg:text-4xl"
      onClick={onClick}
    >
      <IoIosArrowBack />
    </div>
  );
};

export default BackButton;
