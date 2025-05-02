import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    totalCorrectTranslations: { type: Number, default: 0 },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    profileAvatarIndex: { type: String, default: "0" },
    scores: {
      game1: {
        ngoko: {
          type: Number,
          default: -1,
        },
        madya: {
          type: Number,
          default: -1,
        },
        alus: {
          type: Number,
          default: -1,
        },
      },
      game2: {
        ngoko: {
          type: Number,
          default: -1,
        },
        madya: {
          type: Number,
          default: -1,
        },
        alus: {
          type: Number,
          default: -1,
        },
      },
      game3: {
        ngoko: {
          type: Number,
          default: -1,
        },
        madya: {
          type: Number,
          default: -1,
        },
        alus: {
          type: Number,
          default: -1,
        },
      },
      game4: {
        ngoko: {
          type: Number,
          default: -1,
        },
        madya: {
          type: Number,
          default: -1,
        },
        alus: {
          type: Number,
          default: -1,
        },
      },
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
