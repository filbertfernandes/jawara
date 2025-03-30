import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";

import ControlButton from "./ControlButton";

import { phases, useGame } from "@/hooks/useGame";

const howToPlaySteps = {
  [phases.FIRST_GAME]: [
    {
      icon: "1️⃣",
      english_title: "Explore the 3D Model",
      indonesian_title: "Jelajahi Model 3D",
      english_description:
        "A 3D human body will appear on your screen. You can rotate the camera to view it from different angles.",
      indonesian_description:
        "Model tubuh manusia 3D akan muncul di layar. Anda bisa memutar kamera untuk melihatnya dari berbagai sudut.",
    },
    {
      icon: "2️⃣",
      english_title: "Find the Input Box",
      indonesian_title: "Temukan Kotak Input",
      english_description:
        "Some body parts have an input box attached to them.",
      indonesian_description:
        "Beberapa bagian tubuh memiliki kotak input yang terpasang padanya.",
    },
    {
      icon: "3️⃣",
      english_title: "Type the Javanese Word",
      indonesian_title: "Ketik Kata dalam Bahasa Jawa",
      english_description:
        "Click on the input box and type the correct Javanese word for that body part. Example: If the input box is near the eye, type 'moto' (Javanese for 'eye').",
      indonesian_description:
        "Klik pada kotak input dan ketik kata dalam Bahasa Jawa yang benar untuk bagian tubuh tersebut. Contoh: Jika kotak input berada di dekat mata, ketik 'moto' (Bahasa Jawa untuk 'mata').",
    },
    {
      icon: "4️⃣ ✅",
      english_title: "Instant Feedback",
      indonesian_title: "Umpan Balik Instan",
      english_description:
        "If your answer is correct, the input box will turn green automatically!",
      indonesian_description:
        "Jika jawabanmu benar, kotak input akan berubah menjadi hijau secara otomatis!",
    },
    {
      icon: "5️⃣ ⏳",
      english_title: "Finish as Fast as Possible",
      indonesian_title: "Selesaikan Secepat Mungkin",
      english_description:
        "The goal is to complete all body parts as quickly as You can. The faster You finish, the better your score!",
      indonesian_description:
        "Tujuannya adalah menyelesaikan semua bagian tubuh secepat mungkin. Semakin cepat Anda selesai, semakin tinggi skormu!",
    },
  ],
  [phases.SECOND_GAME]: [
    {
      icon: "1️⃣",
      english_title: "Control the Ball",
      indonesian_title: "Kendalikan Bola",
      english_description:
        "Use the left and right controls to move the ball across the screen. Push the ball to hit the colored boxes.",
      indonesian_description:
        "Gunakan kontrol kiri dan kanan untuk menggerakkan bola di layar. Dorong bola untuk mengenai kotak berwarna.",
    },
    {
      icon: "2️⃣",
      english_title: "Identify the Javanese Word",
      indonesian_title: "Kenali Kata dalam Bahasa Jawa",
      english_description:
        "At the top of the screen, You will see a word in Javanese (e.g., 'Abang'). This word corresponds to a color.",
      indonesian_description:
        "Di bagian atas layar, Anda akan melihat kata dalam Bahasa Jawa (misalnya, 'Abang'). Kata ini mewakili suatu warna.",
    },
    {
      icon: "3️⃣",
      english_title: "Find the Correct Box",
      indonesian_title: "Temukan Kotak yang Benar",
      english_description:
        "Look for the colored box that matches the word in Javanese. For example, if the word is 'Abang,' You need to find and hit the red box.",
      indonesian_description:
        "Cari kotak berwarna yang sesuai dengan kata dalam Bahasa Jawa. Misalnya, jika kata yang muncul adalah 'Abang', cari dan pukul kotak merah.",
    },
    {
      icon: "4️⃣",
      english_title: "Push the Ball",
      indonesian_title: "Dorong Bola",
      english_description:
        "Use your controls to push the ball toward the correct colored box.",
      indonesian_description:
        "Gunakan kontrolmu untuk mendorong bola ke arah kotak berwarna yang benar.",
    },
    {
      icon: "5️⃣ ✅",
      english_title: "Score Points",
      indonesian_title: "Dapatkan Skor",
      english_description:
        "Every time the ball hits the correct colored box, your score will increase!",
      indonesian_description:
        "Setiap kali bola mengenai kotak berwarna yang benar, skormu akan bertambah!",
    },
    {
      icon: "6️⃣ ⏳",
      english_title: "Beat the Timer",
      indonesian_title: "Kalahkan Waktu",
      english_description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
      indonesian_description:
        "Coba dapatkan sebanyak mungkin poin sebelum waktu habis (100 detik).",
    },
  ],
  [phases.THIRD_GAME]: [
    {
      icon: "1️⃣",
      english_title: "Control the Ball",
      indonesian_title: "Kendalikan Bola",
      english_description:
        "You can move the ball in all directions and jump to navigate the field.",
      indonesian_description:
        "Anda bisa menggerakkan bola ke segala arah dan melompat untuk menjelajahi lapangan.",
    },
    {
      icon: "2️⃣",
      english_title: "Find the Correct Number",
      indonesian_title: "Temukan Angka yang Benar",
      english_description:
        'At the top of the screen, a Javanese number will be displayed. Example: If it shows "Siji" (which means "1"), you need to find the square with "1" written on it.',
      indonesian_description:
        'Di bagian atas layar, sebuah angka dalam bahasa Jawa akan ditampilkan. Contoh: Jika tertulis "Siji" (berarti "1"), Anda harus menemukan kotak dengan angka "1" di atasnya.',
    },
    {
      icon: "3️⃣",
      english_title: "Move to the Correct Square",
      indonesian_title: "Jalan ke Kotak yang Benar",
      english_description:
        "Guide the ball to touch the square that contains the correct number.",
      indonesian_description:
        "Arahkan bola untuk menyentuh kotak yang berisi angka yang benar.",
    },
    {
      icon: "4️⃣ ✅",
      english_title: "Score Points",
      indonesian_title: "Kumpulkan Poin",
      english_description:
        "Each correct number you reach will increase your score. If you go to the wrong number, your score will decrease.",
      indonesian_description:
        "Setiap angka yang benar akan menambah skor Anda. Jika salah, skormu akan berkurang.",
    },
    {
      icon: "6️5️⃣ ⏳",
      english_title: "Beat the Timer",
      indonesian_title: "Kalahkan Waktu",
      english_description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
      indonesian_description:
        "Cobalah mendapatkan sebanyak mungkin poin sebelum waktu habis (100 detik).",
    },
  ],
  [phases.FOURTH_GAME]: [
    {
      icon: "1️⃣",
      english_title: "Control Your Character",
      indonesian_title: "Kendalikan Karaktermu",
      english_description:
        "Move your character around the area to explore different animals.",
      indonesian_description:
        "Gerakkan karaktermu di sekitar area untuk menjelajahi berbagai hewan.",
    },
    {
      icon: "2️⃣",
      english_title: "Find the Correct Animal",
      indonesian_title: "Temukan Hewan yang Benar",
      english_description:
        'At the top of the screen, a Javanese word will be displayed. Example: If it shows "Pitik" (which means "chicken"), you need to find a chicken in the area.',
      indonesian_description:
        'Di bagian atas layar, sebuah kata dalam bahasa Jawa akan ditampilkan. Contoh: Jika tertulis "Pitik" (berarti "ayam"), Anda harus menemukan ayam di area tersebut.',
    },
    {
      icon: "3️⃣",
      english_title: "Walk Closer to the Animal",
      indonesian_title: "Dekati Hewan",
      english_description:
        "Move your character closer to the animal you think is correct.",
      indonesian_description:
        "Gerakkan karaktermu lebih dekat ke hewan yang menurutmu benar.",
    },
    {
      icon: "4️⃣ 🎯",
      english_title: "Select the Animal",
      indonesian_title: "Pilih Hewan",
      english_description:
        'Press the "Select" button when near the animal to choose it.',
      indonesian_description:
        'Tekan tombol "Pilih" saat berada dekat dengan hewan untuk memilihnya.',
    },
    {
      icon: "5️⃣ ✅",
      english_title: "Score Points",
      indonesian_title: "Kumpulkan Poin",
      english_description:
        "If you selected the correct animal, your score will increase. If wrong, your score will decrease.",
      indonesian_description:
        "Jika Anda memilih hewan yang benar, skormu akan bertambah. Jika salah, skormu akan berkurang.",
    },
    {
      icon: "6️⃣ ⏳",
      english_title: "Beat the Timer",
      indonesian_title: "Kalahkan Waktu",
      english_description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
      indonesian_description:
        "Cobalah mendapatkan sebanyak mungkin poin sebelum waktu habis (100 detik).",
    },
  ],
};

