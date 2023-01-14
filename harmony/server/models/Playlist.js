import { Schema } from "mongoose";





export const PlaylistSchema = new Schema({
  artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  coverImg: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


PlaylistSchema.virtual('artist', {
  localField: 'artistId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})