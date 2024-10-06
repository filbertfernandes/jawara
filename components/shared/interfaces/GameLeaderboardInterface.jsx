import { phases, useGame } from "@/hooks/useGame"
import { getAllScores } from "@/lib/actions/score.action"
import { SoundManager } from "@/lib/SoundManager"
import { useEffect, useState } from "react"

const players = [
  { _id: 1, name: "filbert_fernandes", highscore: 200 },
  { _id: 2, name: "cyber_chris", highscore: 81 },
  { _id: 3, name: "jordan_xoxo", highscore: 117 },
  { _id: 4, name: "taylor_99", highscore: 46 },
  { _id: 5, name: "morgan_hero", highscore: 193 },
  { _id: 6, name: "jamie_fast", highscore: 174 },
  { _id: 7, name: "avery_dragon", highscore: 198 },
  { _id: 8, name: "charlie_wave", highscore: 67 },
  { _id: 9, name: "casey_shadow", highscore: 113 },
  { _id: 10, name: "riley_fire", highscore: 88 },
  { _id: 11, name: "peyton_sky", highscore: 137 },
  { _id: 12, name: "dakota_blaze", highscore: 164 },
  { _id: 13, name: "harper_frost", highscore: 53 },
  { _id: 14, name: "bailey_thunder", highscore: 142 },
  { _id: 15, name: "skyler_light", highscore: 101 },
]

const LanguageCategory = ({ gameMode, activeGameMode, onClick }) => (
  <div
    className={`flex items-center text-center cursor-pointer capitalize ${
      gameMode === activeGameMode ? "border-sky-400 border-b-2" : ""
    }`}
    onClick={() => onClick(gameMode)}
  >
    {gameMode === "ngoko" ? gameMode : `Krama ${gameMode}`}
  </div>
)

const GameLeaderboardInterface = () => {
  const { phase } = useGame((state) => ({
    phase: state.phase,
  }))
  const [leaderboard, setLeaderboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeGameMode, setActiveGameMode] = useState("ngoko")

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      try {
        let result

        if (phase === phases.FIRST_GAME) {
          result = await getAllScores({
            game: "game1",
            gameMode: activeGameMode,
          })
        } else if (phase === phases.SECOND_GAME) {
          result = await getAllScores({
            game: "game2",
            gameMode: activeGameMode,
          })
        }

        setLeaderboard(result)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [phase, activeGameMode]) // Dependency array to re-fetch when phase changes

  const [isVisible, setIsVisible] = useState(false)

  const changeGameModeFilter = (gameMode) => {
    SoundManager.playSound("buttonClick")
    setActiveGameMode(gameMode)
  }

  useEffect(() => {
    // Trigger the popup effect after the component mounts
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`flex flex-col items-center gap-6 w-full h-full mt-8 sm:gap-4 sm:-mt-8 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-sky-400 drop-shadow-lg">Leaderboard</h1>

      <div className="flex justify-between text-white w-[90%] h-10 bg-stone-800/50 px-4 rounded-lg sm:text-lg sm:w-[70%] md:text-xl lg:text-2xl lg:w-[50%]">
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
        <div className="flex justify-between text-white text-sm w-full h-full bg-stone-800/50 px-4 rounded-t-3xl rounded-b-3xl pt-4 sm:text-base sm:w-[90%] md:text-lg lg:text-2xl lg:w-[70%]">
          <ul className="h-full w-full overflow-y-auto pb-64 sm:pb-28">
            {leaderboard.result.topScores.map((topScore, index) => {
              // Set the background color based on rank
              let bgColor
              if (index === 0) {
                bgColor = "bg-yellow-500" // Rank 1
              } else if (index === 1) {
                bgColor = "bg-slate-500" // Rank 2
              } else if (index === 2) {
                bgColor = "bg-orange-700" // Rank 3
              } else {
                bgColor = "bg-black" // Rank 4 and onward
              }

              return (
                <li
                  key={topScore._id}
                  className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4"
                >
                  <div className="flex">
                    <div className="avatar relative">
                      <div className="w-12 rounded-full">
                        <img src={topScore.userId.picture} alt="avatar" />
                      </div>
                      <span
                        className={`absolute -top-1 -left-1 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center ${bgColor}`}
                      >
                        {index + 1} {/* Rank number */}
                      </span>
                    </div>
                    <div className="flex items-center ml-4">
                      {topScore.userId.username}
                    </div>
                  </div>
                  <div className="flex items-center">{topScore.score}</div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GameLeaderboardInterface
