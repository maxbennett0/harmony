import { dbContext } from "../db/DbContext.js"


class SongsService {
  getSongs() {
    const songs = dbContext.songs
    return songs
  }
}

export const songsService = new SongsService()