import { Schema } from "mongoose";








export const FollowerSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  followingId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
})