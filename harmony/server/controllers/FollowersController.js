import { Auth0Provider } from "@bcwdev/auth0provider";
import { followersService } from "../services/FollowersService.js";
import BaseController from "../utils/BaseController.js";


export class FollowersController extends BaseController {
    constructor() {
        super('api/followers')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createFollower)
            .delete('/:id', this.removeFollower)
    }

    async createFollower(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const follower = await followersService.createFollower(req.body)
            return res.send(follower)
        } catch (error) {
            next(error)
        }
    }

    async removeFollower(req, res, next) {
        try {
            const message = await followersService.removeFollower(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}