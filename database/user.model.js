import { Schema, models, model } from "mongoose"

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, required: true },
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
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Automatically update the 'updatedAt' field on save
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const User = models?.User || model("User", UserSchema)

export default User
