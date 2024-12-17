"use server";

import { ZodError } from "zod";

import { UnauthorizedError, ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

import { auth } from "@/auth";

async function action({ params, schema, authorize = false }) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(error.flatten().fieldErrors);
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
