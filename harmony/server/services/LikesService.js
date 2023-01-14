import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { songsService } from "./SongsService.js"



class LikesService {
    async getMyLikes(accountId) {
        const myLikes = await dbContext.Likes.find({ accountId }).populate('song')
        return myLikes
    }
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

    async removeLike(likeId) {
        const like = await dbContext.Likes.findById(likeId).populate('artist song')
        const song = await songsService.findSongById(like.songId)
        await like.remove()
        song.isLiked = false
        await song.save()
        return 'removed like'
    }

    async getLikesBySongId(songId) {
        const like = await dbContext.Likes.find({ songId }).populate('artist')
        return like
    }

}

export const likesService = new LikesService()