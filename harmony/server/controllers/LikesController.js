import { Auth0Provider } from "@bcwdev/auth0provider";
import { likesService } from "../services/LikesService.js";
import BaseController from "../utils/BaseController.js";


export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:id', this.removeLike)
    }

    async createLike(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const like = await likesService.createLike(req.body)
            return res.send(like)
        } catch (error) {
            next(error)
        }
    }

    async removeLike(req, res, next) {
        try {
            const message = await likesService.removeLike(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}