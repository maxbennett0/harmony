import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class followService {
    async getFollowersByProfileId(profileId) {
        const res = await api.get('account/' + profileId + '/profile')
        logger.log('getting followers for profile', res.data)
        AppState.followers = res.data
    }
}

export const followService = new followService()