import Form from './Form'
import { useEffect, useState } from 'react'
import { addImagesProduct, updateProduct, deleteImages } from '../utils/firebase'
import { toastify } from '../utils/toastify'
import { TiTimes } from 'react-icons/ti'

const Actualizar = ({ productData, close }) => {
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
              updateProduct(dataProduct, productData.id)
              toastify('El producto se actualizar correctamente', 'success')
            } else {
              const dataProduct = { ...data, images: urlImages }
              updateProduct(dataProduct, productData.id)
              toastify('El producto se actualizar correctamente', 'success')
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
          updateProduct(dataProduct, productData.id)
          toastify('El producto se actualizar correctamente', 'success')
        } else {
          updateProduct(data, productData.id)
          toastify('El producto se actualizar correctamente', 'success')
        }
      } catch (e) {
        console.log(e)
        toastify('No se pudo actualizar el producto. Intenta mas tarde', 'error')
      }
    }
  }

  return (
    <>
      <div className='container-2 bg-light'>
        <div className="container">
          <div className="container">
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
        </div>
        <div className="btn-container">
          <button className="btn btn-danger" onClick={() => { close() }}><TiTimes/></button>
        </div>
      </div>
      <div className="glass"></div>
      <style jsx>{`
        .container-2
        {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          padding: 2%;
          width: 60%;
          z-index: 300;
        }
        
        .glass
        {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index:200;
          backdrop-filter: blur(5px);
        }

        .btn-container
        {
          position: absolute;
          top: 2%;
          left: 2%;
        }
        
        div>div
        {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }  
      `}</style>
    </>

  )
}

export default Actualizar
