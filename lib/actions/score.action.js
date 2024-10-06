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
    }).populate({ path: "topScores.userId", model: User })

    const result = JSON.parse(JSON.stringify(leaderboard))

    return { result }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateScore({ userId, game, gameMode, score }) {
  let session = null
  try {
    await connectToDatabase()
    session = await mongoose.startSession()
    session.startTransaction()

    // Step 1: Update user's score if the new score is higher
    const user = await User.findOne({ clerkId: userId }).session(session)

    if (user.scores[game][gameMode] < score) {
      user.scores[game][gameMode] = score
      await user.save({ session })

      // Step 2: Find the leaderboard for the specific game and gameMode
      const leaderboard = await Leaderboard.findOne({ game, gameMode }).session(
        session
      )

      // Check if the user is already in the leaderboard
      const existingEntryIndex = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      )

      if (existingEntryIndex !== -1) {
        // If the user's score is higher, update it
        if (leaderboard.topScores[existingEntryIndex].score < score) {
          leaderboard.topScores[existingEntryIndex].score = score
        }
      } else {
        // If user is not in the leaderboard and there is space or their score is high enough
        if (leaderboard.topScores.length < 100) {
          leaderboard.topScores.push({ userId: user._id, score })
        } else {
          // Check if the new score qualifies to enter the leaderboard
          const lowestScore = leaderboard.topScores[99]
          if (score > lowestScore.score) {
            leaderboard.topScores.pop() // Remove the lowest score
            leaderboard.topScores.push({ userId: user._id, score })
          }
        }
      }

      // Sort leaderboard and trim to top 100
      leaderboard.topScores.sort((a, b) => b.score - a.score)
      leaderboard.topScores = leaderboard.topScores.slice(0, 100)

      await leaderboard.save({ session })
    }

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    return { success: true, message: "Score updated successfully" }
  } catch (error) {
    if (session) {
      await session.abortTransaction()
      session.endSession()
    }
    console.error("Error updating score:", error)
    return { success: false, message: "Failed to update score" }
  } finally {
    // Ensure the session is ended
    if (session) {
      session.endSession()
    }
  }
}
