import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from '../AppState.js'

class LikesService {
    async likeSong(songId) {
        const res = await api.post('api/likes', songId)
        logger.log('creating like', res.data)
        AppState.likes.push(res.data)
        AppState.myLikes.push(res.data)
        AppState.activeSong.isLiked = true
        logger.log(AppState.likes)
    }
    async removeLike(likeId) {
        const res = await api.delete('api/likes/' + likeId)
        logger.log(res.data)
        AppState.likes = AppState.likes.filter(l => l.id !== likeId)
        AppState.activeSong.isLiked = false
        return res
    }
    async getLikesBySongId(id) {
        const res = await api.get('api/songs/' + id + '/likes')
        logger.log('getting likes for this song', res.data)
        AppState.likes = res.data
        // AppState.myLikes = res.data
    }
    async getMyLikes(profileId) {
        const res = await api.get('api/profiles/' + profileId + '/likes')
        logger.log('getting account likes', res.data)
        // AppState.likes = res.data
        AppState.myLikes = res.data
    }
}

export const likesService = new LikesService()