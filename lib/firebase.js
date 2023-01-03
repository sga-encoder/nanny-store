import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: ,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// }

const firebaseConfig = {
  apiKey: 'AIzaSyDmaWb-dEwDuGIm8Gs2BNAVCEoNnZ2v4xU',
  authDomain: 'nanny-store.firebaseapp.com',
  projectId: 'nanny-store',
  storageBucket: 'nanny-store.appspot.com',
  messagingSenderId: '367117593705',
  appId: '1:367117593705:web:12e4cb7b7ba78a7bc3c6f8',
  measurementId: 'G-PQTVHYJ8XH'
}

const app = initializeApp(firebaseConfig)

export default app
