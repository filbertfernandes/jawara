import { Schema, models, model } from "mongoose";

const FriendRequestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the request
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who receives the request
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
FriendRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const FriendRequest =
  models?.FriendRequest || model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
