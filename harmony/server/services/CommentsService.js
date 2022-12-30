import { dbContext } from "../db/DbContext.js"
import { songsService } from "./SongsService.js"









class CommentsService {


  async getAllComments(query) {
    const comment = await dbContext.Comments.find(query).populate('creator')
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
