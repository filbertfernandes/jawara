import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaAward } from "react-icons/fa";

import { achievementsData } from "./stores/achievementsData";

const AchievementGallery = ({ onAchievementClick }) => {
  const t = useTranslations("Profile");

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 bg-white/10 px-2 py-6">
      <div className="flex items-center justify-center">
        <h6 className="h6-bold">{t("achievements")}</h6>
        <FaAward className="ml-1 text-xl" />
      </div>
      <div className="flex h-[500px] w-full justify-center overflow-scroll">
        <div className="flex w-full flex-wrap justify-evenly gap-4 laptop-sm:w-3/4">
          {achievementsData.map((achievement, idx) => (
            <div
              key={idx}
              className="group relative size-36 cursor-pointer overflow-hidden rounded-xl"
              onClick={() =>
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
                className="size-full object-cover"
                quality={100}
              />

              {/* Overlay with Description */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-2 text-center text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {achievement[`description_${t("language")}`]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;
