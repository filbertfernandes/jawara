"use server";

import { v4 as uuidv4 } from "uuid";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

import Account from "@/database/account.model";
import VerificationToken from "@/database/verificationToken.model";

export async function createVerificationToken(email) {
  try {
    await dbConnect();

    // Generate a random token and set expiration time (1 hour from now)
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

    // Check if a verification token already exists for this email
    const existingToken = await VerificationToken.findOne({ email });

    // If an existing token is found, delete it
    if (existingToken) {
      await VerificationToken.deleteOne({ email });
    }

    // Create a new verification token
    const verificationToken = await VerificationToken.create({
      email,
      token,
      expires,
    });

    return verificationToken;
  } catch (error) {
    return handleError(error);
  }
}

export async function newVerification(token) {
  try {
    await dbConnect();

    // Find the verification token by token value
    const existingToken = await VerificationToken.findOne({ token });

    if (!existingToken) {
      throw new Error("Invalid token");
    }

    // Check if the token has expired
    if (new Date(existingToken.expires) < new Date()) {
      throw new Error("Token has expired");
    }

    // Find the account by email with provider "credentials"
    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: existingToken.email,
    });

    if (!existingAccount) {
      throw new Error("Account not found");
    }

    // Update the account's email verification status
    existingAccount.emailVerified = new Date();
    await existingAccount.save();

    // Delete the used verification token
    await VerificationToken.deleteOne({ token });

    return { success: true, data: existingToken.email };
  } catch (error) {
    return handleError(error);
  }
}
