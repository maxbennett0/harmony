import { Schema } from "mongoose";






export const PlaylistSongSchema = new Schema({
  songId: { type: Schema.Types.ObjectId, required: true, ref: 'Song' },
  playlistId: { type: Schema.Types.ObjectId, required: true, ref: 'Playlist' }
}, { timestamps: true, toJSON: { virtuals: true } })