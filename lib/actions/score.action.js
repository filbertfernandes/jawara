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
    })
      .populate({
        path: "topScores.userId", // Replace each userId with the actual User document, but only with selected fields
        select: "name username profileAvatarIndex", // Only select name, username, profileAvatarIndex and _id
      })
      .lean();

    if (!leaderboard) {
      return { success: true, leaderboard: null };
    }

    const formattedScores = leaderboard.topScores.map(({ userId, score }) => ({
      userId: userId._id.toString(),
      name: userId.name,
      username: userId.username,
      profileAvatarIndex: userId.profileAvatarIndex,
      score,
    }));

    return { success: true, leaderboard: formattedScores };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateScore({ userId, game, gameMode, score }) {
  try {
    await dbConnect();

    let isGetAchievements = false;

    const user = await User.findById(userId);

    const isFirstTime =
      user.scores[game].ngoko === -1 &&
      user.scores[game].madya === -1 &&
      user.scores[game].alus === -1;

    if (isFirstTime) {
      const firstTimeAchievements = {
        game1: achievements.FIRST_TIME_BODY_PARTS,
        game2: achievements.FIRST_TIME_COLORS,
        game3: achievements.FIRST_TIME_NUMBERS,
        game4: achievements.FIRST_TIME_ANIMALS,
      };

      const achievementId = firstTimeAchievements[game];

      if (achievementId) {
        const { success } = await addNewAchievement(userId, achievementId);
        isGetAchievements = isGetAchievements || success;
      }
    }

    if (
      (game === "game1" && user.scores[game][gameMode] > score) ||
      (game !== "game1" && user.scores[game][gameMode] < score) ||
      user.scores[game][gameMode] === -1
    ) {
      user.scores[game][gameMode] = score;
      await user.save();

      const leaderboard = await Leaderboard.findOne({ game, gameMode });

      if (!leaderboard) {
        await Leaderboard.create({
          game,
          gameMode,
          topScores: [{ userId: user._id, score }],
        });
        return { success: true, message: "Score updated successfully" };
      }

      const existingEntryIndex = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      );

      if (existingEntryIndex !== -1) {
        leaderboard.topScores[existingEntryIndex].score = score;
      } else {
        if (leaderboard.topScores.length < 100) {
          leaderboard.topScores.push({ userId: user._id, score });
        } else {
          const lowestScore = leaderboard.topScores[99];
          if (
            (game === "game1" && score < lowestScore.score) ||
            (game !== "game1" && score > lowestScore.score)
          ) {
            leaderboard.topScores.pop();
            leaderboard.topScores.push({ userId: user._id, score });
          }
        }
      }

      if (game === "game1") {
        leaderboard.topScores.sort((a, b) => a.score - b.score);
      } else {
        leaderboard.topScores.sort((a, b) => b.score - a.score);
      }

      leaderboard.topScores = leaderboard.topScores.slice(0, 100);
      await leaderboard.save();

      const userRank = leaderboard.topScores.findIndex(
        (entry) => entry.userId.toString() === user._id.toString()
      );

      const leaderboardAchievements = [
        { rank: 100, achievement: achievements.TOP_100 },
        { rank: 50, achievement: achievements.TOP_50 },
        { rank: 10, achievement: achievements.TOP_10 },
        { rank: 3, achievement: achievements.TOP_3 },
      ];

      for (const { rank, achievement } of leaderboardAchievements) {
        if (userRank < rank) {
          const { success } = await addNewAchievement(userId, achievement);
          isGetAchievements = isGetAchievements || success;
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
      profileAvatarIndex: friend.profileAvatarIndex,
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
      profileAvatarIndex: user.profileAvatarIndex,
      score:
        user.scores?.[game]?.[gameMode] === -1
          ? 0
          : user.scores?.[game]?.[gameMode],
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
