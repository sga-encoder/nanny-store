import { getFirestore, addDoc, collection, getDocs, updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import app from '../lib/firebase'

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

export const getProducts = async () => {
  const docRef = collection(db, 'category')
  const querySnapshot = await getDocs(docRef)
  const products = []

  try {
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id })
    })
  } catch (e) {
    console.error('Error en el servicio', e)
  }

  return products
}

export const getProduct = async (id) => {
  console.log(id)
  const docRef = doc(db, 'category', id)
  const querySnapshot = await getDoc(docRef)

  if (querySnapshot.exists()) {
    return { ...querySnapshot.data(), id: querySnapshot.id }
  } else {
    console.log('no pudimos encontrar el documento')
  }
}

export const updateProduct = async (data, id) => {
  const docRef = doc(db, 'category', id)
  await updateDoc(docRef, data)
}

export const deleteProduct = async (id, url) => {
  const deleteInfo = await deleteDoc(doc(db, 'category', id))
  deleteImages(url)
  console.log(deleteInfo)
}

export const addImagesProduct = async (file, name) => {
  const fileRef = ref(storage, v4())
  await uploadBytes(fileRef, file)
  const fileUrl = await getDownloadURL(fileRef)
  return fileUrl
}

export const deleteImages = async (url) => {
  const desertRef = ref(storage, url)

  deleteObject(desertRef).then(() => {
    console.log('se elimino correctamente la imagen')
  }).catch((error) => {
    console.log('hubo un error al eliminar la imagen:', error)
  })
}
