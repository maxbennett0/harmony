import { Schema } from "mongoose";



export const LikeSchema = new Schema({
    songId: { type: Schema.Types.ObjectId, required: true, ref: "Song" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }

}, { timestamps: true, toJSON: { virtuals: true } })


LikeSchema.virtual('artist', {
    localField: 'accountId',
    ref: "Account",
    foreignField: '_id',
    justOne: true
})

LikeSchema.virtual('song', {
    localField: 'songId',
    ref: "Song",
    foreignField: '_id',
    justOne: true
})




