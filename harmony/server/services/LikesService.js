import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { songsService } from "./SongsService.js"



class LikesService {
    async createLike(body) {
        const song = await songsService.findSongById(body.songId)
        if (song.isLiked == true) throw new BadRequest('you already liked it')
        const like = await dbContext.Likes.create(body)
        // @ts-ignore
        song.isLiked = true
        // @ts-ignore
        await song.save()
        await like.populate('artist')
        return like
    }

    async removeLike(likeId, userId) {
        const like = await dbContext.Likes.findById(likeId).populate('artist song')
        if (like.accountId.toString() != userId) {
            throw new Forbidden('not your like')
        } else if (!like) {
            throw new BadRequest('no like at this like id')
        } else {
            const song = await songsService.findSongById(like.songId)
            await like.remove()
            song.isLiked = false
            await song.save()
            return 'removed like'
        }
    }

}

export const likesService = new LikesService()