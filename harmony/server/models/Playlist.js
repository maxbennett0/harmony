import { Schema } from "mongoose";





export const PlaylistSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  coverImg: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


PlaylistSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})