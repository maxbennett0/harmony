import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class SongsService {
  async findSongById(id) {
    const song = await dbContext.Songs.findById(id)
    return song
  }
  async removeSong(id, userId) {
    const song = await this.findSongById(id)
    if (song.artistId.toString() != userId) throw new Forbidden('not your song dawg')
    await song.remove()
    return `deleted ${song.name}`
    // const songs = await dbContext.Songs.findById(id)
    // // @ts-ignore
    // await songs.remove()
    // // await songs.save()
    // return "gone song"

  }

  async getSongs() {
    const songs = await dbContext.Songs.find()
    return songs
  }

  async createSong(body) {
    const song = await dbContext.Songs.create(body)
    logger.log(song, "created song")
    return song
  }
}

export const songsService = new SongsService()