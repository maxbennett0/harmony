import { logger } from "firebase-functions/v1"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class SongsService {
  async getSongs() {
    const res = await api.get('api/songs')
    logger.log('songs', res.data)
    AppState.songs = res.data
    logger.log(AppState.songs)
  }
}

export const songsService = new SongsService()
