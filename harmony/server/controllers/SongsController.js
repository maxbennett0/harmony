import { songsService } from "../services/SongsService.js";
import BaseController from "../utils/BaseController.js";


export class SongsController extends BaseController {
  constructor() {
    super('api/songs')
    this.router
      .get('', this.getSongs)
  }

  async getSongs(req, res, next) {
    try {
      const song = await songsService.getSongs()
      return res.send(song)
    } catch (error) {
      next(error)
    }
  }
}