import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    totalCorrectTranslations: { type: Number, default: 0 },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    scores: {
      game1: {
        ngoko: Number,
        madya: Number,
        alus: Number,
      },
      game2: {
        ngoko: Number,
        madya: Number,
        alus: Number,
      },
      game3: {
        ngoko: Number,
        madya: Number,
        alus: Number,
      },
      game4: {
        ngoko: Number,
        madya: Number,
        alus: Number,
      },
    },
  },
  { timestamps: true }
);

// Automatically update the 'updatedAt' field on save
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = models?.User || model("User", UserSchema);

export default User;
