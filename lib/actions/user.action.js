"use server";

import dbConnect from "../mongoose";

import User from "@/database/user.model";

export async function incrementCorrectTranslations(userId) {
  try {
    // Ensure database connection
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
