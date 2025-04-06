import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export async function POST(request) {
  try {
    const { providerAccountId } = await request.json();

    await dbConnect();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success) {
      console.error(
        "ERROR: Validation failed",
        validatedData.error.flatten().fieldErrors
      );
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const account = await Account.findOne({ providerAccountId });
    if (!account) {
      console.error("ERROR: Account not found");
      throw new NotFoundError("Account");
    }

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "ERROR: An error occurred while processing account request",
      error
    );
    return handleError(error, "api");
  }
}
