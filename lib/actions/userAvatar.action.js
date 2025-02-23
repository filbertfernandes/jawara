"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import UserAvatar from "@/database/userAvatar.model";

export async function createOrUpdateUserAvatar({ userId, avatar }) {
  try {
    await dbConnect();

    // Upsert: If user avatar exists, update it; otherwise, create a new one
    const updatedAvatar = await UserAvatar.findOneAndUpdate(
      { userId }, // Find user by userId
      { avatar }, // Update avatar field
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean(); // Convert to plain object to prevent circular references

    return {
      success: true,
      message: "Your 3D avatar has been saved.",
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getUserAvatar({ userId }) {
  try {
    await dbConnect();

    // Find user avatar
    const avatar = await UserAvatar.findOne({ userId });
    if (!avatar) {
      throw new NotFoundError("User Avatar");
    }

    // Convert the Mongoose document to a plain object
    const plainAvatar = avatar.toObject();
    plainAvatar._id = plainAvatar._id.toString();
    plainAvatar.userId = plainAvatar.userId.toString();

    // Ensure avatar items have plain data
    if (Array.isArray(plainAvatar.avatar)) {
      plainAvatar.avatar = plainAvatar.avatar.map((item) => ({
        ...item,
        _id: item._id.toString(), // Convert ObjectId to string
      }));
    }

    return {
      success: true,
      data: plainAvatar,
    };
  } catch (error) {
    return handleError(error);
  }
}
