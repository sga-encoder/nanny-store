import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const addProducts = async (data) => {
  try {
    const docRef = collection(db, 'category')
    const docSnap = await addDoc(docRef, data)
    console.log('se agrego un producto con el ID: ', docSnap.id)
  } catch (e) {
    console.error('Error en el servicio: ', e)
  }
}

export const addImagesProduct = async (file, name) => {
  const fileRef = ref(storage, v4())
  await uploadBytes(fileRef, file)
  const fileUrl = await getDownloadURL(fileRef)
  return fileUrl
}