const controls = {
  [phases.FIRST_GAME]: [
    {
      english_title: "Rotate Camera",
      indonesian_title: "Putar Kamera",
      buttons: [LuMousePointerClick, GiClick],
    },
  ],
  [phases.SECOND_GAME]: [
    {
      english_title: "Move Left",
      indonesian_title: "Gerak ke Kiri",
      buttons: ["A", FaArrowLeft],
    },
    {
      english_title: "Move Right",
      indonesian_title: "Gerak ke Kanan",
      buttons: ["D", FaArrowRight],
    },
    {
      english_title: "Push the Ball",
      indonesian_title: "Dorong Bola",
      buttons: ["W", FaArrowUp],
    },
    {
      english_title: "Jump",
      indonesian_title: "Lompat",
      buttons: ["Space"],
      className: "w-36 lg:w-60",
    },
  ],
  [phases.THIRD_GAME]: [
    {
      english_title: "Move Left",
      indonesian_title: "Gerak ke Kiri",
      buttons: ["A", FaArrowLeft],
    },
    {
      english_title: "Move Right",
      indonesian_title: "Gerak ke Kanan",
      buttons: ["D", FaArrowRight],
    },
    {
      english_title: "Move Forward",
      indonesian_title: "Gerak ke Depan",
      buttons: ["W", FaArrowUp],
    },
    {
      english_title: "Move Backward",
      indonesian_title: "Gerak ke Belakang",
      buttons: ["S", FaArrowDown],
    },
    {
      english_title: "Jump",
      indonesian_title: "Lompat",
      buttons: ["Space"],
      className: "w-36 lg:w-60",
    },
  ],
  [phases.FOURTH_GAME]: [
    {
      english_title: "Move Left",
      indonesian_title: "Gerak ke Kiri",
      buttons: ["A", FaArrowLeft],
    },
    {
      english_title: "Move Right",
      indonesian_title: "Gerak ke Kanan",
      buttons: ["D", FaArrowRight],
    },
    {
      english_title: "Move Forward",
      indonesian_title: "Gerak ke Depan",
      buttons: ["W", FaArrowUp],
    },
    {
      english_title: "Move Backward",
      indonesian_title: "Gerak ke Belakang",
      buttons: ["S", FaArrowDown],
    },
    {
      english_title: "Jump",
      indonesian_title: "Lompat",
      buttons: ["Space"],
      className: "w-36 lg:w-60",
    },
    {
      english_title: "Select Animal",
      indonesian_title: "Pilih Hewan",
      buttons: ["Enter"],
      className: "w-36 lg:w-60",
    },
  ],
};

