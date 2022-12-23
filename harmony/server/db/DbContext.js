import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { SongSchema } from "../models/Song.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Songs = mongoose.model('Song', SongSchema);

  // songs = [
  // ]
}

export const dbContext = new DbContext()
