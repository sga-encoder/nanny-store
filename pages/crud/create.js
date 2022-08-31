import { useState } from 'react'
import { addImagesProduct, addProducts } from '../../lib/firebase'
import Form from './../../components/Form'
import { toast } from 'react-hot-toast'

const create = () => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const toastify = (messages, type) => {
    switch (type) {
      case 'success':
        toast.success(messages,
          {
            // icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff'
            }
          }
        )
        break
      case 'error':
        toast.error('Hello Darkness!',
          {
            // icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff'
            }
          }
        )
        break
    }
  }

  const handleSubmit = async (data) => {
    try {
      const urlImages = await addImagesProduct(data.images[0])

      if (urlImages !== undefined) {
        try {
          if (data.category === 'clothes') {
            const dataProduct = {
              category: data.category,
              cost: data.cost,
              gender: data.gender,
              name: data.name,
              price: data.price,
              ref: data.ref,
              subcategory: data.subcategory,
              images: urlImages,
              amount: {
                L: data.L,
                M: data.M,
                S: data.S,
                XL: data.XL,
                XXL: data.XXL
              }
            }
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
          } else {
            const dataProduct = { ...data, images: urlImages }
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
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
        />
      </div>
    </div>
  )
}

export default create