const GameTutorialInterface = () => {
  const t = useTranslations("Home");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));

  return (
    <div
      className={`mt-8 flex size-full flex-col items-center overflow-scroll ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-gray-100 drop-shadow-lg">{t("controls")}</h1>
      <div className="flex w-full justify-center px-4">
        <div className="mb-10 mt-2 flex flex-wrap items-center justify-center gap-4 lg:w-3/4 lg:gap-8">
          {controls[phase].map((control, index) => (
            <div key={index} className="h3-bold text-center text-gray-100">
              {control[`${t("language")}_title`]}
              <div className="flex items-center justify-center gap-1">
                {control.buttons.map((Button, buttonIndex) => (
                  <div key={buttonIndex} className="flex items-center gap-1">
                    <ControlButton
                      className={`${
                        control.className ? control.className : ""
                      }`}
                    >
                      {typeof Button === "string" ? (
                        Button // If it's a string, just render it as text
                      ) : (
                        <Button /> // If it's a React component, render the icon
                      )}
                    </ControlButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="h1-bold text-gray-100 drop-shadow-lg">
        {t("how_to_play")}
      </h1>
      <div className="mb-10 mt-2 w-[90%] space-y-4 rounded-xl text-justify font-questrial text-gray-100 lg:w-3/4 lg:text-xl">
        {howToPlaySteps[phase].map((step, index) => (
          <p key={index}>
            {step.icon} <strong>{step[`${t("language")}_title`]}:</strong>{" "}
            {step[`${t("language")}_description`]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GameTutorialInterface;
