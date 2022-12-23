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
}

export const songsService = new SongsService()
