import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class SongsService {
  // NOTE gets the uploaded songs on profile
  async getMySongs(artistId) {
    const mySongs = await dbContext.Songs.find({ artistId }).populate('song')
    return mySongs
  }
  // NOTE gets the uploaded songs
  async getSongsByProfileId(songId) {
    const songs = await dbContext.Songs.findById(songId)
    return songs
  }
  // NOTE gets one song
  async findSongById(id) {
    const song = await dbContext.Songs.findById(id).populate('artist')
    return song
  }
  // NOTE also gets the uploaded songs?

  async findSongsByAccountId() {
    const song = await dbContext.Songs.find().populate('song artist')
    return song
  }
  // NOTE deletes a song
  async removeSong(id, userId) {
    const song = await this.findSongById(id)
    // @ts-ignore
    if (song.artistId.toString() != userId) throw new Forbidden('not your song dawg')
    await song.remove()
    return `deleted ${song.name}`
    // const songs = await dbContext.Songs.findById(id)
    // // @ts-ignore
    // await songs.remove()
    // // await songs.save()
    // return "gone song"

  }

  // NOTE gets all the songs
  async getSongs() {
    const songs = await dbContext.Songs.find().populate('artist')
    return songs
  }
  // NOTE makes a new song

  async createSong(body) {
    const song = await (await dbContext.Songs.create(body)).populate('artist')
    logger.log(song, "created song")
    return song
  }
  // async getMySongs() {

  // }
}


export const songsService = new SongsService()