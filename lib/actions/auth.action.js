"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { SignInSchema, SignUpSchema } from "../validations";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";

export async function signUpWithCredentials(params) {
  console.log("INFO: signUpWithCredentials called with params", params);
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    console.log("ERROR: Validation failed", validationResult);
    return handleError(validationResult);
  }

  const { name, username, email, password } = validationResult.params;

  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("INFO: MongoDB transaction started");

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      console.log("ERROR: User already exists", email);
      throw new Error("User already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      console.log("ERROR: Username already exists", username);
      throw new Error("Username already exists");
    }

    console.log("INFO: Hashing password");
    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });
    console.log("INFO: New user created", newUser);

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    console.log("INFO: Account created for user", newUser._id);

    await session.commitTransaction();
    console.log("INFO: Transaction committed successfully");

    await signIn("credentials", { email, password, redirect: false });
    console.log("INFO: User signed in successfully");

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    console.log("ERROR: Transaction aborted", error);
    return handleError(error);
  } finally {
    await session.endSession();
    console.log("INFO: MongoDB session ended");
  }
}

export async function signInWithCredentials(params) {
  console.log("INFO: signInWithCredentials called with params", params);
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    console.log("ERROR: Validation failed", validationResult);
    return handleError(validationResult);
  }

  const { email, password } = validationResult.params;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("ERROR: User not found", email);
      throw new NotFoundError("User");
    }

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) {
      console.log("ERROR: Account not found", email);
      throw new NotFoundError("Account");
    }

    console.log("INFO: Comparing password");
    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!passwordMatch) {
      console.log("ERROR: Password does not match");
      throw new Error("Password does not match");
    }

    await signIn("credentials", { email, password, redirect: false });
    console.log("INFO: User signed in successfully");

    return { success: true };
  } catch (error) {
    console.log("ERROR: Sign-in failed", error);
    return handleError(error);
  }
}
