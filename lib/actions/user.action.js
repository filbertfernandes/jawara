"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";
import { addNewAchievement } from "./userAchievement.action";

import { achievements } from "@/constants/achievements";
import User from "@/database/user.model";

export async function getUser(userId) {
  try {
    await dbConnect();

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User");
    }

    // Convert the Mongoose document to a plain object
    const plainUser = user.toObject();
    plainUser._id = plainUser._id.toString();

    // Ensure friends are plain strings
    plainUser.friends =
      plainUser.friends?.map((friend) => friend.toString()) || [];

    return {
      success: true,
      data: plainUser,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getUsers({ search, page, pageSize }) {
  try {
    await dbConnect();

    const skipAmount = (page - 1) * pageSize;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { username: { $regex: new RegExp(search, "i") } },
      ];
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ name: 1 })
      .lean();

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / pageSize);

    // Convert ObjectId and Date fields to plain values
    const formattedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
      friends: user.friends?.map((friend) => friend.toString()) || [], // Convert friends to plain strings
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return { users: formattedUsers, totalPages };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateUser(userId, name, username, profileAvatarIndex) {
  try {
    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, profileAvatarIndex },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundError("User");
    }

    // Convert to plain object and ensure _id and friends are strings
    const plainUser = updatedUser.toObject();
    plainUser._id = plainUser._id.toString();
    plainUser.friends =
      plainUser.friends?.map((friend) => friend.toString()) || [];

    return { success: true, data: plainUser };
  } catch (error) {
    return handleError(error);
  }
}

export async function getTotalCorrectTranslations(userId) {
  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId).select("totalCorrectTranslations");

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      totalCorrectTranslations: user.totalCorrectTranslations,
    };
  } catch (error) {
    console.error("Error fetching totalCorrectTranslations:", error);
    return { success: false, error: error.message };
  }
}

export async function incrementCorrectTranslations(userId) {
  try {
    await dbConnect();

    let isGetAchievements = false;

    // Increment totalCorrectTranslations and get the updated value
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalCorrectTranslations: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const { totalCorrectTranslations } = updatedUser;

    // Define achievement milestones
    const translationMilestones = {
      1: achievements.CORRECT_TRANSLATIONS_1,
      25: achievements.CORRECT_TRANSLATIONS_25,
      100: achievements.CORRECT_TRANSLATIONS_100,
      250: achievements.CORRECT_TRANSLATIONS_250,
      500: achievements.CORRECT_TRANSLATIONS_500,
      1000: achievements.CORRECT_TRANSLATIONS_1000,
    };

    // Check if the user qualifies for an achievement
    if (translationMilestones[totalCorrectTranslations]) {
      const { success } = await addNewAchievement(
        userId,
        translationMilestones[totalCorrectTranslations]
      );
      isGetAchievements = success;
    }

    return {
      success: true,
      totalCorrectTranslations,
      isGetAchievements,
    };
  } catch (error) {
    console.error("Error updating totalCorrectTranslations:", error);
    return { success: false, error: error.message };
  }
}
