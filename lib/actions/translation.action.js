"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import Translation from "@/database/translation.model";

export async function getTranslationAttemptsLeft({ userId }) {
  try {
    dbConnect();

    // Find the translation record for the user
    const translationRecord = await Translation.findOne({ userId });

    if (!translationRecord) {
      // If no translation record is found, create one with default values
      const newTranslationRecord = await Translation.create({
        userId,
        dailyLimit: 10,
        attemptsToday: 0,
        lastReset: new Date(),
      });

      await newTranslationRecord.save();

      return {
        attemptsLeft:
          newTranslationRecord.dailyLimit - newTranslationRecord.attemptsToday,
      };
    }

    // Check if the daily attempts need to be reset
    const now = new Date();
    const lastResetDate = new Date(translationRecord.lastReset);
    const isNewDay =
      now.getDate() !== lastResetDate.getDate() ||
      now.getMonth() !== lastResetDate.getMonth() ||
      now.getFullYear() !== lastResetDate.getFullYear();

    if (isNewDay) {
      translationRecord.attemptsToday = 0;
      translationRecord.lastReset = now;
      await translationRecord.save();
    }

    return {
      attemptsLeft:
        translationRecord.dailyLimit - translationRecord.attemptsToday,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateTranslationAttemptsLeft({ userId }) {
  try {
    dbConnect();

    // Fetch the user's translation record
    const translationRecord = await Translation.findOne({ userId });

    if (!translationRecord) {
      throw new NotFoundError();
    }

    // Check if the last reset date is from a previous day
    const now = new Date();
    const lastResetDate = new Date(translationRecord.lastReset);
    const isNewDay =
      now.getDate() !== lastResetDate.getDate() ||
      now.getMonth() !== lastResetDate.getMonth() ||
      now.getFullYear() !== lastResetDate.getFullYear();

    if (isNewDay) {
      // Reset attempts for the new day
      translationRecord.attemptsToday = 0;
      translationRecord.lastReset = now;
    }

    // Check if the user has remaining attempts
    if (translationRecord.attemptsToday >= translationRecord.dailyLimit) {
      throw new Error("Daily limit reached");
    }

    // Increment the attemptsToday count
    translationRecord.attemptsToday += 1;

    await translationRecord.save();

    return {
      attemptsLeft:
        translationRecord.dailyLimit - translationRecord.attemptsToday,
    };
  } catch (error) {
    return handleError(error);
  }
}
