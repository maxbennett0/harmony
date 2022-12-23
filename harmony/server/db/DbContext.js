import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { SongSchema } from "../models/Song.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Song = mongoose.model('Song', SongSchema);

  songs = [
    {
      name: 'maxbeats',
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/harmony-ad9d7.appspot.com/o/Media%2Fsoudiereafter.mp3?alt=media&token=c8484690-59ea-4268-9b19-5f6c8c4e8436',
      imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fscary%2F&psig=AOvVaw2Nk4ep4hSOgyXj39AsQsNd&ust=1671846455453000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCIjPhsHPjvwCFQAAAAAdAAAAABAE'
    },
    {
      name: 'maxbeats2',
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/harmony-ad9d7.appspot.com/o/Media%2Funtitled2.mp3?alt=media&token=a3694e4b-1e11-4dcf-888b-a8105349eaae',
      imgUrl: 'https://thiscatdoesnotexist.com'
    },
    {
      name: 'maxbeats3',
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/harmony-ad9d7.appspot.com/o/Media%2Funtitled2.mp3?alt=media&token=a3694e4b-1e11-4dcf-888b-a8105349eaae',
      imgUrl: 'https://thiscatdoesnotexist.com'
    },
    {
      name: 'maxbeats4',
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/harmony-ad9d7.appspot.com/o/Media%2Fsoudiereafter.mp3?alt=media&token=c8484690-59ea-4268-9b19-5f6c8c4e8436',
      imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fscary%2F&psig=AOvVaw2Nk4ep4hSOgyXj39AsQsNd&ust=1671846455453000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCIjPhsHPjvwCFQAAAAAdAAAAABAE'
    },
  ]
}

export const dbContext = new DbContext()
