import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { useGame, gameStates } from "@/hooks/useGame.jsx";

// Reusable Button Component
const GameButton = ({ label, onClick }) => (
  <button
    className="btn-template w-28 bg-orange-500 px-1 text-sm text-gray-100 lg:w-52 lg:p-1.5 lg:text-3xl"
    onClick={onClick}
  >
    {label}
  </button>
);

const GameOverInterface = ({ score, startGame }) => {
  const t = useTranslations("Home");

  const { changeGameState } = useGame((state) => ({
    changeGameState: state.changeGameState,
  }));

  // Memoized button click handlers
  const handleRetry = useCallback(() => {
    changeGameState(gameStates.GAME);
    startGame({ mode: "" });
  }, [changeGameState, startGame]);

  const handleBackToMenu = useCallback(() => {
    changeGameState(gameStates.MENU);
  }, [changeGameState]);

  const handleKeyDown = (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault(); // Prevent the default space key action
    }
  };

  return (
    <div
      className="flex h-[90%] w-full flex-col items-center justify-center gap-6"
      onKeyDown={handleKeyDown}
    >
      <div className="text-center">
        <h1 className="h1-bold text-gray-100 drop-shadow-lg">
          {t("language") === "english" ? "CONGRATULATIONS!" : "SELAMAT!"}
        </h1>
        <h5 className="h5-bold text-gray-100 drop-shadow-lg">
          {t("language") === "english" ? "Your score is" : "Skor Anda adalah"}{" "}
          {score}
        </h5>
      </div>

      <GameButton
        label={t("language") === "english" ? "Play Again" : "Main Lagi"}
        onClick={handleRetry}
      />
      <GameButton
        label={t("language") === "english" ? "Back to Menu" : "Kembali ke Menu"}
        onClick={handleBackToMenu}
      />
    </div>
  );
};

export default GameOverInterface;
