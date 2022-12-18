import { getFirestore, addDoc, collection, getDocs, updateDoc, getDoc, doc, deleteDoc, increment, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import app from '../lib/firebase'

export const db = getFirestore(app)
export const storage = getStorage(app)
export const docProducts = 'productos'
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
    const docSnap = await addDoc(docRef, {
      ...data,
      ultimaModificacion: new Date().toLocaleDateString(),
      fechaDeCreacion: new Date().toLocaleDateString(),
      historialDeVentas: []
    })
    console.log('se agrego un producto con el ID: ', docSnap.id)
  } catch (e) {
    console.error('Error en el servicio: ', e)
  }
}

export const updateProduct = async (data, id) => {
  const docRef = doc(db, docProducts, id)
  await updateDoc(docRef, data)
}

export const getProduct = async (ref) => {
  const q = query(collection(db, docProducts), where('ref', '==', ref))

  const querySnapshot = await getDocs(q)
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

export const deleteProduct = async (id, url) => {
  const deleteInfo = await deleteDoc(doc(db, docProducts, id))
  deleteImages(url)
  console.log(deleteInfo)
}

export const increaseQuantity = async (data, categoria) => {
  const docRef = doc(db, docProducts, data.id)
  if (categoria === 'ropa') {
    await updateDoc(docRef, {
      ultimaModificacion: new Date().toLocaleDateString(),
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
      ultimaModificacion: new Date().toLocaleDateString(),
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
        historialDeVentas: [...product[0].historialDeVentas, {
          numeroDeFacturacion: dataBill.numeroDeFacturacion,
          fechaDeVenta: new Date().toLocaleDateString(),
          cantidadVendida: parseInt(product[1]),
          talla: product[2]
        }],
        cantidad: operationSize(product[2])
      })
    } else {
      updateDoc(docRef2, {
        historialDeVentas: [...product[0].historialDeVentas, {
          numeroDeFacturacion: dataBill.numeroDeFacturacion,
          fechaDeVenta: new Date().toLocaleDateString(),
          cantidadVendida: parseInt(product[1])
        }],
        cantidad: product[0].cantidad - parseInt(product[1])
      })
    }
    products = [...products, {
      id: product[0].id,
      ref: product[0].ref,
      nombre: product[0].nombre,
      precio: product[0].precio,
      cantidadVendida: parseInt(product[1]),
      categoria: product[0].categoria,
      talla: product[2],
      images: product[0].images,
      total: product[0].precio * parseInt(product[1])
    }]
  })
  try {
    const docRef = collection(db, docBills)
    const docSnap = await addDoc(docRef, {
      ...dataBill,
      productosVendidos: products,
      fechaDeFacturacion: new Date().toLocaleDateString()
    })

    console.log('se agrego un producto con el ID: ', docSnap.id)
  } catch (e) {
    console.error('Error en el servicio: ', e)
  }

  const docRef3 = doc(db, varNumberBill[0], varNumberBill[1])
  await updateDoc(docRef3, {
    numeroDeFacturacion: dataBill.numeroDeFacturacion
  })

  console.log('products', products)
}

export const getBill = async (numberFac) => {
  const q = query(collection(db, docBills), where('numeroDeFacturacion', '==', numberFac))

  const querySnapshot = await getDocs(q)
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
