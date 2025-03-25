"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import FriendRequest from "@/database/friendRequest.model";
import User from "@/database/user.model";

export async function addFriendRequest(senderId, receiverId) {
  try {
    await dbConnect();

    // Ensure sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      throw new NotFoundError("User");
    }

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (existingRequest) {
      throw new Error("Friend request already sent.");
    }

    // Create and save the friend request
    const newRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });
    await newRequest.save();

    return { success: true, message: "Friend request sent." };
  } catch (error) {
    return handleError(error);
  }
}

export async function acceptFriendRequest(friendRequestId) {
  try {
    await dbConnect();

    // Find the friend request
    const request = await FriendRequest.findById(friendRequestId);
    if (!request) {
      throw new NotFoundError("Friend Request");
    }

    const { sender, receiver } = request;

    // Add each other as friends
    await User.findByIdAndUpdate(sender, { $addToSet: { friends: receiver } });
    await User.findByIdAndUpdate(receiver, { $addToSet: { friends: sender } });

    // Remove the friend request after accepting
    await FriendRequest.findByIdAndDelete(friendRequestId);

    return { success: true, message: "Friend request accepted." };
  } catch (error) {
    return handleError(error);
  }
}

export async function declineFriendRequest(friendRequestId) {
  try {
    await dbConnect();

    // Find and delete the friend request
    const request = await FriendRequest.findByIdAndDelete(friendRequestId);
    if (!request) {
      throw new NotFoundError("Friend Request");
    }

    return { success: true, message: "Friend request declined." };
  } catch (error) {
    return handleError(error);
  }
}

export async function getFriendStatus(userId, profileUserId) {
  try {
    await dbConnect();

    // Fetch the user's friends and sent/received friend requests
    const user = await User.findById(userId);
    const friendRequest = await FriendRequest.findOne({
      $or: [
        { sender: userId, receiver: profileUserId }, // Sent request
        { sender: profileUserId, receiver: userId }, // Received request
      ],
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    const isFriend = !!user.friends?.includes(profileUserId);
    const isFriendRequest = !!friendRequest;
    const isRequestReceiver = !!friendRequest?.receiver.toString() === userId;

    return {
      isFriend,
      isFriendRequest,
      isRequestReceiver,
    };
  } catch (error) {
    return handleError(error);
  }
}
