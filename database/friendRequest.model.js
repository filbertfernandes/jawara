import { Schema, models, model } from "mongoose";

const FriendRequestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the request
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who receives the request
  },
  { timestamps: true }
);

const FriendRequest =
  models?.FriendRequest || model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
