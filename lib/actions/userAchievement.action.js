"use server";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

import UserAchievement from "@/database/userAchievement.model";

export async function addNewAchievement(userId, achievementId) {
  try {
    await dbConnect();

    // Find if the user already has a UserAchievement document
    let userAchievement = await UserAchievement.findOne({ userId });

    if (!userAchievement) {
      // If not, create a new one
      userAchievement = new UserAchievement({
        userId,
        achievements: [{ achievementId }],
      });
    } else {
      // If exists, check if the achievement already exists
      const alreadyHasAchievement = userAchievement.achievements.some(
        (achievement) => achievement.achievementId === achievementId
      );

      if (alreadyHasAchievement) {
        return {
          success: false,
          message: "User already has this achievement.",
          data: userAchievement,
        };
      }

      // If not, add the new achievement
      userAchievement.achievements.push({ achievementId });
    }

    await userAchievement.save();

    return {
      success: true,
      message: "Achievement added successfully.",
      data: userAchievement,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getUnseenAchievements(userId) {
  try {
    await dbConnect();

    // Find the UserAchievement document for the user
    const userAchievement = await UserAchievement.findOne({ userId });

    if (!userAchievement) {
      return {
        success: true,
        data: [],
      };
    }

    // Filter achievements that have not been seen
    const unseenAchievements = userAchievement.achievements.filter(
      (achievement) => !achievement.seen
    );

    // Get the achievementIds of unseen achievements
    const achievementIds = unseenAchievements.map(
      (achievement) => achievement.achievementId
    );

    // Mark all unseen achievements as seen
    userAchievement.achievements = userAchievement.achievements.map(
      (achievement) => ({
        ...achievement.toObject(),
        seen: true,
      })
    );

    await userAchievement.save();

    return {
      success: true,
      data: achievementIds,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllAchievementsByUserId(userId) {
  try {
    await dbConnect();

    // Find the UserAchievement document for the user
    const userAchievement = await UserAchievement.findOne({ userId });

    if (!userAchievement) {
      return {
        success: true,
        data: [],
      };
    }

    // Get all achievementIds
    const achievementIds = userAchievement.achievements.map(
      (achievement) => achievement.achievementId
    );

    return {
      success: true,
      data: achievementIds,
    };
  } catch (error) {
    return handleError(error);
  }
}
