"use server";

import dbConnect from "../mongoose";

import User from "@/database/user.model";

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

    // Find the user and increment totalCorrectTranslations
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalCorrectTranslations: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return {
      success: true,
      totalCorrectTranslations: updatedUser.totalCorrectTranslations,
    };
  } catch (error) {
    console.error("Error updating totalCorrectTranslations:", error);
    return { success: false, error: error.message };
  }
}
