import { Schema } from "mongoose";









export const CommentSchema = new Schema({
  songId: { type: Schema.Types.ObjectId, required: true, ref: 'Song' },
  body: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })





CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})


CommentSchema.virtual('song', {
  localField: 'songId',
  ref: 'Song',
  foreignField: '_id',
  justOne: true
})

CommentSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})