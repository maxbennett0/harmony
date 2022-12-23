import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class SongsService {

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