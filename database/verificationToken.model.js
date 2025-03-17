import { model, models, Schema } from "mongoose";

const VerificationTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

// Ensure unique constraint on [email, token]
VerificationTokenSchema.index({ email: 1, token: 1 }, { unique: true });

const VerificationToken =
  models?.VerificationToken ||
  model("VerificationToken", VerificationTokenSchema);

export default VerificationToken;
