import multiavatar from "@multiavatar/multiavatar/esm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import routes from "@/constants/routes";
import { phases, useGame } from "@/hooks/useGame";
import {
  getAllScores,
  getFriendsLeaderboard,
} from "@/lib/actions/score.action";
import { SoundManager } from "@/lib/SoundManager";

const LanguageCategory = ({ gameMode, activeGameMode, onClick }) => (
  <div
    className={`flex cursor-pointer items-center text-center capitalize transition-all duration-300 ease-in-out hover:border-b-4 hover:border-white ${
      gameMode === activeGameMode ? "border-b-4 border-white" : ""
    }`}
    onClick={() => onClick(gameMode)}
  >
    {gameMode === "ngoko" ? gameMode : `Krama ${gameMode}`}
  </div>
);

const GameLeaderboardInterface = () => {
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGameMode, setActiveGameMode] = useState("ngoko");
  const [isGlobal, setIsGlobal] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const gameMap = {
          [phases.FIRST_GAME]: "game1",
          [phases.SECOND_GAME]: "game2",
          [phases.THIRD_GAME]: "game3",
          [phases.FOURTH_GAME]: "game4",
        };

        const game = gameMap[phase];
        if (game) {
          if (isGlobal) {
            const result = await getAllScores({
              game,
              gameMode: activeGameMode,
            });
            setLeaderboard(result.leaderboard);
          } else {
            if (session?.user?.id) {
              const result = await getFriendsLeaderboard(
                session.user.id,
                game,
                activeGameMode
              );
              setLeaderboard(result.friendsLeaderboard);
            } else {
              setLeaderboard(null);
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [phase, activeGameMode, isGlobal]);

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
      <h1 className="h1-bold flex text-gray-100 drop-shadow-lg">
        {isGlobal ? t("global_leaderboard") : t("friends_leaderboard")}
        <DropdownMenu>
          <DropdownMenuTrigger onFocus={(e) => e.target.blur()}>
            <IoMdArrowDropdown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsGlobal(true)}
            >
              Global
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsGlobal(false)}
            >
              {t("friends")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </h1>

      <div className="flex h-10 w-[90%] justify-between rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-4 text-gray-100 sm:w-[70%] sm:text-lg md:text-xl lg:w-1/2 lg:text-2xl">
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

      <div className="flex size-full flex-col justify-between rounded-t-3xl bg-gradient-to-r from-orange-500 to-orange-700 px-4 pb-32 pt-4 text-gray-100 sm:w-[90%] sm:text-lg md:text-xl lg:w-[70%] lg:text-2xl">
        {loading ? (
          <ul className="flex size-full items-center justify-center text-center text-2xl sm:text-3xl">
            {t("loading")}...
          </ul>
        ) : leaderboard?.length > 0 ? (
          <ul className="size-full overflow-y-auto pb-64 sm:pb-28">
            {leaderboard.map((topScore, index) => (
              <li key={index}>
                <Link
                  href={`${routes.PROFILE}/${topScore.userId}`}
                  className="mb-4 flex justify-between border-b-2 border-white px-1 pb-3 pt-1"
                >
                  <div className="flex">
                    <div className="flex w-5 items-center text-center sm:w-10">
                      {index + 1}
                    </div>
                    <div className="relative">
                      <div
                        className="size-10 sm:size-12"
                        dangerouslySetInnerHTML={{
                          __html: multiavatar(topScore.userId),
                        }}
                      />
                    </div>
                    <div className="ml-4 flex items-center">
                      {topScore.name}
                    </div>
                  </div>
                  <div className="flex items-center">{topScore.score}</div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex size-full items-center justify-center whitespace-pre-line text-center text-2xl sm:text-3xl">
            {isGlobal || session?.user?.id ? (
              t("leaderboard_is_empty")
            ) : (
              <span>
                {t("friends_leaderboard_is_empty").split("Sign in")[0]}
                <Link
                  href={routes.SIGN_IN}
                  className="text-blue-400 hover:underline"
                >
                  {t("sign_in")}
                </Link>
                {t("friends_leaderboard_is_empty").split("Sign in")[1]}
              </span>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameLeaderboardInterface;
