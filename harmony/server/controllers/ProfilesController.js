import { likesService } from "../services/LikesService.js"
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id', this.getOneProfile)
      .get('/:id/likes', this.getMyLikes)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getOneProfile(req, res, next) {
    try {
      const profile = await profileService.getOneProfile(req.userInfo.id)
      return res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
  async getMyLikes(req, res, next) {
    try {
      const likes = await likesService.getMyLikes(req.params.id)
      return res.send(likes)
    } catch (error) {
      next(error)
    }
  }


}
