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
    AppState.activeSong.streams++

    logger.log(AppState.activeSong.streams, songId, 'streams')
    // logger.log(AppState.activeSong)
  }

  async searchSongs(search) {
    const res = await api.get('api/songs/', { params: search })
    AppState.songs = res.data
  }


  async getSongsByAccountId(accountId) {
    const res = await api.get('api/profiles/' + accountId)
    logger.log(res.data)
    AppState.accountSongs = res.data
  }

  async getMySongs(artistId) {
    const res = await api.get('api/songs/' + artistId + "/profile")
    logger.log('[MY SONGS]', res.data)
    AppState.mySongs = res.data
  }
}

export const songsService = new SongsService()
