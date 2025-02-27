import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    totalCorrectTranslations: { type: Number, default: 0 },
    scores: {
      game1: {
        ngoko: {
          type: Number,
          default: 0,
        },
        madya: {
          type: Number,
          default: 0,
        },
        alus: {
          type: Number,
          default: 0,
        },
      },
      game2: {
        ngoko: {
          type: Number,
          default: 0,
        },
        madya: {
          type: Number,
          default: 0,
        },
        alus: {
          type: Number,
          default: 0,
        },
      },
      game3: {
        ngoko: {
          type: Number,
          default: 0,
        },
        madya: {
          type: Number,
          default: 0,
        },
        alus: {
          type: Number,
          default: 0,
        },
      },
      game4: {
        ngoko: {
          type: Number,
          default: 0,
        },
        madya: {
          type: Number,
          default: 0,
        },
        alus: {
          type: Number,
          default: 0,
        },
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
