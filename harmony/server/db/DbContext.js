import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment.js";
import { FollowerSchema } from '../models/Follower.js';
import { LikeSchema } from '../models/Like.js';
import { PlaylistSchema } from "../models/Playlist.js";
import { SongSchema } from "../models/Song.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Songs = mongoose.model('Song', SongSchema);
  Comments = mongoose.model('Comment', CommentSchema);

  Followers = mongoose.model('Follower', FollowerSchema)
  Likes = mongoose.model('Like', LikeSchema);

  Playlist = mongoose.model('Playlist', PlaylistSchema)
  // songs = [
  // ]
}

export const dbContext = new DbContext()
