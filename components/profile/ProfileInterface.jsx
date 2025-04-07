import multiavatar from "@multiavatar/multiavatar/esm";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import AchievementGallery from "./AchievementGallery";
import ScoreTable from "./ScoreTable";
import TotalCorrectTranslation from "./TotalCorrectTranslation";
import UserProfile from "./UserProfile";
import BackButton from "../home/shared/interfaces/BackButton";

import routes from "@/constants/routes";

const AchievementOverlay = ({ image, description, onClose }) => (
  <div className="fixed left-0 top-0 z-20 flex size-full flex-col items-center justify-center gap-4 bg-black/70 p-4 font-questrial text-gray-100 sm:p-14 lg:px-32 xl:px-64">
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

const FriendsOverlay = ({ friends, onClose, t }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 font-questrial">
    <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl md:p-10">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
      >
        <IoMdClose />
      </button>

      {/* Title */}
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
        {t("friends")}
      </h2>

      {/* Friends List */}
      <div className="max-h-[60vh] space-y-4 overflow-y-auto">
        {friends?.length === 0 ? (
          <p className="text-center text-gray-600">{t("no_friends")}</p>
        ) : (
          friends.map((friend) => {
            const avatarSvg = multiavatar(
              friend._id + friend.profileAvatarIndex
            );
            return (
              <Link
                key={friend._id}
                href={`/profile/${friend._id}`}
                className="block overflow-hidden transition-transform"
              >
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100">
                  <div
                    className="size-14 shrink-0 overflow-hidden rounded-full bg-white"
                    dangerouslySetInnerHTML={{ __html: avatarSvg }}
                  />

                  <div>
                    <p className="font-bold text-gray-900">{friend.name}</p>
                    <p className="text-sm text-gray-600">@{friend.username}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  </div>
);

const ProfileInterface = ({ profileUser }) => {
  const t = useTranslations("Profile");

  const [showFriendsOverlay, setShowFriendsOverlay] = useState(false);
  const [showAchievementOverlay, setShowAchievementOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDescription, setSelectedImageDescription] =
    useState(null);

  const handleFriendsClick = () => {
    setShowFriendsOverlay(true);
  };

  const handleAchievementClick = (image, description) => {
    setSelectedImage(image);
    setSelectedImageDescription(description);
    setShowAchievementOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowFriendsOverlay(false);
    setShowAchievementOverlay(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        handleCloseOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showFriendsOverlay && (
        <FriendsOverlay
          friends={profileUser.friends}
          onClose={handleCloseOverlay}
          t={t}
        />
      )}

      {showAchievementOverlay && (
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
            {t("scroll")}
            <FaArrowDown />
          </div>
        </div>
        <div className="flex h-auto min-h-screen w-full flex-col items-center gap-10 bg-black/70 px-6 py-10 text-gray-100 backdrop-blur-md md:px-10 laptop-sm:w-1/2">
          <UserProfile
            profileUser={profileUser}
            onFriendsClick={handleFriendsClick}
          />

          <AchievementGallery
            onAchievementClick={handleAchievementClick}
            userId={profileUser?._id}
          />

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
