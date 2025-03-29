"use server";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

import UserAchievement from "@/database/userAchievement.model";

export async function addNewAchievement(userId, achievementId) {
  try {
    await dbConnect();

    // Check if the user already has this achievement
    const existingAchievement = await UserAchievement.findOne({
      userId,
      achievementId,
    });
    if (existingAchievement) {
      return {
        success: false,
        message: "User already has this achievement.",
        data: existingAchievement,
      };
    }

    // Create new achievement entry
    const newAchievement = new UserAchievement({
      userId,
      achievementId,
      seen: false,
    });

    await newAchievement.save();

    return {
      success: true,
      message: "Achievement added successfully.",
      data: newAchievement,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getUnseenAchievements(userId) {
  try {
    await dbConnect();

    // Find unseen achievements for the user
    const unseenAchievements = await UserAchievement.find({
      userId,
      seen: false,
    });

    // Extract achievementId values into an array
    const achievementIds = unseenAchievements.map(
      (achievement) => achievement.achievementId
    );

    // Mark all unseen achievements as seen
    await UserAchievement.updateMany({ userId, seen: false }, { seen: true });

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

    // Find all achievements for the user and return only achievementId
    const achievementIds = await UserAchievement.find({ userId }).distinct(
      "achievementId"
    );

    return {
      success: true,
      data: achievementIds,
    };
  } catch (error) {
    return handleError(error);
  }
}
