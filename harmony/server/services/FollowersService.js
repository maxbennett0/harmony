import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import e from "express"
import { dbContext } from "../db/DbContext.js"
import { profileService } from "./ProfileService.js"
import { songsService } from "./SongsService.js"

class FollowersService {
    async createFollower(body) {
        const profile = await profileService.getOneProfile(body.followingId)
        // @ts-ignore
        const follow = await dbContext.Followers.create(body)
        // @ts-ignore
        profile.isFollowed = true
        // @ts-ignore
        await profile.save()
        await follow.populate('artist')
        return follow
    }

    async removeFollower(id, accountId) {
        const follow = await dbContext.Followers.findById(id).populate('artist')
        if (!follow) {
            throw new BadRequest('No follow found')
        }
        // @ts-ignore
        const profile = await profileService.getOneProfile(accountId)
        // @ts-ignore
        await follow.remove()
        // @ts-ignore
        profile.isFollowed = false
        // @ts-ignore
        // await follow.save()
        return `deleted!`
    }

    async getFollowersByProfileId(profileId) {
        let followers = await dbContext.Followers.find({ profileId }).populate('artist')
        return followers
    }

    async getFollowing(accountId) {
        const followers = await dbContext.Followers.find({ accountId }).populate('artist')
        return followers
    }
}

export const followersService = new FollowersService()