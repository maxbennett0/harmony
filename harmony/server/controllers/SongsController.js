import { Auth0Provider } from "@bcwdev/auth0provider";
import { songsService } from "../services/SongsService.js";
import BaseController from "../utils/BaseController.js";


export class SongsController extends BaseController {
  constructor() {
    super('api/songs')
    this.router
      .get('', this.getSongs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSong)
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
}