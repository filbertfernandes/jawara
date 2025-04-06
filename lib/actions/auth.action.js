"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { SignInSchema, SignUpSchema } from "../validations";
import { createVerificationToken } from "./verificationToken.action";
import { sendVerificationEmail } from "../mail";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";

export async function signUpWithCredentials(params) {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    console.log("ERROR: Validation failed", validationResult);
    return handleError(validationResult);
  }

  const { name, username, email, password } = validationResult.params;

  const session = await mongoose.startSession();
  session.startTransaction();

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

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

    // Generate a verification token
    const verificationToken = await createVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    await session.commitTransaction();

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    console.log("ERROR: Transaction aborted", error);
    return handleError(error);
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(params) {
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

    if (!existingAccount.emailVerified) {
      console.log("ERROR: Email not verified", email);
      throw new Error("Email not verified");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!passwordMatch) {
      console.log("ERROR: Password does not match");
      throw new Error("Password does not match");
    }

    await signIn("credentials", {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    console.log("ERROR: Sign-in failed", error);
    return handleError(error);
  }
}

export async function resendVerificationToken(email) {
  try {
    // Generate a new verification token
    const verificationToken = await createVerificationToken(email);

    // Send verification email
    await sendVerificationEmail(email, verificationToken.token);

    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}
