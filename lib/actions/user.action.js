"use server";

import { revalidatePath } from "next/cache";

import dbConnect from "../mongoose";

import Leaderboard from "@/database/leaderboard.model";
import User from "@/database/user.model";

export async function getUserById(params) {
  try {
    dbConnect();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    dbConnect();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params) {
  try {
    dbConnect();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params) {
  try {
    dbConnect();

    const { clerkId } = params;

    // Find and delete the user
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Remove the user's scores from all leaderboard documents
    await Leaderboard.updateMany(
      { "topScores.userId": user._id }, // Find all leaderboard documents with the userId
      { $pull: { topScores: { userId: user._id } } } // Remove the user from topScores array
    );

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
