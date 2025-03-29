import { Schema, models, model } from "mongoose";

const UserAchievementSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    achievementId: { type: String, required: true, unique: true }, // Unique achievement ID
    earnedAt: { type: Date, default: Date.now }, // Timestamp when achievement was earned
    seen: { type: Boolean, default: false }, // Whether the user has seen the achievement notification
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
UserAchievementSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserAchievement =
  models?.UserAchievement || model("UserAchievement", UserAchievementSchema);

export default UserAchievement;
