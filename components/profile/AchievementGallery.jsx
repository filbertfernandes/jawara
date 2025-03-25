import Image from "next/image";
import { FaAward } from "react-icons/fa";

const achievementsData = [
  {
    src: "/images/achievements/curriculum-completion.jpg",
    description:
      "Complete the entire curriculum to master key language concepts.",
  },
  {
    src: "/images/achievements/top-3.jpg",
    description: "Achieve a top 3 position in the Vocabulary Game.",
  },
  {
    src: "/images/achievements/top-10.jpg",
    description: "Achieve a top 10 position in the Vocabulary Game.",
  },
  {
    src: "/images/achievements/top-50.jpg",
    description: "Achieve a top 50 position in the Vocabulary Game.",
  },
  {
    src: "/images/achievements/top-100.jpg",
    description: "Achieve a top 100 position in the Vocabulary Game.",
  },
  {
    src: "/images/achievements/correct-translations-1000.jpg",
    description: "Achieve 1,000 correct translations.",
  },
  {
    src: "/images/achievements/correct-translations-500.jpg",
    description: "Achieve 500 correct translations.",
  },
  {
    src: "/images/achievements/correct-translations-250.jpg",
    description: "Achieve 250 correct translations.",
  },
  {
    src: "/images/achievements/correct-translations-100.jpg",
    description: "Achieve 100 correct translations.",
  },
  {
    src: "/images/achievements/correct-translations-25.jpg",
    description: "Achieve 25 correct translations.",
  },
  {
    src: "/images/achievements/correct-translations-1.jpg",
    description: "Achieve your first correct translation.",
  },
  {
    src: "/images/achievements/first-time-body-parts.jpg",
    description: "Complete the Body Parts Vocabulary Game for the first time.",
  },
  {
    src: "/images/achievements/first-time-colors.jpg",
    description: "Complete the Colors Vocabulary Game for the first time.",
  },
  {
    src: "/images/achievements/first-time-numbers.jpg",
    description: "Complete the Numbers Vocabulary Game for the first time.",
  },
  {
    src: "/images/achievements/first-time-animals.jpg",
    description: "Complete the Animals Vocabulary Game for the first time.",
  },
];

const AchievementGallery = ({ onAchievementClick }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-2 py-4">
        <div className="flex items-center justify-center">
          <h6 className="h6-bold">Achievements</h6>
          <FaAward className="ml-1 text-xl" />
        </div>
        <div className="flex h-[500px] w-full justify-center overflow-scroll">
          <div className="flex w-full flex-wrap justify-evenly gap-4 laptop-sm:w-3/4">
            {achievementsData.map((achievement, idx) => (
              <Image
                key={idx}
                src={achievement.src}
                alt="Achievement"
                width={500}
                height={500}
                className="size-36 cursor-pointer rounded-xl"
                quality={100}
                onClick={() =>
                  onAchievementClick(achievement.src, achievement.description)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementGallery;
