import firebase from 'firebase/compat/app'
import { firebaseConfig } from "../env.js"
import 'firebase/compat/auth'
import 'firebase/compat/storage'

export const fb = firebase.initializeApp(firebaseConfig)
export const fbAuth = fb.auth()
export const storage = fb.storage()