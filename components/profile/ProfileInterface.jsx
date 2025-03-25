import multiavatar from "@multiavatar/multiavatar/esm";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaArrowDown, FaUserPlus, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import AchievementGallery from "./AchievementGallery";
import ScoreTable from "./ScoreTable";
import TotalCorrectTranslation from "./TotalCorrectTranslation";
import BackButton from "../home/shared/interfaces/BackButton";

import routes from "@/constants/routes";

const AchievementOverlay = ({ image, description, onClose }) => (
  <div className="fixed left-0 top-0 z-20 flex size-full flex-col items-center justify-center gap-4 bg-black/80 p-4 font-questrial text-white sm:p-14 lg:px-32 xl:px-64">
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

const ProfileInterface = ({ profileUser }) => {
  const { data: session } = useSession();

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
          <div className="fixed left-4 top-4">
            <BackButton />
          </div>
        </Link>
        <div className="flex size-full items-end justify-center bg-transparent pb-4 laptop-sm:w-1/2">
          <div className="fixed flex w-full animate-bounce flex-col items-center justify-center font-bold text-gray-900 laptop-sm:hidden">
            Scroll
            <FaArrowDown />
          </div>
        </div>
        <div className="flex h-auto min-h-screen w-full flex-col items-center gap-10 bg-black/75 px-6 py-10 text-white backdrop-blur-md md:px-10 laptop-sm:w-1/2">
          <div className="flex h-auto min-h-40 w-full items-center justify-center gap-4">
            <div
              className="flex size-36"
              dangerouslySetInnerHTML={{
                __html: multiavatar(profileUser?._id),
              }}
            />
            <div className="flex w-full flex-col gap-6 lg:gap-10">
              <div>
                <h5 className="h5-bold">{profileUser?.name}</h5>
                <h5>@{profileUser?.username}</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="btn-template w-4/5 bg-gray-500 hover:bg-gray-600 lg:w-2/5">
                  <p>1000 Friends</p>
                  <FaUsers className="ml-2 text-xl" />
                </div>
                {session?.user?.id !== profileUser?._id && (
                  <div className="btn-template w-4/5 bg-orange-500 hover:bg-orange-600 lg:w-2/5">
                    <p>Add Friend</p>
                    <FaUserPlus className="ml-2 text-xl" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <AchievementGallery onAchievementClick={handleAchievementClick} />

          <TotalCorrectTranslation
            total={profileUser?.totalCorrectTranslations}
          />

          <ScoreTable scores={profileUser?.scores} />
        </div>
      </div>
    </>
  );
};

export default ProfileInterface;
