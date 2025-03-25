"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import FriendRequest from "@/database/friendRequest.model";
import User from "@/database/user.model";

export async function removeFriend(userId, friendId) {
  try {
    await dbConnect();

    // Ensure both users exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      throw new NotFoundError("User");
    }

    // Remove friendId from user's friend list
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    // Remove userId from friend's friend list
    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    return { success: true, message: "Friend removed successfully." };
  } catch (error) {
    return handleError(error);
  }
}

export async function getFriendRequest(userId) {
  try {
    await dbConnect();

    // Get only the "sender" field, populate it with "name"
    const friendRequests = await FriendRequest.find(
      { receiver: userId },
      "sender" // Get only sender field
    )
      .populate("sender", "name username") // Populate sender's name
      .lean(); // Convert to plain JS objects

    // Convert ObjectId to string
    const formattedRequests = friendRequests.map((req) => ({
      _id: req._id.toString(), // Convert ObjectId to string
      sender: {
        _id: req.sender._id.toString(), // Convert sender's ObjectId to string
        name: req.sender.name, // Keep sender's name
        username: req.sender.username, // Keep sender's username
      },
    }));

    return { success: true, friendRequests: formattedRequests };
  } catch (error) {
    return handleError(error);
  }
}

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
    await User.findByIdAndUpdate(
      sender,
      { $addToSet: { friends: receiver } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      receiver,
      { $addToSet: { friends: sender } },
      { new: true }
    );

    // Remove the friend request after accepting
    await FriendRequest.findByIdAndDelete(friendRequestId);

    return { success: true, message: "Friend request accepted." };
  } catch (error) {
    return handleError(error);
  }
}

export async function rejectFriendRequest(friendRequestId) {
  try {
    await dbConnect();

    // Find and delete the friend request
    const request = await FriendRequest.findByIdAndDelete(friendRequestId);
    if (!request) {
      throw new NotFoundError("Friend Request");
    }

    return { success: true, message: "Friend request rejected." };
  } catch (error) {
    return handleError(error);
  }
}

export async function removeFriendRequest(friendRequestId) {
  try {
    await dbConnect();

    // Find and delete the friend request
    const request = await FriendRequest.findByIdAndDelete(friendRequestId);
    if (!request) {
      throw new NotFoundError("Friend Request");
    }

    return { success: true, message: "Friend request removed." };
  } catch (error) {
    return handleError(error);
  }
}

export async function getFriendStatus(userId, profileUserId) {
  try {
    await dbConnect();

    // Fetch the user's friends and sent/received friend requests
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User");
    }

    const friendRequest = await FriendRequest.findOne(
      {
        $or: [
          { sender: userId, receiver: profileUserId }, // Sent request
          { sender: profileUserId, receiver: userId }, // Received request
        ],
      },
      "_id receiver"
    );

    const isFriend = !!user.friends?.includes(profileUserId);
    const isFriendRequest = !!friendRequest;
    const isRequestReceiver = !!(friendRequest?.receiver.toString() === userId);

    const result = {
      isFriend,
      isFriendRequest,
      isRequestReceiver,
      friendRequestId: friendRequest?._id?.toString() || null,
      friendsCount: user.friends.length,
    };

    return result;
  } catch (error) {
    return handleError(error);
  }
}
