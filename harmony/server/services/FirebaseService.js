import firebaseAdmin from "firebase-admin"
import { logger } from "../utils/Logger.js";
const firebaseAccountKey = require('../../Firebase.env.json');
// import firebaseAccountKey from '../../Firebase.env.json'

class FirebaseService {
  constructor() {

    let fbAccount = firebaseAccountKey
    let cred = firebaseAdmin.credential.cert('Firebase.env.json')
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: cred
    })
  }

  async getToken(uid) {
    const token = await firebaseAdmin.auth().createCustomToken(uid)
    return token
  }
}

export const firebaseService = new FirebaseService()