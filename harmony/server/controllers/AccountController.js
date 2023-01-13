import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { followersService } from '../services/FollowersService.js'
import { firebaseService } from "../services/FirebaseService.js"
import { songsService } from "../services/SongsService.js"
import BaseController from '../utils/BaseController'
export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/songs', this.getMySongs)
      .get('/followers', this.getFollowing)
      .get('/:id/profile', this.getFollowersByProfileId)
      .get('/firebase', this.getFirebaseToken)
    // TODO figure out what this is in the readme
    // .put('', this.editAccount)
  }
  async getMySongs(req, res, next) {
    try {
      const songs = await songsService.getMySongs(req.userInfo.id)
      res.send(songs)
    } catch (error) {
      next(error)
    }
  }

  async getFollowing(req, res, next) {
    try {
      const followers = await followersService.getFollowing(req.userInfo.id)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFollowersByProfileId(req, res, next) {
    try {
      let followers = await followersService.getFollowersByProfileId(req.params.id)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getFollowersByProfileId(req, res, next) {
    try {
      let followers = await followersService.getFollowersByProfileId(req.params.id)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getFirebaseToken(req, res, next) {
    try {
      const token = await firebaseService.getToken(req.userInfo.id)
      // NOTE send the token back as an object, or else you won't be able to target it if needed
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
}
