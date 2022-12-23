// import { AppState } from "../AppState.js"
// import { logger } from "../utils/Logger.js"
// import Pop from "../utils/Pop.js"
// import { storage } from "../utils/FirebaseProvider.js"
// import { fb } from "../utils/FirebaseProvider.js"
// import { api } from "./AxiosService.js"

// class FirebaseService {
//   async login() {
//     try {
//       const res = await api.get('account/firebase')
//       logger.log(res.data)
//       const token = res.data.token
//       await fbAuth.signInWithCustomToken(token)
//     } catch (error) {
//       logger.error(error)
//       Pop.toast(error.message, 'error')
//     }
//   }
//   async upload(image) {
//     const collection = storage.ref('Images')
//     const resource = collection.child(image.name)
//     const snapshot = await resource.put(image, {
//       customMetadata: {
//         uid: AppState.account.id, size: image.size, type: 'Images'
//       }
//     })
//     const url = await snapshot.ref.getDownloadURL()
//     return url
//   }
// }

// export const firebaseService = new FirebaseService()