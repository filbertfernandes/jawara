"use server"

import mongoose from "mongoose"
import User from "@/database/user.model" // Adjust the import path as needed
import Leaderboard from "@/database/leaderboard.model" // Adjust the import path as needed
import { connectToDatabase } from "../mongoose"

export async function getAllScores({ game, gameMode }) {
  try {
    connectToDatabase()

    const leaderboard = await Leaderboard.findOne({
      game: game,
      gameMode: gameMode,
    }).populate({ path: "topScores.userId", model: User, select: "nickname" })

    const result = JSON.parse(JSON.stringify(leaderboard))

    return { result }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateScore({ userId, game, gameMode, score }) {
  try {
    connectToDatabase()

    const session = await mongoose.startSession()
    session.startTransaction()

    // Step 1: Update user's score
    const user = await User.findOne({ clerkId: userId }).session(session)
    const userGameScores = user.scores[game][gameMode]

    // Update the high score if the new score is higher
    if (score > userGameScores) {
      user.scores[game][gameMode] = score

      await user.save({ session })

      // Step 2: Check and update the leaderboard
      const leaderboard = await Leaderboard.findOne({ game, gameMode }).session(
        session
      )

      // Check if the score qualifies for the top 100
      let isInTop100 = false
      let newRank = null

      // If leaderboard has fewer than 100 entries, add it
      if (leaderboard.topScores.length < 100) {
        newRank = leaderboard.topScores.length + 1
        leaderboard.topScores.push({ userId: user._id, score, rank: newRank })
        isInTop100 = true
      } else {
        // Check if the new score qualifies for a rank
        const lowestScore = leaderboard.topScores[99] // Get the lowest score in top 100
        if (score > lowestScore.score) {
          // Remove the lowest score and add the new score
          leaderboard.topScores.pop() // Remove the last entry
          newRank = 100 // New score will take rank 100

          // Add the new score
          leaderboard.topScores.push({ userId: user._id, score, rank: newRank })
          isInTop100 = true
        }
      }

      // Update ranks if the new score is added
      if (isInTop100) {
        // First, remove scores that are lower than the newly achieved score
        leaderboard.topScores = leaderboard.topScores.filter((entry) => {
          return !(
            entry.userId.toString() === user._id.toString() &&
            entry.score < score
          )
        })

        if (game === "game1") {
          leaderboard.topScores.sort((a, b) => a.score - b.score) // Sort by score ascending
        } else {
          leaderboard.topScores.sort((a, b) => b.score - a.score) // Sort by score descending
        }

        leaderboard.topScores.forEach((entry, index) => {
          entry.rank = index + 1 // Update rank based on index
        })
        await leaderboard.save({ session })
      }
    }

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    return { success: true, message: "Score updated successfully" }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error("Error updating score:", error)
    return { success: false, message: "Failed to update score" }
  }
}
