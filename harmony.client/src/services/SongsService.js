// import { logger } from "firebase-functions/v1"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class SongsService {
  async getSongs() {
    const res = await api.get('api/songs')
    logger.log('songs', res.data)
    AppState.songs = res.data
    // logger.log(AppState.songs)
  }
  async createSong(body) {
    const res = await api.post('api/songs', body)
    logger.log(res.data)
    // AppState.songs = res.data
    AppState.songs.push(res.data)
    return res.data
  }

  async deleteSong(songId) {
    const res = await api.delete('api/songs/' + songId)
    logger.log(res.data, "song gone")
    AppState.activeSong = res.data
  }

  async findSongById(songId) {
    const res = await api.get('api/songs/' + songId)
    logger.log(res.data)
    AppState.activeSong = res.data
    // logger.log(AppState.activeSong)
  }

  async getSongsByAccountId(accountId) {
    const res = await api.get('api/profiles/' + accountId)
    logger.log(res.data)
    AppState.accountSongs = res.data
  }
}

export const songsService = new SongsService()
