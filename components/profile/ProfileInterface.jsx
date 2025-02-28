import multiavatar from "@multiavatar/multiavatar/esm";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowDown, FaAward } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { GoNumber } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoBody, IoColorPalette } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";

import routes from "@/constants/routes";

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

const AchievementOverlay = ({ image, description, onClose }) => (
  <div className="fullscreen-black-transparent z-20 flex-col items-center justify-center gap-4 font-questrial text-white">
    <div className="relative flex flex-col items-center">
      <button
        className="absolute -right-8 -top-8 rounded-full p-1 text-3xl sm:text-4xl"
        onClick={onClose}
      >
        <IoMdClose />
      </button>
      <Image
        src={image}
        alt="Selected Achievement"
        width={500}
        height={500}
        className="size-[300px] rounded-xl lg:size-[400px]"
      />
    </div>
    <p className="w-3/4 text-center text-base sm:text-lg lg:text-xl">
      {description}
    </p>
  </div>
);

const AchievementGallery = ({ achievements, onAchievementClick }) => (
  <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-2 py-4">
    <div className="flex items-center justify-center">
      <h6 className="h6-bold">Achievements</h6>
      <FaAward className="ml-1 text-xl" />
    </div>
    <div className="flex h-[500px] w-full justify-center overflow-scroll">
      <div className="flex w-full flex-wrap justify-evenly gap-4 laptop-sm:w-3/4">
        {achievements.map((achievement, idx) => (
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
);

const ScoreTable = ({ scores }) => (
  <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-6 py-4">
    <div className="flex items-center justify-center">
      <h6 className="h6-bold">Vocabulary Scores</h6>
      <TbVocabulary className="ml-1 text-xl" />
    </div>
    {Object.entries(scores).map(([game, scoreCategories], idx) => (
      <div key={idx} className="flex w-full flex-wrap items-center pb-2">
        <h3 className="h6-bold">{scoresData[idx].category}</h3>
        <div className="ml-1 text-xl lg:text-3xl">{scoresData[idx].icon}</div>
        {/* Display the game name (game1, game2, etc.) */}
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

const ProfileInterface = ({ profileUser }) => {
  console.log("[DEBUG] ProfileInterface profileUser", profileUser);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDescription, setSelectedImageDescription] =
    useState(null);

  const handleAchievementClick = (image, description) => {
    setSelectedImage(image);
    setSelectedImageDescription(description);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedImage(null);
  };

  return (
    <>
      {showOverlay && (
        <AchievementOverlay
          image={selectedImage}
          description={selectedImageDescription}
          onClose={handleCloseOverlay}
        />
      )}
      <div className="fixed inset-0 z-10 overflow-auto font-questrial laptop-sm:flex laptop-sm:flex-wrap">
        <Link href={routes.HOME}>
          <div className="fixed left-4 top-4 cursor-pointer text-3xl text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-600 sm:text-4xl">
            <GiExitDoor />
          </div>
        </Link>
        <div className="flex size-full items-end justify-center bg-transparent pb-4 laptop-sm:w-1/2">
          <div className="fixed flex w-full animate-bounce flex-col items-center justify-center font-bold text-black laptop-sm:hidden">
            Scroll
            <FaArrowDown />
          </div>
        </div>
        <div className="flex h-auto min-h-screen w-full flex-col items-center gap-10 bg-black/75 px-6 py-10 text-white backdrop-blur-md md:px-10 laptop-sm:w-1/2">
          <div className="flex w-full flex-col items-center gap-1">
            <div
              className="size-32"
              dangerouslySetInnerHTML={{
                __html: multiavatar(profileUser?._id + profileUser?.name),
              }}
            />
            <h5 className="h5-bold">@{profileUser?.username}</h5>
            {/* <div className="mt-2 flex w-full justify-evenly">
              <div>2000 Followers</div>
              <div>2000 Following</div>
            </div> */}
          </div>

          <AchievementGallery
            achievements={achievementsData}
            onAchievementClick={handleAchievementClick}
          />

          <div className="flex w-full flex-col items-center gap-1 rounded-xl border-2 bg-white/10 px-2 py-4">
            <h1 className="h1-bold">{profileUser?.totalCorrectTranslations}</h1>
            <div className="flex items-center justify-center">
              <h6 className="h6-bold">Total Correct Translations</h6>
            </div>
          </div>

          <ScoreTable scores={profileUser?.scores} />
        </div>
      </div>
    </>
  );
};

export default ProfileInterface;
