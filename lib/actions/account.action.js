"use server";

import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

import Account from "@/database/account.model";

export async function getCredentialAccount(email) {
  try {
    await dbConnect();

    // Find account with provider "credentials" and matching providerAccountId (email)
    const account = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!account) {
      throw new NotFoundError("Account");
    }

    // Convert the Mongoose document to a plain object
    const plainAccount = account.toObject();
    plainAccount._id = plainAccount._id.toString();
    plainAccount.userId = plainAccount.userId.toString();

    return {
      success: true,
      data: plainAccount,
    };
  } catch (error) {
    return handleError(error);
  }
}
