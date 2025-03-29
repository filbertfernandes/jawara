import { Schema, models, model } from "mongoose";

const UserChapterProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    chapterId: { type: Number, required: true }, // Chapter ID from the curriculum
    completedPhases: { type: Number, default: 0 }, // Number of completed phases
    preTestScore: { type: Number, default: -1 }, // Default -1 if not taken
    postTestScore: { type: Number, default: -1 }, // Default -1 if not taken
    preTestCompletedAt: { type: Date, default: null }, // Timestamp for pre-test completion
    postTestCompletedAt: { type: Date, default: null }, // Timestamp for post-test completion
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
UserChapterProgressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserChapterProgress =
  models?.UserChapterProgress ||
  model("UserChapterProgress", UserChapterProgressSchema);

export default UserChapterProgress;
