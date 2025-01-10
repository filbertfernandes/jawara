"use server";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

import UserChapterProgress from "@/database/userChapterProgress.model";

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
        success: false,
        message: "User progress for this chapter already exists.",
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
      return {
        success: false,
        message: "No progress found for this chapter.",
      };
    }

    return {
      success: true,
      data: progress,
    };
  } catch (error) {
    return handleError(error);
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
      return {
        success: false,
        message: "User progress not found for this chapter.",
      };
    }

    // Update the pre-test score and completion time
    progress.preTestScore = newScore;
    progress.preTestCompletedAt = new Date();

    await progress.save();

    return {
      success: true,
      message: "Pre-test score updated successfully.",
      data: progress,
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
      return {
        success: false,
        message: "User progress not found for this chapter.",
      };
    }

    // Update the post-test score and completion time
    progress.postTestScore = newScore;
    progress.postTestCompletedAt = new Date();

    await progress.save();

    return {
      success: true,
      message: "Post-test score updated successfully.",
      data: progress,
    };
  } catch (error) {
    return handleError(error);
  }
}
