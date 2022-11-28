import { useState } from 'react'
import { addImagesProduct, addProducts } from '../../utils/firebase'
import Form from '../../components/Form'
import { useRouter } from 'next/router'
import Return from '../../components/Return'
import { toastify } from '../../utils/toastify'

const create = () => {
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
    <div className="container">
      <div className="container">
        <h3 className='text-center m-3'>Agregar Producto</h3>
        <Form
          functionHandleChange={handleChange}
          functionHandleSubmit={handleSubmit}
          data={formData}
          update={false}
        />
      </div>
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

export default create
