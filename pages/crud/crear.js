import { useState } from 'react'
import { addImagesProduct, addProducts } from '../../utils/firebase'
import Form from '../../components/Form'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const create = () => {
  const [formData, setFormData] = useState({
    categoria: '',
    subcategoria: ''
  })

  const router = useRouter()

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
        toast.error(messages,
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
          if (data.category === 'ropa') {
            const dataProduct = {
              category: data.category,
              cost: data.cost,
              gender: data.gender,
              name: data.name,
              price: data.price,
              ref: data.ref,
              subcategory: data.subcategory,
              images: urlImages,
              cantidad: {
                L: data.L,
                M: data.M,
                S: data.S,
                XL: data.XL,
                XXL: data.XXL
              }
            }
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
            router.push('/')
          } else {
            const dataProduct = { ...data, images: urlImages }
            addProducts(dataProduct)
            toastify('El producto se agrego correctamente', 'success')
            router.push('/')
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
    </div>
  )
}

export default create
