
import { api } from "./AxiosService.js"

import { AppState } from '../AppState';
import { logger } from "../utils/Logger.js";


class CommentsService {
  async createComment(body) {
    const res = await api.post('api/comments', body)
    AppState.comments = AppState.comments
    AppState.comments.push(res.data)
    logger.log("comments", res.data)
  }
  async getCommentsBySongId(songId) {
    const res = await api.get('api/songs/' + `${songId}/comments`)
    AppState.comments = res.data
  }
}




export const commentsService = new CommentsService()