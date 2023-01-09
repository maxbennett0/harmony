import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from '../AppState.js'

class LikesService {
    async likeSong(songId) {
        const res = await api.post('api/likes', songId)
        logger.log('creating like', res.data)
        AppState.likes.push(res.data)
        AppState.activeSong.isLiked = true
        logger.log(AppState.likes)
    }
    async removeLike(likeId) {
        const res = await api.delete('api/likes/' + likeId)
        logger.log(res.data)
        AppState.likes = AppState.likes.filter(t => t.id !== likeId)
        AppState.activeSong.isLiked = false
        return res
    }
}

export const likesService = new LikesService()