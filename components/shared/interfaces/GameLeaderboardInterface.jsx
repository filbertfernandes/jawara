import { phases, useGame } from "@/hooks/useGame"
import { getAllScores } from "@/lib/actions/score.action"
import { SoundManager } from "@/lib/SoundManager"
import { useEffect, useState } from "react"

const LanguageCategory = ({ gameMode, activeGameMode, onClick }) => (
  <div
    className={`flex cursor-pointer items-center text-center capitalize ${
      gameMode === activeGameMode ? "border-b-2 border-sky-400" : ""
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
        } else if (phase === phases.THIRD_GAME) {
          result = await getAllScores({
            game: "game3",
            gameMode: activeGameMode,
          })
        } else if (phase === phases.FOURTH_GAME) {
          result = await getAllScores({
            game: "game4",
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
      className={`mt-8 flex size-full flex-col items-center gap-6 sm:-mt-8 sm:gap-4 ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-sky-400 drop-shadow-lg">Leaderboard</h1>

      <div className="flex h-10 w-[90%] justify-between rounded-lg bg-stone-800/50 px-4 text-white sm:w-[70%] sm:text-lg md:text-xl lg:w-[50%] lg:text-2xl">
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
        <div className="flex size-full justify-between rounded-3xl bg-stone-800/50 px-4 pt-4 text-sm text-white sm:w-[90%] sm:text-base md:text-lg lg:w-[70%] lg:text-2xl">
          <ul className="size-full overflow-y-auto pb-64 sm:pb-28">
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
                  className="mb-4 flex justify-between border-b-2 border-white/10 px-1 pb-3 pt-1"
                >
                  <div className="flex">
                    <div className="avatar relative">
                      <div className="w-12 rounded-full">
                        <img src={topScore.userId.picture} alt="avatar" />
                      </div>
                      <span
                        className={`absolute -left-1 -top-1 flex size-[1.125rem] items-center justify-center rounded-full text-xs font-bold text-white ${bgColor}`}
                      >
                        {index + 1} {/* Rank number */}
                      </span>
                    </div>
                    <div className="ml-4 flex items-center">
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
