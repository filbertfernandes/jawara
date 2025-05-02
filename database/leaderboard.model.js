import { Schema, models, model } from "mongoose";

const LeaderboardSchema = new Schema(
  {
    game: { type: String, required: true }, // e.g., "game1"
    gameMode: { type: String, required: true }, // e.g., "ngoko", "madya", "alus"
    topScores: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
        score: { type: Number, required: true }, // User's score
      },
    ],
  },
  { timestamps: true }
);

const Leaderboard =
  models?.Leaderboard || model("Leaderboard", LeaderboardSchema);

export default Leaderboard;
