import Image from "next/image"; // Image dari Next.js untuk menangani gambar
import Link from "next/link"; // navigasi antar halaman
import { useSession } from "next-auth/react"; // mengelola sesi pengguna
import { useTranslations } from "next-intl"; // menerjemahkan teks sesuai bahasa yang dipilih
import { useEffect, useRef, useState } from "react"; 
import { FaCheckCircle } from "react-icons/fa"; 
import { IoMdCloseCircle } from "react-icons/io"; 
import BackButton from "../../shared/interfaces/BackButton"; 
import LoadingSpinner from "@/components/ui/loadingSpinner"; 
import routes from "@/constants/routes"; 
import { phases, useGame } from "@/hooks/useGame"; // untuk mengelola fase permainan dan status game
import {
  getTranslationAttemptsLeft,
  updateTranslationAttemptsLeft,
} from "@/lib/actions/translation.action"; //fungsi untuk mendapatkan dan memperbarui sisa percakapan terjemahan.
import {
  getTotalCorrectTranslations,
  incrementCorrectTranslations,
} from "@/lib/actions/user.action"; // fungsi untuk mendapatkan dan memperbarui jumlah terjemahan yang benar.
import { getUnseenAchievements } from "@/lib/actions/userAchievement.action"; // fungsi untuk mendapatkan pencapaian yang belum dilihat
import { SoundManager } from "@/lib/SoundManager"; // suara untuk memainkan efek suara

// ini yg pilihannya itu bisa sudah dipilih bisa jawaban yg benar
const Button = ({ id, word, isSelected, isAnswer = false, onClick }) => (
  <div
    className={`flex h-8 cursor-pointer items-center justify-center rounded-xl border-2 p-1 text-center text-sm font-bold text-gray-600 sm:p-2 sm:text-2xl ${
      isSelected & !isAnswer
        ? "cursor-not-allowed bg-gray-600 text-gray-600"
        : "cursor-pointer bg-white transition-all duration-300 ease-in-out hover:bg-gray-200"
    }`}
    onClick={() => onClick(id, word, isSelected)}
  >
    {word}
  </div>
);

// ini gunanya untuk mengacak urutannya
const shuffleArray = (arr) => { // Fisher-Yates - Setiap elemen array memiliki peluang yang sama untuk berada di posisi manapun dalam array yang telah diacak
  for (let i = arr.length - 1; i > 0; i--) { // mengacak nya dari blakang yah
    const j = Math.floor(Math.random() * (i + 1)); // hasilin angka acak nya kan decimal makanya dikaliin sama integer, abis itu ambil yg floor
    [arr[i], arr[j]] = [arr[j], arr[i]]; // terus di swap
  }
  return arr;
};

