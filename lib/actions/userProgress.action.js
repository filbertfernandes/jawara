"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import UserChapterProgress from "@/database/userProgress.model";

export async function createUserProgress(chapterId, userId) {
  try {
    await dbConnect();

    // Check if progress already exists
    const existingProgress = await UserChapterProgress.findOne({
      userId,
      chapterId,
    });

    if (existingProgress) {
      return {
        success: true,
        message: "User progress for this chapter already exists.",
        data: existingProgress,
      };
    }

    // Create new progress entry
    const newProgress = new UserChapterProgress({
      userId,
      chapterId,
      completedPhases: 0,
      preTestScore: -1,
      postTestScore: -1,
      preTestCompletedAt: null,
      postTestCompletedAt: null,
    });

    await newProgress.save();

    return {
      success: true,
      message: "User progress created successfully.",
      data: newProgress,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getUserProgress(chapterId, userId) {
  try {
    await dbConnect();

    // Find user progress for the specific chapter
    const progress = await UserChapterProgress.findOne({
      userId,
      chapterId,
    });
    if (!progress) {
      throw new NotFoundError("User Progress");
    }

    // Convert the Mongoose document to a plain object and handle special fields
    const plainProgress = progress.toObject();

    // Convert _id to a string
    plainProgress._id = plainProgress._id.toString();
    plainProgress.userId = plainProgress.userId.toString();

    return {
      success: true,
      data: plainProgress,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllUserProgress(userId) {
  try {
    await dbConnect();

    // Find all progress entries for the user
    const progressList = await UserChapterProgress.find({
      userId,
    });

    if (progressList.length === 0) {
      throw new NotFoundError("User Progress");
    }

    // Convert each Mongoose document to a plain object
    const plainProgressList = progressList.map((progress) => {
      const plainProgress = progress.toObject();
      plainProgress._id = plainProgress._id.toString();
      plainProgress.userId = plainProgress.userId.toString();
      return plainProgress;
    });

    return {
      success: true,
      data: plainProgressList,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function incrementCompletedPhases(chapterId, userId) {
  try {
    // Connect to the database
    await dbConnect();

    // Find the user's progress for the specific chapter
    const progress = await UserChapterProgress.findOne({
      userId,
      chapterId,
    });

    if (!progress) {
      throw new NotFoundError("User Progress");
    }

    // Increment the completedPhases field by 1
    progress.completedPhases += 1;

    // Save the updated progress
    await progress.save();

    return {
      success: true,
      message: "Completed phases incremented successfully.",
    };
  } catch (error) {
    return handleError(error); // Handle errors gracefully
  }
}

export async function updatePretestScore(chapterId, userId, newScore) {
  try {
    await dbConnect();

    // Find user progress for the specific chapter
    const progress = await UserChapterProgress.findOne({
      userId,
      chapterId,
    });

    if (!progress) {
      throw new NotFoundError("User Progress");
    }

    // Update the pre-test score and completion time
    progress.preTestScore = newScore;
    progress.preTestCompletedAt = new Date();

    await progress.save();

    return {
      success: true,
      message: "Pre-test score updated successfully.",
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function updatePosttestScore(chapterId, userId, newScore) {
  try {
    await dbConnect();

    // Find user progress for the specific chapter
    const progress = await UserChapterProgress.findOne({
      userId,
      chapterId,
    });

    if (!progress) {
      throw new NotFoundError("User Progress");
    }

    // Update the post-test score and completion time
    progress.postTestScore = newScore;
    progress.postTestCompletedAt = new Date();

    await progress.save();

    return {
      success: true,
      message: "Post-test score updated successfully.",
    };
  } catch (error) {
    return handleError(error);
  }
}
