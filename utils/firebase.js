import { getFirestore, addDoc, collection, getDocs, updateDoc, getDoc, doc, deleteDoc, serverTimestamp, increment, Timestamp } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import app from '../lib/firebase'

export const db = getFirestore(app)
export const storage = getStorage(app)
export const docProducts = 'products'
export const docBills = 'facturas'
export const varNumberBill = ['variables', 'facturas']

// -------------------------------------------------
// -                                               -
// -                  Generales                    -
// -                                               -
// -------------------------------------------------
export const getCollection = async (collections) => {
  const docRef = collection(db, collections)
  const querySnapshot = await getDocs(docRef)
  const data = []
  try {
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id })
    })
  } catch (e) {
    console.error('Error en el servicio', e)
  }

  return data
}

export const getDocument = async (collections, id) => {
  const docRef = doc(db, collections, id)
  const querySnapshot = await getDoc(docRef)

  if (querySnapshot.exists()) {
    return { ...querySnapshot.data(), id: querySnapshot.id }
  } else {
    console.log('no pudimos encontrar el documento')
  }
}

// -------------------------------------------------
// -                                               -
// -                 Productos                     -
// -                                               -
// -------------------------------------------------
export const addProducts = async (data) => {
  try {
    const docRef = collection(db, docProducts)
    const docSnap = await addDoc(docRef, data)
    console.log('se agrego un producto con el ID: ', docSnap.id)
  } catch (e) {
    console.error('Error en el servicio: ', e)
  }
}

export const updateProduct = async (data, id) => {
  const docRef = doc(db, docProducts, id)
  await updateDoc(docRef, data)
}

export const deleteProduct = async (id, url) => {
  const deleteInfo = await deleteDoc(doc(db, docProducts, id))
  deleteImages(url)
  console.log(deleteInfo)
}

export const increaseQuantity = async (data) => {
  const docRef = doc(db, docProducts, data.id)
  if (data.incrementar === 0) {
    await updateDoc(docRef, {
      ultima_modificacion: serverTimestamp(),
      cantidad: {
        S: parseInt(data.S) + parseInt(data.old_S),
        M: parseInt(data.M) + parseInt(data.old_M),
        L: parseInt(data.L) + parseInt(data.old_L),
        XL: parseInt(data.XL) + parseInt(data.old_XL),
        XXL: parseInt(data.XXL) + parseInt(data.old_XXL)
      }
    })
  } else {
    await updateDoc(docRef, {
      ultima_modificacion: serverTimestamp(),
      cantidad: increment(data.incrementar)
    })
  }
}

// -------------------------------------------------
// -                                               -
// -                  Imagenes                     -
// -                                               -
// -------------------------------------------------
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

// -------------------------------------------------
// -                                               -
// -                  Facturas                     -
// -                                               -
// -------------------------------------------------
export const getNumberBill = async () => {
  const docRef = doc(db, varNumberBill[0], varNumberBill[1])
  const querySnapshot = await getDoc(docRef)

  if (querySnapshot.exists()) {
    return querySnapshot.data()
  } else {
    console.log('no pudimos encontrar el documento')
  }
}

export const addBill = async (data, dataBill) => {
  let products = []

  data.forEach((product) => {
    const docRef2 = doc(db, docProducts, product[0].id)
    const operationSize = (size) => {
      switch (size) {
        case 'S':
          return {
            S: product[0].cantidad.S - product[1],
            M: product[0].cantidad.M,
            L: product[0].cantidad.L,
            XL: product[0].cantidad.XL,
            XXL: product[0].cantidad.XXL
          }
        case 'M':
          return {
            S: product[0].cantidad.S,
            M: product[0].cantidad.M - product[1],
            L: product[0].cantidad.L,
            XL: product[0].cantidad.XL,
            XXL: product[0].cantidad.XXL
          }
        case 'L':
          return {
            S: product[0].cantidad.S,
            M: product[0].cantidad.M,
            L: product[0].cantidad.L - product[1],
            XL: product[0].cantidad.XL,
            XXL: product[0].cantidad.XXL
          }
        case 'XL':
          return {
            S: product[0].cantidad.S,
            M: product[0].cantidad.M,
            L: product[0].cantidad.L,
            XL: product[0].cantidad.XL - product[1],
            XXL: product[0].cantidad.XXL
          }
        case 'XXL':
          return {
            S: product[0].cantidad.S,
            M: product[0].cantidad.M,
            L: product[0].cantidad.L,
            XL: product[0].cantidad.XL,
            XXL: product[0].cantidad.XXL - product[1]
          }
      }
    }

    if (product[0].categoria === 'ropa') {
      updateDoc(docRef2, {
        historial_de_ventas: [...product[0].historial_de_ventas, {
          // fecha_de_venta: Timestamp.fromDate(new Date().getDate()),
          fecha_de_venta: Timestamp.fromDate(new Date()),
          cantidad_vendida: product[1],
          talla: product[2]
        }],
        cantidad: operationSize(product[2])
      })
    } else {
      updateDoc(docRef2, {
        historial_de_ventas: [...product[0].historial_de_ventas, {
          // fecha_de_venta: Timestamp.fromDate(new Date().getDate()),
          fecha_de_venta: Timestamp.fromDate(new Date()),
          cantidad_vendida: product[1]
        }],
        cantidad: product[0].cantidad - product[1]
      })
    }
    products = [...products, product[0]]
  })
  try {
    const docRef = collection(db, docBills)
    const docSnap = await addDoc(docRef, {
      ...dataBill,
      productos_vendidos: products,
      fecha_de_facturacion: serverTimestamp()
    })

    console.log('se agrego un producto con el ID: ', docSnap.id)
  } catch (e) {
    console.error('Error en el servicio: ', e)
  }

  const docRef3 = doc(db, varNumberBill[0], varNumberBill[1])
  await updateDoc(docRef3, {
    numero_de_facturacion: dataBill.numero_de_facturacion
  })

  console.log('products', products)
}
