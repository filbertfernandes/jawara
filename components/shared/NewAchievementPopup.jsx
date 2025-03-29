import Image from "next/image";
import { useEffect, useState } from "react";

import { achievementsData } from "../profile/stores/achievementsData";

import { useGame } from "@/hooks/useGame";

export default function NewAchievementPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { achievementsPopup, setAchievementsPopup } = useGame((state) => ({
    achievementsPopup: state.achievementsPopup,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  useEffect(() => {
    if (achievementsPopup.length > 0) {
      setIsVisible(true);
      let index = 0;

      const showNextAchievement = () => {
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);

          setTimeout(() => {
            index++;
            if (index < achievementsPopup.length) {
              setCurrentIndex(index);
              showNextAchievement();
            } else {
              setCurrentIndex(0);
              setAchievementsPopup([]);
            }
          }, 300);
        }, 3000);
      };

      showNextAchievement();
    }
  }, [achievementsPopup, setAchievementsPopup]);

  if (achievementsPopup.length === 0) return null;

  const achievement = achievementsData.find(
    (a) => a.id === achievementsPopup[currentIndex]
  );

  if (!achievement) return null;

  return (
    <div className="fixed left-1/2 top-10 z-50 w-80 -translate-x-1/2">
      <div
        className={`flex items-center rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 ${
          isVisible ? "animate-slideDown" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #fcd34d, #f59e0b)",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src={achievement.src}
          alt="Achievement Badge"
          width={64}
          height={64}
          className="rounded-xl border-2 border-white shadow-lg"
        />
        <div className="ml-4 flex flex-col">
          <p className="text-sm font-bold text-gray-900">
            Achievement Unlocked!
          </p>
          <p className="text-xs text-gray-900">
            {achievement.description_english}
          </p>
        </div>
      </div>
    </div>
  );
}
