import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";

import { achievementsData } from "./stores/achievementsData";

import { getAllAchievementsByUserId } from "@/lib/actions/userAchievement.action";

const AchievementGallery = ({ onAchievementClick, userId }) => {
  const t = useTranslations("Profile");
  const [userAchievements, setUserAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!userId) return;
      const response = await getAllAchievementsByUserId(userId);
      if (response.success) {
        setUserAchievements(response.data);
      }
    };

    fetchAchievements();
  }, [userId]);

  // Sort achievements: unlocked first, then locked
  const sortedAchievements = [...achievementsData].sort((a, b) => {
    const aUnlocked = userAchievements.includes(a.id);
    const bUnlocked = userAchievements.includes(b.id);
    return bUnlocked - aUnlocked; // Unlocked first
  });

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-2 py-6">
      <div className="flex items-center justify-center">
        <h6 className="h6-bold">{t("achievements")}</h6>
        <FaAward className="ml-1 text-xl" />
      </div>
      <div className="flex h-[500px] w-full justify-center overflow-scroll">
        <div className="flex w-full flex-wrap justify-evenly gap-4 laptop-sm:w-3/4">
          {sortedAchievements.map((achievement, idx) => {
            const isUnlocked = userAchievements.includes(achievement.id);

            return (
              <div
                key={idx}
                className={`group relative size-36 overflow-hidden rounded-xl ${
                  isUnlocked ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() =>
                  isUnlocked &&
                  onAchievementClick(
                    achievement.src,
                    achievement[`description_${t("language")}`]
                  )
                }
              >
                {/* Achievement Image */}
                <Image
                  src={achievement.src}
                  alt="Achievement"
                  width={500}
                  height={500}
                  className={`size-full object-cover transition-all ${
                    isUnlocked ? "grayscale-0" : "grayscale"
                  }`}
                  quality={100}
                />

                {/* Overlay with Description (Always Visible on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-2 text-center text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {achievement[`description_${t("language")}`]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;
