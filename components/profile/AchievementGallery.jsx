import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaAward } from "react-icons/fa";

const achievementsData = [
  {
    src: "/images/achievements/curriculum-completion.jpg",
    description_english:
      "Master the language by completing the entire curriculum.",
    description_indonesian:
      "Kuasai bahasa dengan menyelesaikan seluruh kurikulum.",
  },
  {
    src: "/images/achievements/top-3.jpg",
    description_english: "Achieve a top 3 position in the Vocabulary Game.",
    description_indonesian:
      "Capai peringkat 3 besar dalam Permainan Kosa Kata.",
  },
  {
    src: "/images/achievements/top-10.jpg",
    description_english: "Achieve a top 10 position in the Vocabulary Game.",
    description_indonesian:
      "Capai peringkat 10 besar dalam Permainan Kosa Kata.",
  },
  {
    src: "/images/achievements/top-50.jpg",
    description_english: "Achieve a top 50 position in the Vocabulary Game.",
    description_indonesian:
      "Capai peringkat 50 besar dalam Permainan Kosa Kata.",
  },
  {
    src: "/images/achievements/top-100.jpg",
    description_english: "Achieve a top 100 position in the Vocabulary Game.",
    description_indonesian:
      "Capai peringkat 100 besar dalam Permainan Kosa Kata.",
  },
  {
    src: "/images/achievements/correct-translations-1000.jpg",
    description_english: "Achieve 1,000 correct translations.",
    description_indonesian: "Capai 1.000 terjemahan yang benar.",
  },
  {
    src: "/images/achievements/correct-translations-500.jpg",
    description_english: "Achieve 500 correct translations.",
    description_indonesian: "Capai 500 terjemahan yang benar.",
  },
  {
    src: "/images/achievements/correct-translations-250.jpg",
    description_english: "Achieve 250 correct translations.",
    description_indonesian: "Capai 250 terjemahan yang benar.",
  },
  {
    src: "/images/achievements/correct-translations-100.jpg",
    description_english: "Achieve 100 correct translations.",
    description_indonesian: "Capai 100 terjemahan yang benar.",
  },
  {
    src: "/images/achievements/correct-translations-25.jpg",
    description_english: "Achieve 25 correct translations.",
    description_indonesian: "Capai 25 terjemahan yang benar.",
  },
  {
    src: "/images/achievements/correct-translations-1.jpg",
    description_english: "Achieve your first correct translation.",
    description_indonesian: "Capai terjemahan benar pertamamu.",
  },
  {
    src: "/images/achievements/first-time-body-parts.jpg",
    description_english:
      "Complete the Body Parts Vocabulary Game for the first time.",
    description_indonesian:
      "Selesaikan Permainan Kosa Kata Bagian Tubuh untuk pertama kalinya.",
  },
  {
    src: "/images/achievements/first-time-colors.jpg",
    description_english:
      "Complete the Colors Vocabulary Game for the first time.",
    description_indonesian:
      "Selesaikan Permainan Kosa Kata Warna untuk pertama kalinya.",
  },
  {
    src: "/images/achievements/first-time-numbers.jpg",
    description_english:
      "Complete the Numbers Vocabulary Game for the first time.",
    description_indonesian:
      "Selesaikan Permainan Kosa Kata Angka untuk pertama kalinya.",
  },
  {
    src: "/images/achievements/first-time-animals.jpg",
    description_english:
      "Complete the Animals Vocabulary Game for the first time.",
    description_indonesian:
      "Selesaikan Permainan Kosa Kata Hewan untuk pertama kalinya.",
  },
];

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
