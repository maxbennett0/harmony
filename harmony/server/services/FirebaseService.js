// import firebaseAdmin from "firebase-admin"
// const firebaseAccountKey = require('../../Firebase.env.json');

// class FirebaseService {
//   constructor() {
//     firebaseAdmin.initializeApp({
//       // @ts-ignore
//       credential: firebaseAdmin.credential.cert(firebaseAccountKey)
//     })
//   }

//   async getToken(uid) {
//     const token = await firebaseAdmin.auth().createCustomToken(uid)
//     return token
//   }
// }

// export const firebaseService = new FirebaseService()