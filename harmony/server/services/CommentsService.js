import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { songsService } from "./SongsService.js"

class CommentsService {

  async removeComment(commentId, userId) {
    let comment = await dbContext.Comments.findById
      (commentId).populate('creator song')

    if (!comment) throw new BadRequest(`no comment at id: ${commentId}`)
    let song = await songsService.getOne(comment.songId)
  }


  async getAllComments(songId) {
    const comment = await dbContext.Comments.find(songId).populate('creator')
    return comment
  }

  async createComment(body) {
    const song = await songsService.findSongById(body.songId)
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }



}









export const commentsService = new CommentsService()
