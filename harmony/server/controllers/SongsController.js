import { Auth0Provider } from "@bcwdev/auth0provider";
import { UserInfo } from "firebase-admin/lib/auth/user-record.js";
import { songsService } from "../services/SongsService.js";
import BaseController from "../utils/BaseController.js";


export class SongsController extends BaseController {
  constructor() {
    super('api/songs')
    this.router
      .get('', this.getSongs)
      .get('/:id', this.findSongById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSong)
      .delete('/:id', this.removeSong)
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
}