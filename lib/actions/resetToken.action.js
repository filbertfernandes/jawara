"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { sendResetPasswordEmail } from "../mail";
import dbConnect from "../mongoose";

import Account from "@/database/account.model";
import ResetToken from "@/database/resetToken.model";

export async function createAndSendResetToken(email) {
  try {
    await dbConnect();

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!existingAccount) {
      throw new NotFoundError("Account");
    }

    // Generate a random token and set expiration time (1 hour from now)
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

    // Check if a verification token already exists for this email
    const existingToken = await ResetToken.findOne({ email });

    // If an existing token is found, delete it
    if (existingToken) {
      await ResetToken.deleteOne({ email });
    }

    // Create a new verification token
    await ResetToken.create({
      email,
      token,
      expires,
    });

    await sendResetPasswordEmail(email, token);

    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}

export async function resetPassword(resetPasswordToken, newPassword) {
  try {
    const existingToken = await ResetToken.findOne({
      token: resetPasswordToken,
    });

    if (!existingToken) {
      throw new Error("Invalid token");
    }

    if (new Date(existingToken.expires) < new Date()) {
      throw new Error("Token has expired");
    }

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: existingToken.email,
    });

    if (!existingAccount) {
      throw new NotFoundError("Account");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    existingAccount.password = hashedPassword;

    await existingAccount.save();

    await ResetToken.deleteOne({ token: resetPasswordToken });

    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}
