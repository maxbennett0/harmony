import { Schema } from "mongoose";


export const SongSchema = new Schema({
  // id: { type: String, required: true, ref: '_id' },
  artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  coverImg: { type: String, required: true },
  genre: { type: String },
  songUrl: { type: String, required: true },
  streams: { type: Number },
})