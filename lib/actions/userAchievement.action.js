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
        success: true,
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
    }).populate("achievementId");

    return {
      success: true,
      data: unseenAchievements,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function markAchievementsAsSeen(userId) {
  try {
    await dbConnect();

    // Update all unseen achievements to seen
    await UserAchievement.updateMany({ userId, seen: false }, { seen: true });

    return {
      success: true,
      message: "All achievements marked as seen.",
    };
  } catch (error) {
    return handleError(error);
  }
}
