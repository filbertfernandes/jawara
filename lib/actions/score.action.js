"use server";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { addNewAchievement } from "./userAchievement.action";

import { achievements } from "@/constants/achievements";
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

    let isGetAchievements = false;

    // Step 1: Fetch user data
    const user = await User.findById(userId);

    const isFirstTime =
      user.scores[game].ngoko === -1 &&
      user.scores[game].madya === -1 &&
      user.scores[game].alus === -1;

    if (!user.scores[game] || isFirstTime) {
      user.scores[game] = {}; // Ensure the game key exists

      const firstTimeAchievements = {
        game1: achievements.FIRST_TIME_BODY_PARTS,
        game2: achievements.FIRST_TIME_COLORS,
        game3: achievements.FIRST_TIME_NUMBERS,
        game4: achievements.FIRST_TIME_ANIMALS,
      };

      const achievementId = firstTimeAchievements[game];

      if (achievementId) {
        const { success } = await addNewAchievement(userId, achievementId);
        isGetAchievements = success;
      }
    }

    if (
      (game === "game1" && user.scores[game][gameMode] > score) ||
      (game !== "game1" && user.scores[game][gameMode] < score) ||
      isFirstTime
    ) {
      // Update user's score
      user.scores[game][gameMode] = score;
      await user.save();

      // Step 2: Find the leaderboard for the specific game and gameMode
      const leaderboard = await Leaderboard.findOne({ game, gameMode });

      if (!leaderboard) {
        // If no leaderboard exists, create one
        await Leaderboard.create({
          game,
          gameMode,
          topScores: [{ userId: user._id, score }],
        });
        return { success: true, message: "Score updated successfully" };
      }

      // Check if the user is already in the leaderboard
      const existingEntryIndex = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      );

      if (existingEntryIndex !== -1) {
        leaderboard.topScores[existingEntryIndex].score = score;
      } else {
        // If user is not in the leaderboard and there's space or their score qualifies
        if (leaderboard.topScores.length < 100) {
          leaderboard.topScores.push({ userId: user._id, score });
        } else {
          // Check if the new score qualifies to enter the leaderboard
          const lowestScore = leaderboard.topScores[99];
          if (
            (game === "game1" && score < lowestScore.score) ||
            (game !== "game1" && score > lowestScore.score)
          ) {
            leaderboard.topScores.pop(); // Remove the worst score
            leaderboard.topScores.push({ userId: user._id, score });
          }
        }
      }

      // Sorting logic
      if (game === "game1") {
        leaderboard.topScores.sort((a, b) => a.score - b.score); // Ascending order (lower is better)
      } else {
        leaderboard.topScores.sort((a, b) => b.score - a.score); // Descending order (higher is better)
      }

      // Trim to top 100
      leaderboard.topScores = leaderboard.topScores.slice(0, 100);
      await leaderboard.save();

      // Step 3: Assign leaderboard achievements
      const userRank = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      );

      const leaderboardAchievements = [
        { rank: 100, achievement: achievements.TOP_100 },
        { rank: 50, achievement: achievements.TOP_50 },
        { rank: 10, achievement: achievements.TOP_10 },
        { rank: 3, achievement: achievements.TOP_3 },
      ];

      // Assign achievements if the user qualifies
      for (const { rank, achievement } of leaderboardAchievements) {
        if (userRank < rank) {
          const { success } = await addNewAchievement(userId, achievement);
          isGetAchievements = success;
        }
      }
    }

    return {
      success: true,
      message: "Score updated successfully",
      isGetAchievements,
    };
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
      score:
        friend.scores?.[game]?.[gameMode] === -1
          ? 0
          : friend.scores?.[game]?.[gameMode],
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
