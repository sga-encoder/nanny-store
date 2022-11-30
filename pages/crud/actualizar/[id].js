import Form from '../../../components/Form'
import { useEffect, useState } from 'react'
import { getDocument, docProducts, addImagesProduct, updateProduct, deleteImages } from '../../../utils/firebase'
import { toastify } from '../../../utils/toastify'
import Return from '../../../components/Return'
import { useRouter } from 'next/router'

const actualizar = ({ productData }) => {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState({})
  const [change, setChange] = useState(false)

  useEffect(() => {
    setProduct(productData)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setChange(true)
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async (data) => {
    console.log(typeof data.images[0])

    if (typeof data.images[0] === 'object') {
      try {
        deleteImages(data.url)
        const urlImages = await addImagesProduct(data.images[0])

        if (urlImages !== undefined) {
          try {
            if (data.categoria === 'ropa') {
              const dataProduct = {
                categoria: data.categoria,
                costo: parseInt(data.costo),
                genero: data.genero,
                nombre: data.nombre,
                precio: parseInt(data.precio),
                ref: data.ref,
                subcategoria: data.subcategoria,
                images: urlImages,
                cantidad: {
                  L: parseInt(data.L),
                  M: parseInt(data.M),
                  S: parseInt(data.S),
                  XL: parseInt(data.XL),
                  XXL: parseInt(data.XXL)
                }
              }
              updateProduct(dataProduct, id)
              toastify('El producto se actualizar correctamente', 'success')
              router.push('/crud')
            } else {
              const dataProduct = { ...data, images: urlImages }
              updateProduct(dataProduct, id)
              toastify('El producto se actualizar correctamente', 'success')
              router.push('/crud')
            }
          } catch (e) {
            console.log(e)
            toastify('No se pudo actualizar el producto. Intenta mas tarde', 'error')
          }
        }
      } catch (e) {
        toastify('No se pudo subir la image. Intenta mas tarde', 'error')
      }
    } else {
      try {
        if (data.categoria === 'ropa') {
          const dataProduct = {
            categoria: data.categoria,
            costo: parseInt(data.costo),
            genero: data.genero,
            nombre: data.nombre,
            precio: parseInt(data.precio),
            ref: data.ref,
            subcategoria: data.subcategoria,
            images: data.images,
            cantidad: {
              L: parseInt(data.L),
              M: parseInt(data.M),
              S: parseInt(data.S),
              XL: parseInt(data.XL),
              XXL: parseInt(data.XXL)
            }
          }
          updateProduct(dataProduct, id)
          toastify('El producto se actualizar correctamente', 'success')
          router.push('/crud')
        } else {
          updateProduct(data, id)
          toastify('El producto se actualizar correctamente', 'success')
          router.push('/crud')
        }
      } catch (e) {
        console.log(e)
        toastify('No se pudo actualizar el producto. Intenta mas tarde', 'error')
      }
    }
  }

  return (

    <div className="container">
      {
        id !== undefined
          ? <div className="container">
            <h3 className='text-center m-3'>Actualizar Producto</h3>
            <Form
              functionHandleChange={handleChange}
              functionHandleSubmit={handleSubmit}
              data={productData}
              data2={product}
              update={true}
              change={change}
            />
          </div>
          : null
      }
      <style jsx>{`
        div>div
        {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }  
      `}</style>
      <Return href='/crud' />
    </div>

  )
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const productData = await getDocument(docProducts, id)
  return { props: { productData } }
}

export default actualizar
