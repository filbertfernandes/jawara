import { model, models, Schema } from "mongoose";

const ResetTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

// Ensure unique constraint on [email, token]
ResetTokenSchema.index({ email: 1, token: 1 }, { unique: true });

const ResetToken = models?.ResetToken || model("ResetToken", ResetTokenSchema);

export default ResetToken;
