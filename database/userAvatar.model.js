import { Schema, models, model } from "mongoose";

const UserAvatarSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    avatar: [
      {
        groupId: { type: String, required: true }, // Group identifier for customization
        startingAsset: { type: String, default: null }, // Default asset selection
        startingColorIndex: { type: Number, default: null }, // Optional color index
      },
    ],
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
UserAvatarSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserAvatar = models?.UserAvatar || model("UserAvatar", UserAvatarSchema);

export default UserAvatar;
