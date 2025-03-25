import { GoNumber } from "react-icons/go";
import { IoBody, IoColorPalette } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";

const scoresData = [
  {
    category: "Body Parts",
    icon: <IoBody />,
  },
  {
    category: "Colors",
    icon: <IoColorPalette />,
  },
  {
    category: "Numbers",
    icon: <GoNumber />,
  },
  {
    category: "Animals",
    icon: <MdOutlinePets />,
  },
];

const ScoreTable = ({ scores }) => {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-6 py-4">
      <div className="flex items-center justify-center">
        <h6 className="h6-bold">Vocabulary Scores</h6>
        <TbVocabulary className="ml-1 text-xl" />
      </div>
      {Object.entries(scores).map(([game, scoreCategories], index) => (
        <div key={index} className="flex w-full flex-wrap items-center pb-2">
          <h3 className="h6-bold">{scoresData[index].category}</h3>
          <div className="ml-1 text-xl lg:text-3xl">
            {scoresData[index].icon}
          </div>
          {Object.entries(scoreCategories).map(([category, score], i) => (
            <div
              key={i}
              className="mt-1 flex w-full justify-between text-base sm:text-lg lg:text-xl"
            >
              <h6 className="capitalize">{category}</h6>
              <h6>{score}</h6>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScoreTable;
