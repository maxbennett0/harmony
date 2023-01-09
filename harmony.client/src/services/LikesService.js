import { api } from "./AxiosService.js"

class LikesService {
    async likeSong(songId) {
        const res = await api.post('api/likes', songId)
    }
}

export const likesService = new LikesService()