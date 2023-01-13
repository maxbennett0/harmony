import { AppState } from '../AppState'
import { Account } from "../models/Account.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getProfile(profileId) {
    try {
      const res = await api.get('api/profiles/' + profileId)
      AppState.activeProfile = new Account(res.data)
      logger.log('new active profile', AppState.activeProfile)
    } catch (error) {
      logger.error(error)
    }
  }


  async searchProfiles(search) {
    const res = await api.get('api/profiles/', { params: search })
    AppState.profiles = res.data
  }
  async getMyLikes() {
    const res = await api.get('/account/likes')
    AppState.myLikes = res.data
  }
}




export const accountService = new AccountService()
