import { Auth0Provider } from "@bcwdev/auth0provider";
import { UserInfo } from "firebase-admin/lib/auth/user-record.js";
import { commentsService } from "../services/CommentsService.js";
import { likesService } from "../services/LikesService.js";
import { songsService } from "../services/SongsService.js";
import BaseController from "../utils/BaseController.js";


export class SongsController extends BaseController {
  constructor() {
    super('api/songs')
    this.router
      .get('', this.getSongs)
      .get('/:id', this.findSongById)
      .get('/:id/comments', this.getAllComments)
      .get('/:id/likes', this.getLikesBySongId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSong)
      .delete('/:id', this.removeSong)
  }
  async getLikesBySongId(req, res, next) {
    try {
      const like = await likesService.getLikesBySongId(req.params.id)
      return res.send(like)
    } catch (error) {
      next(error)
    }
  }
  async getAllComments(req, res, next) {
    try {
      const comment = await commentsService.getAllComments({ songId: req.params._id })
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getSongs(req, res, next) {
    try {
      const song = await songsService.getSongs()
      return res.send(song)
    } catch (error) {
      next(error)
    }
  }

  async createSong(req, res, next) {
    try {
      req.body.artistId = req.userInfo.id
      const song = await songsService.createSong(req.body)
      return res.send(song)
    } catch (error) {
      next(error)
    }
  }

  async removeSong(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const message = await songsService.removeSong(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async findSongById(req, res, next) {
    try {
      const song = await songsService.findSongById(req.params.id)
      return res.send(song)
    } catch (error) {
      next(error)
    }
  }
  async getSongsByProfileId(req, res, next) {
    try {
      const songs = await songsService.getSongsByProfileId(req.params._id)
      res.send(songs)
    } catch (error) {
      next(error)
    }
  }
}