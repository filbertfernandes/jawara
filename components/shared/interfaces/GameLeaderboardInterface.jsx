import { useEffect, useState } from "react";

import { phases, useGame } from "@/hooks/useGame";
import { getAllScores } from "@/lib/actions/score.action";
import { SoundManager } from "@/lib/SoundManager";

// DUMMY DATA
const leaderboard = {
  result: {
    _id: "66fc98eff4f06778967b8192",
    game: "game2",
    gameMode: "ngoko",
    topScores: [
      {
        userId: {
          name: "Filbert Fernandes Lienardy",
          username: "budis",
          email: "budi.santoso@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 10,
              madya: 5,
              alus: 2,
            },
            game2: {
              ngoko: 200,
              madya: 35,
              alus: 15,
            },
            game3: {
              ngoko: 8,
              madya: 12,
              alus: 6,
            },
          },
        },
        score: 239,
      },
      {
        userId: {
          name: "Peter Parker",
          username: "sitia",
          email: "siti.aisyah@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 12,
              madya: 7,
              alus: 4,
            },
            game2: {
              ngoko: 182,
              madya: 30,
              alus: 18,
            },
            game3: {
              ngoko: 14,
              madya: 9,
              alus: 11,
            },
          },
        },
        score: 182,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
      {
        userId: {
          name: "Jonas Kahnwald",
          username: "andip",
          email: "andi.pratama@example.com",
          image:
            "https://imgcdn.stablediffusionweb.com/2024/9/19/3db00914-ee1b-4c69-9608-fec58216ca93.jpg",
          scores: {
            game1: {
              ngoko: 15,
              madya: 10,
              alus: 5,
            },
            game2: {
              ngoko: 150,
              madya: 28,
              alus: 12,
            },
            game3: {
              ngoko: 20,
              madya: 15,
              alus: 10,
            },
          },
        },
        score: 150,
      },
    ],
  },
};

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
  // const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(false); // <- SEMENTARA, JANGAN LUPA UBAH KE TRUE
  const [activeGameMode, setActiveGameMode] = useState("ngoko");

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     setLoading(true);
  //     try {
  //       let result;

  //       if (phase === phases.FIRST_GAME) {
  //         result = await getAllScores({
  //           game: "game1",
  //           gameMode: activeGameMode,
  //         });
  //       } else if (phase === phases.SECOND_GAME) {
  //         result = await getAllScores({
  //           game: "game2",
  //           gameMode: activeGameMode,
  //         });
  //       } else if (phase === phases.THIRD_GAME) {
  //         result = await getAllScores({
  //           game: "game3",
  //           gameMode: activeGameMode,
  //         });
  //       } else if (phase === phases.FOURTH_GAME) {
  //         result = await getAllScores({
  //           game: "game4",
  //           gameMode: activeGameMode,
  //         });
  //       }

  //       setLeaderboard(result);
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, [phase, activeGameMode]);

  const [isVisible, setIsVisible] = useState(false);

  const changeGameModeFilter = (gameMode) => {
    SoundManager.playSound("buttonClick");
    setActiveGameMode(gameMode);
  };

  useEffect(() => {
    // Trigger the popup effect after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mt-8 flex h-screen w-full flex-col items-center gap-6 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-orange-500 drop-shadow-lg">Leaderboard</h1>

      <div className="flex h-10 w-[90%] justify-between rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-4 text-white sm:w-[70%] sm:text-lg md:text-xl lg:w-[50%] lg:text-2xl">
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

      {!loading && (
        <div className="flex size-full justify-between rounded-t-3xl bg-gradient-to-r from-orange-500 to-orange-700 px-4 pb-32 pt-4 text-white sm:w-[90%] sm:text-lg md:text-xl lg:w-[70%] lg:text-2xl">
          <ul className="size-full overflow-y-auto pb-64 sm:pb-28">
            {leaderboard.result.topScores.map((topScore, index) => (
              <li
                key={index}
                className="mb-4 flex justify-between border-b-2 border-white px-1 pb-3 pt-1"
              >
                <div className="flex">
                  <div className="flex w-5 items-center text-center sm:w-10">
                    {index + 1}
                  </div>
                  <div className="avatar relative">
                    <div className="w-12 rounded-full">
                      <img src={topScore.userId.image} alt="avatar" />
                    </div>
                  </div>
                  <div className="ml-4 flex items-center">
                    {topScore.userId.name}
                  </div>
                </div>
                <div className="flex items-center">{topScore.score}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameLeaderboardInterface;
