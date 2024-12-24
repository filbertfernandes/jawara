"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoBody, IoColorPalette } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const awardsData = [
  {
    src: "/images/awards/curriculum-completion.jpg",
    description:
      "Complete the entire curriculum to master key language concepts.",
  },
  {
    src: "/images/awards/top-3.jpg",
    description: "Achieve a top 3 position in the Vocabulary Game.",
  },
  {
    src: "/images/awards/top-10.jpg",
    description: "Achieve a top 10 position in the Vocabulary Game.",
  },
  {
    src: "/images/awards/top-50.jpg",
    description: "Achieve a top 50 position in the Vocabulary Game.",
  },
  {
    src: "/images/awards/top-100.jpg",
    description: "Achieve a top 100 position in the Vocabulary Game.",
  },
  {
    src: "/images/awards/correct-translations-1000.jpg",
    description: "Achieve 1,000 correct translations.",
  },
  {
    src: "/images/awards/correct-translations-500.jpg",
    description: "Achieve 500 correct translations.",
  },
  {
    src: "/images/awards/correct-translations-250.jpg",
    description: "Achieve 250 correct translations.",
  },
  {
    src: "/images/awards/correct-translations-100.jpg",
    description: "Achieve 100 correct translations.",
  },
  {
    src: "/images/awards/correct-translations-25.jpg",
    description: "Achieve 25 correct translations.",
  },
  {
    src: "/images/awards/correct-translations-1.jpg",
    description: "Achieve your first correct translation.",
  },
  {
    src: "/images/awards/first-time-body-parts.jpg",
    description: "Complete the Body Parts Vocabulary Game for the first time.",
  },
  {
    src: "/images/awards/first-time-colors.jpg",
    description: "Complete the Colors Vocabulary Game for the first time.",
  },
  {
    src: "/images/awards/first-time-numbers.jpg",
    description: "Complete the Numbers Vocabulary Game for the first time.",
  },
  {
    src: "/images/awards/first-time-animals.jpg",
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

const AwardOverlay = ({ image, description, onClose }) => (
  <div className="fullscreen-black-transparent flex-col items-center justify-center gap-4">
    <div className="relative flex flex-col items-center">
      <button
        className="absolute -right-8 -top-8 rounded-full p-1 text-3xl text-white sm:text-4xl"
        onClick={onClose}
      >
        <IoMdClose />
      </button>
      <Image
        src={image}
        alt="Selected Award"
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

const AwardGallery = ({ awards, onAwardClick }) => (
  <div className="flex max-h-96 min-h-96 flex-wrap justify-center overflow-scroll rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 lg:max-h-[500px] lg:min-h-[500px] lg:px-6 lg:py-8">
    <div className="mb-3 flex lg:mb-6">
      <h2 className="h2-bold w-full text-center">Awards</h2>
      <FaAward className="ml-2 text-3xl lg:text-5xl" />
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      {awards.map((award, idx) => (
        <Image
          key={idx}
          src={award.src}
          alt="Award"
          width={500}
          height={500}
          className="size-[125px] cursor-pointer rounded-xl lg:size-[200px]"
          quality={100}
          onClick={() => onAwardClick(award.src, award.description)}
        />
      ))}
    </div>
  </div>
);

const ScoreTable = ({ scores }) => (
  <div className="mb-8 flex h-auto w-full flex-col items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4 text-center lg:px-10 lg:py-8">
    <div className="mb-3 flex lg:mb-6">
      <h2 className="h2-bold w-full text-center">Vocabulary Scores</h2>
      <TbVocabulary className="ml-2 text-3xl lg:text-5xl" />
    </div>
    {Object.entries(scores).map(([game, scoreCategories], idx) => (
      <div
        key={idx}
        className="mb-4 flex w-full flex-wrap items-center border-b-2 border-white pb-4"
      >
        <h3 className="h5-bold">{scoresData[idx].category}</h3>
        <div className="ml-1 text-2xl lg:text-4xl">{scoresData[idx].icon}</div>
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

export default function ProfileInterface({ profileUser, sessionUser }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDescription, setSelectedImageDescription] =
    useState(null);

  const handleAwardClick = (image, description) => {
    setSelectedImage(image);
    setSelectedImageDescription(description);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedImage(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);

      toast({
        title: "Sign-out Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occured during sign-out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fullscreen-orange-100 flex-wrap gap-6 overflow-scroll font-questrial font-bold text-white">
      <Link href="/">
        <div className="absolute left-4 top-4 cursor-pointer text-4xl text-black sm:text-5xl">
          <IoMdClose />
        </div>
      </Link>

      <div className="flex w-full justify-center">
        <Avatar className="size-32 font-sans">
          {profileUser.data.image ? (
            <Image
              src={profileUser.data.image}
              alt={profileUser.data.username}
              width={200}
              height={200}
              quality={100}
            />
          ) : (
            <AvatarFallback className="border-4 border-orange-500 bg-white text-7xl font-bold tracking-wider text-orange-500">
              FF
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="flex h-auto w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 text-center lg:px-6 lg:py-8">
        <h2 className="h2-bold">{profileUser.data.name}</h2>
      </div>

      {showOverlay && (
        <AwardOverlay
          image={selectedImage}
          description={selectedImageDescription}
          onClose={handleCloseOverlay}
        />
      )}

      <AwardGallery awards={awardsData} onAwardClick={handleAwardClick} />

      <div className="flex h-auto w-full flex-col items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-2 py-4 text-center lg:px-6 lg:py-8">
        <h1 className="text-8xl">
          {profileUser.data.totalCorrectTranslations}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl">
          Total Correct Translations
        </p>
      </div>
      {console.log(profileUser.data.scores)}
      <ScoreTable scores={profileUser.data.scores} />

      {sessionUser && profileUser.data._id === sessionUser.user.id && (
        <div className="-my-8 mb-8 flex h-auto w-full items-center justify-end">
          <div
            className="flex w-32 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-2 text-center text-base sm:text-lg lg:text-xl"
            onClick={handleSignOut}
          >
            <h5>Sign Out</h5>
            <FaSignOutAlt className="ml-2" />
          </div>
        </div>
      )}
    </div>
  );
}
