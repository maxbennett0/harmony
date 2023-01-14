import { findProp } from "@vue/compiler-core"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class FollowersService {
    async getFollowersByProfileId(profileId) {
        const res = await api.get('account/' + profileId + '/profile')
        logger.log('getting followers for profile', res.data)
        AppState.followers = res.data
    }

    async getFollowing() {
        try {
            const res = await api.get('profiles/followers')
            logger.log('[getting ticket events]', res.data)
            AppState.myFollowers = res.data
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async followProfile(body) {
        const res = await api.post('api/followers', body)
        logger.log('creating follow')
        AppState.followers.push(res.data)
        AppState.myFollowers.push(res.data)
        AppState.account.isFollowed = true
    }

    async unfollowProfile(followId) {
        const res = await api.delete('api/followers/' + followId)
        logger.log(res.data)
        AppState.followers = AppState.followers.filter(f => f.id !== followId)
        AppState.account.isFollowed = false
    }
}

export const followersService = new FollowersService()