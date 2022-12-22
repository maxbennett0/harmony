export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-tkmccijvrcuc0oxw.us.auth0.com'
export const clientId = 'VBQk2WRibquQa1oQtpL32FoJMizP6Tu2'
export const audience = 'https://max-classroom.com'

export const firebaseConfig = {
  apiKey: "AIzaSyAgVfcw_vC7DYIY2HguLI2O-wlPtWLZA78",
  authDomain: "harmony-ad9d7.firebaseapp.com",
  projectId: "harmony-ad9d7",
  storageBucket: "harmony-ad9d7.appspot.com",
  messagingSenderId: "188648325966",
  appId: "1:188648325966:web:9748b538244c40125e941f"
};