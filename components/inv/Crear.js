import { useState } from 'react'
import { addImagesProduct, addProducts } from '../../utils/firebase'
import FormProducts from '../Forms/FormProducts'
import { useRouter } from 'next/router'
import { toastify } from '../../utils/toastify'
import { TiTimes } from 'react-icons/ti'

const Crear = ({ close }) => {
  const [formData, setFormData] = useState({
    categoria: '',
    subcategoria: ''
  })

  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'categoria') {
      setFormData({
        ...formData,
        [name]: value,
        subcategoria: ''
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (data) => {
    try {
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
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
            router.push('/crud')
          } else {
            const dataProduct = {
              ...data,
              images: urlImages,
              costo: parseInt(data.costo),
              precio: parseInt(data.precio),
              cantidad: parseInt(data.cantidad)
            }
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
            router.push('/crud')
          }
        } catch (e) {
          console.log(e)
          toastify('No se pudo agregar el producto. Intenta mas tarde', 'error')
        }
      }
    } catch (e) {
      toastify('No se pudo subir la image. Intenta mas tarde', 'error')
    }
  }

  return (
    <>
      <div className="container-2 bg-light">
        <div className="container">
          <div className="container">
            <h3 className='text-center m-3'>Agregar Producto</h3>
            <FormProducts
              functionHandleChange={handleChange}
              functionHandleSubmit={handleSubmit}
              data={formData}
              update={false}
            />
          </div>
          <div className="btn-container">
              <button className="btn btn-danger" onClick={() => { close() }}><TiTimes/></button>
            </div>
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

export default Crear
