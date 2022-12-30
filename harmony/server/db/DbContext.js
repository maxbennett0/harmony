import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment.js";
import { SongSchema } from "../models/Song.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Songs = mongoose.model('Song', SongSchema);
  Comments = mongoose.model('Comment', CommentSchema)

  // songs = [
  // ]
}

export const dbContext = new DbContext()
