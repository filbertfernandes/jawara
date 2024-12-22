import { Schema, models, model } from "mongoose";

const TranslationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
    dailyLimit: { type: Number, default: 10 }, // Daily limit of attempts
    attemptsToday: { type: Number, default: 0 }, // Number of attempts made today
    lastReset: { type: Date, default: Date.now }, // Timestamp of when the limit was last reset
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
TranslationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Translation =
  models?.Translation || model("Translation", TranslationSchema);

export default Translation;
