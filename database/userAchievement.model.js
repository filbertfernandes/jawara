import { Schema, models, model } from "mongoose";

const UserAchievementSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    achievements: [
      {
        achievementId: { type: String, required: true },
        earnedAt: { type: Date, default: Date.now },
        seen: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const UserAchievement =
  models?.UserAchievement || model("UserAchievement", UserAchievementSchema);

export default UserAchievement;
