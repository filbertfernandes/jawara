import { useTranslations } from "next-intl";
import { GoNumber } from "react-icons/go";
import { IoBody, IoColorPalette } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";

const scoresData = [
  {
    category_english: "Body Parts",
    category_indonesian: "Anggota Tubuh",
    icon: <IoBody />,
  },
  {
    category_english: "Colors",
    category_indonesian: "Warna",
    icon: <IoColorPalette />,
  },
  {
    category_english: "Numbers",
    category_indonesian: "Angka",
    icon: <GoNumber />,
  },
  {
    category_english: "Animals",
    category_indonesian: "Hewan",
    icon: <MdOutlinePets />,
  },
];

const ScoreTable = ({ scores }) => {
  const t = useTranslations("Profile");

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 p-6">
      <div className="flex items-center justify-center">
        <h6 className="h6-bold">{t("vocabulary_scores")}</h6>
        <TbVocabulary className="ml-1 text-xl" />
      </div>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {Object.entries(scores).map(([game, scoreCategories], index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border p-4"
          >
            <div className="flex w-full items-center">
              <h3 className="h6-bold">
                {scoresData[index][`category_${t("language")}`]}
              </h3>
              <div className="ml-1 text-xl lg:text-3xl">
                {scoresData[index].icon}
              </div>
            </div>
            {Object.entries(scoreCategories).map(([category, score], i) => (
              <div
                key={i}
                className="mt-1 flex w-full justify-between text-base sm:text-lg lg:text-xl"
              >
                <h6 className="capitalize">
                  {category === "ngoko" ? category : `Krama ${category}`}
                </h6>
                <h6>
                  {score === -1 ? 0 : score}
                  {index === 0 && (
                    <span className="ml-0.5 sm:text-base lg:text-lg">s</span>
                  )}
                </h6>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreTable;
