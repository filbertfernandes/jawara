import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { phases, useGame } from "@/hooks/useGame";
import { getAllScores } from "@/lib/actions/score.action";
import { SoundManager } from "@/lib/SoundManager";

const LanguageCategory = ({ gameMode, activeGameMode, onClick }) => (
  <div
    className={`flex cursor-pointer items-center text-center capitalize transition-all duration-100 ease-in-out hover:border-b-4 hover:border-white ${
      gameMode === activeGameMode ? "border-b-4 border-white" : ""
    }`}
    onClick={() => onClick(gameMode)}
  >
    {gameMode === "ngoko" ? gameMode : `Krama ${gameMode}`}
  </div>
);

const GameLeaderboardInterface = () => {
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGameMode, setActiveGameMode] = useState("ngoko");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let result;

        if (phase === phases.FIRST_GAME) {
          result = await getAllScores({
            game: "game1",
            gameMode: activeGameMode,
          });
        } else if (phase === phases.SECOND_GAME) {
          result = await getAllScores({
            game: "game2",
            gameMode: activeGameMode,
          });
        } else if (phase === phases.THIRD_GAME) {
          result = await getAllScores({
            game: "game3",
            gameMode: activeGameMode,
          });
        } else if (phase === phases.FOURTH_GAME) {
          result = await getAllScores({
            game: "game4",
            gameMode: activeGameMode,
          });
        }

        setLeaderboard(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [phase, activeGameMode]);

  const [isVisible, setIsVisible] = useState(false);

  const changeGameModeFilter = (gameMode) => {
    SoundManager.playSound("buttonClick");
    setActiveGameMode(gameMode);
  };

  useEffect(() => {
    setIsVisible(true); // Trigger the popup effect after the component mounts
  }, []);

  return (
    <div
      className={`mt-8 flex h-screen w-full flex-col items-center gap-6 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-white drop-shadow-lg">Leaderboard</h1>

      <div className="flex h-10 w-[90%] justify-between rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-4 text-white sm:w-[70%] sm:text-lg md:text-xl lg:w-1/2 lg:text-2xl">
        <LanguageCategory
          gameMode="ngoko"
          activeGameMode={activeGameMode}
          onClick={changeGameModeFilter}
        />
        <LanguageCategory
          gameMode="madya"
          activeGameMode={activeGameMode}
          onClick={changeGameModeFilter}
        />
        <LanguageCategory
          gameMode="alus"
          activeGameMode={activeGameMode}
          onClick={changeGameModeFilter}
        />
      </div>

      <div className="flex size-full justify-between rounded-t-3xl bg-gradient-to-r from-orange-500 to-orange-700 px-4 pb-32 pt-4 text-white sm:w-[90%] sm:text-lg md:text-xl lg:w-[70%] lg:text-2xl">
        {loading ? (
          <ul className="flex size-full items-center justify-center text-2xl sm:text-3xl">
            Loading.....
          </ul>
        ) : (
          <ul className="size-full overflow-y-auto pb-64 sm:pb-28">
            {leaderboard.result.topScores.map((topScore, index) => (
              <li key={index}>
                <Link
                  href={`/profile/${topScore.userId._id}`}
                  className="mb-4 flex justify-between border-b-2 border-white px-1 pb-3 pt-1"
                >
                  <div className="flex">
                    <div className="flex w-5 items-center text-center sm:w-10">
                      {index + 1}
                    </div>
                    <div className="relative">
                      <Avatar className="size-10 sm:size-12">
                        {topScore.userId.image ? (
                          <Image
                            src={topScore.userId.image}
                            alt={topScore.userId.username}
                            className="object-cover"
                            width={50}
                            height={50}
                            quality={100}
                          />
                        ) : (
                          <AvatarFallback className="bg-white font-sans text-2xl font-bold tracking-wider text-orange-500 sm:text-3xl">
                            {topScore.userId.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <div className="ml-4 flex items-center">
                      {topScore.userId.name}
                    </div>
                  </div>
                  <div className="flex items-center">{topScore.score}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameLeaderboardInterface;
