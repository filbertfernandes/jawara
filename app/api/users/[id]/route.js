import { NextResponse } from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";

// GET /api/users/[id]
export async function GET(_, { params }) {
  const { id } = await params;
  if (!id) {
    console.error("ERROR: User ID not provided");
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      console.error(`ERROR: User with ID ${id} not found`);
      throw new NotFoundError("User");
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("ERROR: An error occurred while fetching user", error);
    return handleError(error, "api");
  }
}

// DELETE /api/users/[id]
export async function DELETE(_, { params }) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api");
  }
}

// PUT /api/users/[id]
export async function PUT(request, { params }) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = UserSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api");
  }
}
