"use server";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

import Leaderboard from "@/database/leaderboard.model";
import User from "@/database/user.model";

export async function getAllScores({ game, gameMode }) {
  try {
    dbConnect();

    const leaderboard = await Leaderboard.findOne({
      game,
      gameMode,
    }).populate({ path: "topScores.userId", select: "name username" }); // Only get name, username and _id

    // Transform the data: Convert userId to a string and keep name & username
    const result = leaderboard
      ? {
          ...leaderboard.toObject(),
          topScores: leaderboard.topScores.map(({ userId, score }) => ({
            userId: userId._id.toString(), // Convert ObjectId to string
            name: userId.name, // Keep name
            username: userId.username, // Keep username
            score,
          })),
        }
      : null;

    return { success: true, leaderboard: result.topScores };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateScore({ userId, game, gameMode, score }) {
  try {
    await dbConnect();

    // Step 1: Update user's score if the new score is higher
    const user = await User.findById(userId);

    if (user.scores[game][gameMode] < score) {
      user.scores[game][gameMode] = score;
      await user.save();

      // Step 2: Find the leaderboard for the specific game and gameMode
      const leaderboard = await Leaderboard.findOne({ game, gameMode });

      // Check if the user is already in the leaderboard
      const existingEntryIndex = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      );

      if (existingEntryIndex !== -1) {
        // If the user's score is higher, update it
        if (leaderboard.topScores[existingEntryIndex].score < score) {
          leaderboard.topScores[existingEntryIndex].score = score;
        }
      } else {
        // If user is not in the leaderboard and there is space or their score is high enough
        if (leaderboard.topScores.length < 100) {
          leaderboard.topScores.push({ userId: user._id, score });
        } else {
          // Check if the new score qualifies to enter the leaderboard
          const lowestScore = leaderboard.topScores[99];
          if (score > lowestScore.score) {
            leaderboard.topScores.pop(); // Remove the lowest score
            leaderboard.topScores.push({ userId: user._id, score });
          }
        }
      }

      // Sort leaderboard and trim to top 100
      leaderboard.topScores.sort((a, b) => b.score - a.score);
      leaderboard.topScores = leaderboard.topScores.slice(0, 100);

      await leaderboard.save();
    }

    return { success: true, message: "Score updated successfully" };
  } catch (error) {
    return handleError(error);
  }
}

export async function getFriendsLeaderboard(userId, game, gameMode) {
  try {
    await dbConnect();

    // Find user and their friends
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Collect friends' scores
    const friendsScores = user.friends.map((friend) => ({
      userId: friend._id.toString(),
      name: friend.name,
      username: friend.username,
      score: friend.scores?.[game]?.[gameMode] || 0,
    }));

    // Include the user's own score
    const userScore = {
      userId: user._id.toString(),
      name: user.name,
      username: user.username,
      score: user.scores?.[game]?.[gameMode] || 0,
    };

    // Combine user and friends' scores
    const leaderboard = [userScore, ...friendsScores];

    // Sort by score (descending order)
    leaderboard.sort((a, b) => b.score - a.score);

    return { success: true, friendsLeaderboard: leaderboard };
  } catch (error) {
    return handleError(error);
  }
}