export const TranslationInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [correctCount, setCorrectCount] = useState(null); // Menyimpan jumlah terjemahan yang benar
  const [attempsLeft, setAttemptsLeft] = useState(null); // Menyimpan sisa percakapan terjemahan yang dapat dilakukan
  const [isGeneratingSentence, setIsGeneratingSentence] = useState(false); // Menandakan apakah kalimat sedang dihasilkan
  const [sentence, setSentence] = useState(null); // Menyimpan kalimat yang dihasilkan
  const [words, setWords] = useState([]); // Menyimpan daftar kata yang akan dipilih
  const [wordsAnswer, setWordsAnswer] = useState([]); // Menyimpan daftar kata yang dipilih oleh pemain
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false); // Menandakan apakah jawaban sedang diperiksa
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // Menandakan apakah feedback harus ditampilkan
  const [isTrue, setIsTrue] = useState(false); // Menyimpan status apakah jawaban benar atau salah
  const [feedback, setFeedback] = useState(""); // Menyimpan umpan balik yang diberikan oleh AI
  const [explanation, setExplanation] = useState(""); // Menyimpan penjelasan dari AI

  // buat manipulasi Document Object Model ky div, p, button
  const sentenceBox = useRef(); 

  // perlu nih buat klo misalnya dapat achievements (badges)
  const { changePhase, setAchievementsPopup } = useGame((state) => ({
    changePhase: state.changePhase,
    setAchievementsPopup: state.setAchievementsPopup,
  }));

  // mengambil data sisa berapa bisa translate dan jumlah yg benernya berapa
  useEffect(() => {
    if (!userId) return;

    const fetchAttemptsLeft = async () => {
      try {
        const { attemptsLeft } = await getTranslationAttemptsLeft(userId);

        const { totalCorrectTranslations } = await getTotalCorrectTranslations(
          userId
        );

        setAttemptsLeft(attemptsLeft);
        setCorrectCount(totalCorrectTranslations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttemptsLeft();
  }, []);

  // ini untuk ambil kalimatnya dan di generate dari API
  const generateSentence = async () => {
    setIsGeneratingSentence(true);

    try {
      const { attemptsLeft } = await updateTranslationAttemptsLeft(userId);
      setAttemptsLeft(attemptsLeft);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/generate-sentence`,
        { method: "POST" }
      );

      const aiAnswer = await response.json();
      const sentenceObject = JSON.parse(aiAnswer.reply);

      if (sentenceBox.current) {
        sentenceBox.current.innerText = sentenceObject[t("language")];

        setSentence(sentenceObject);

        const tempWords = shuffleArray(
          sentenceObject.javanese.split(" ").map((word, index) => ({
            id: index,
            word,
            isSelected: false,
          }))
        );
        setWords(tempWords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingSentence(false);
      setIsFeedbackVisible(false);
      setWordsAnswer([]);
    }
  };

  // untuk cek apakah jawabannya user bener ga, terus kirim ke API untuk dieval, klo misal bener maka jumlah jawaban benar akan bertambah
  const checkAnswer = async () => {
    setIsCheckingAnswer(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/check-answer`,
        {
          method: "POST",
          body: JSON.stringify({
            language: t("language"),
            javanese: sentence.javanese,
            generatedSentence: sentence[t("language")],
            userAnswer: wordsAnswer.map((item) => item.word).join(" "),
          }),
        }
      );

      const aiAnswer = await response.json();
      const { isTrue, feedback, explanation } = JSON.parse(aiAnswer.reply);

      setIsTrue(isTrue);
      setFeedback(feedback);
      setExplanation(explanation);

      if (isTrue) {
        setCorrectCount(correctCount + 1);
        const { isGetAchievements } = await incrementCorrectTranslations(
          userId
        );

        if (isGetAchievements) {
          const { data } = await getUnseenAchievements(session.user.id);
          setAchievementsPopup(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCheckingAnswer(false);
      setIsFeedbackVisible(true);
    }
  };

  // menangani klik pada kata yang dipilih. Jika kata sudah dipilih, maka akan dihapus dari daftar jawaban. Jika belum dipilih, maka ya tetep tampilin yah
  const handleWordClick = (id, word, isSelected) => {
    SoundManager.playSound("buttonClick");

    if (isSelected) {
      // Remove the word object from wordsAnswer if already selected
      setWordsAnswer(wordsAnswer.filter((item) => item.id !== id));
    } else {
      // Add the word object to wordsAnswer if not selected
      setWordsAnswer([...wordsAnswer, { id, word }]);
    }

    // Update the isSelected state in words by id
    setWords(
      words.map((w) => (w.id === id ? { ...w, isSelected: !isSelected } : w))
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        changePhase(phases.FREE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fullscreen-white translate-y-0 flex-col font-questrial text-gray-900 transition-transform duration-500 ease-in-out sm:text-2xl">
      {/* Header */}
      <div className="mb-10 flex h-8 w-full items-center justify-between text-gray-600 transition-all duration-300 ease-in-out hover:text-gray-600 sm:mb-20 lg:mb-10">
        <BackButton onClick={() => changePhase(phases.FREE)} />
        <div className="flex items-center gap-2">
          <div>Total {t("correct")}:</div>
          <div>
            {userId ? (
              correctCount !== null ? (
                correctCount
              ) : (
                <LoadingSpinner className="animate-spin" />
              )
            ) : (
              "0"
            )}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="mb-6 flex h-8 w-full items-center justify-between sm:mb-16 lg:mb-6">
        <div className="text-xl font-bold sm:text-3xl">
          {t("translate_this_sentence")}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div>{t("daily_limit")}:</div>
          <div>
            {userId ? (
              attempsLeft !== null ? (
                attempsLeft
              ) : (
                <LoadingSpinner className="animate-spin" />
              )
            ) : (
              "10"
            )}
          </div>
        </div>
      </div>

      {/* Sentence Section */}
      <div className="flex w-full justify-center">
        <div className="flex h-48 w-full sm:h-60 lg:w-3/4">
          <Image
            src="/images/character/jawara-ai.png"
            alt="Jawara AI Character"
            width={175}
            height={175}
            className="h-48 w-auto sm:h-60"
          />
          <div
            ref={sentenceBox}
            className="ml-1 h-44 w-4/5 rounded-3xl border-2 px-4 py-2 sm:h-48"
          >
            {t("translation_exercise_description")}
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex h-36 w-full flex-wrap gap-2 border-y-2 py-2 sm:gap-4 lg:gap-6">
        {wordsAnswer.map((word, index) => (
          <Button
            key={index}
            id={word.id}
            word={word.word}
            isSelected={true}
            isAnswer={true}
            onClick={handleWordClick}
          />
        ))}
      </div>
      <div className="flex h-36 w-full flex-wrap gap-2 py-2 sm:gap-4 lg:gap-6">
        {words.map((word, index) => (
          <Button
            key={word.id}
            id={word.id}
            word={word.word}
            isSelected={word.isSelected}
            onClick={handleWordClick}
          />
        ))}
      </div>

      {/* Check Button */}
      <div>
        {userId ? (
          attempsLeft ? (
            attempsLeft > 0 ? (
              <div
                className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-gray-100 hover:bg-orange-600 sm:mt-20 sm:text-3xl lg:mt-10"
                onClick={sentence ? checkAnswer : generateSentence}
              >
                {isCheckingAnswer
                  ? `${t("checking_answer")}...`
                  : sentence
                  ? t("check")
                  : isGeneratingSentence
                  ? `${t("generating_sentence")}...`
                  : t("generate_sentence")}
              </div>
            ) : (
              <div className="mt-10 flex h-10 w-full cursor-default items-center justify-center gap-2 rounded-full bg-gray-500 py-1 text-center text-xl font-bold text-gray-100 sm:mt-20 sm:text-3xl lg:mt-10">
                {t("daily_limit_reached")}
              </div>
            )
          ) : (
            <div className="mt-10 flex h-10 w-full cursor-default items-center justify-center gap-2 rounded-full bg-gray-500 py-1 text-center text-xl font-bold text-gray-100 sm:mt-20 sm:text-3xl lg:mt-10">
              {t("loading")}...
            </div>
          )
        ) : (
          <Link
            href={routes.SIGN_IN}
            className="btn-template mt-10 flex h-10 w-full items-center justify-center bg-orange-500 text-xl text-gray-100 hover:bg-orange-600 sm:mt-20 sm:text-3xl lg:mt-10"
          >
            {t("sign_in_to_generate")}
          </Link>
        )}
      </div>

      <div
        className={`
          absolute bottom-0 left-0 z-10 flex flex-col gap-4 justify-center items-center
          min-h-1/4 h-auto w-full flex-wrap p-2
          transition-transform duration-500 ease-in-out
          sm:px-12 sm:py-6 md:gap-6 lg:px-32
          ${isFeedbackVisible ? "translate-y-0" : "translate-y-full"}
          ${isTrue ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}
        `}
      >
        <div className="flex h-8 w-full items-center">
          {isTrue ? (
            <FaCheckCircle className="text-3xl sm:text-5xl" />
          ) : (
            <IoMdCloseCircle className="text-3xl sm:text-5xl" />
          )}
          <h5 className="ml-2 text-2xl font-bold sm:text-4xl">{feedback}</h5>
        </div>
        <div className="w-full text-sm sm:text-lg md:text-xl">
          {explanation}
        </div>
        <div className="flex w-full justify-center">
          <div
            className={`btn-template flex h-8 w-1/2 items-center justify-center text-gray-100 ${
              isTrue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-red-700 hover:bg-red-800"
            }`}
            onClick={generateSentence}
          >
            {isGeneratingSentence
              ? `${t("generating_sentence")}...`
              : t("generate_sentence")}
          </div>
        </div>
      </div>
    </div>
  );
};
