import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log("INFO: Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("INFO: Connecting to MongoDB");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "jawara",
      })
      .then((result) => {
        console.log("INFO: Successfully connected to MongoDB");
        return result;
      })
      .catch((error) => {
        console.error("ERROR: Error connecting to MongoDB", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
