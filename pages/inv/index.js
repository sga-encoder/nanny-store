import { FiSearch } from 'react-icons/fi'
import Return from '../../components/Return'
import { useState } from 'react'
import { getCollection, docProducts, increaseQuantity } from '../../utils/firebase'
import Popup from 'reactjs-popup'
import { AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { toastify } from '../../utils/toastify'

const index = ({ products }) => {
  const [submit, setSubmit] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()

  const onSubmit = (e) => {
    increaseQuantity(e)
    reset()
    toastify('sé actualizo correctamennte los productos', 'success')
    setSubmit(!submit)
  }

  return (
    <div className="container">
      <h1>Inventario</h1>
      <div className="container">
        <div className="input-group md-3">
          <div className="form-floating">
            <input type="text" className="form-control" id="search" placeholder="busca"/>
            <label htmlFor="search">Busca aqui el producto</label>
          </div>
          <span className="input-group-text"><FiSearch /></span>
        </div>
      </div>
      <div className='container text-center'>
        <div className="row row-cols-4 card-container">
          {
            products.map(({ id, nombre, images, cantidad, categoria, subcategoria, precio }) => {
              const cantidadTotal = () => {
                if (typeof cantidad === 'object') {
                  return (parseInt(cantidad.S) + parseInt(cantidad.M) + parseInt(cantidad.L) + parseInt(cantidad.XL) + parseInt(cantidad.XXL))
                } else {
                  return (cantidad)
                }
              }

              return (
                <Popup
                  key={id}
                  arrow={false}
                  position="center center"
                  trigger={
                    <div className="col">
                      <div className="card card-content">
                        <img src={images} className="card-img-top" alt={nombre} />
                        <div className="card-body">
                          <div className="card-text">
                            <div className="container">
                              <div className="row">
                                <div className="col-12">{nombre}</div>
                              </div>
                              <div className="row">
                                <div className="col text-start fw-bold">Subcategoria:</div>
                                <div className="col">{subcategoria}</div>
                              </div>
                              <div className="row">
                                <div className="col text-start fw-bold">Precio:</div>
                                <div className="col">{precio}</div>
                              </div>
                              <div className="row">
                                <div className="col text-start fw-bold">Cantidad:</div>
                                <div className="col">{cantidadTotal()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  {close => (
                    <div className='container card w-107 card-content bg-secondary'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('id')}
                        />
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('old_S')}
                        />
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('old_M')}
                        />
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('old_L')}
                        />
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('old_XL')}
                        />
                        <input
                          type="text"
                          className="visually-hidden"
                          {...register('old_XXL')}
                        />

                        {
                          categoria !== 'ropa'
                            ? <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Incrementar"
                                inputMode="numeric"
                                {...register('incrementar', { value: 0 })}
                              />
                              <label htmlFor="floatingInput">Incrementar</label>
                            </div>
                            : <>
                              <div className="row g-2 row-increment mb-2">
                                <div className="col form-increment">
                                  <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">S</span>
                                    <input
                                      type="number"
                                      placeholder='S'
                                      className="form-control-sm"
                                      {...register('S', { value: 0 })}
                                    />
                                  </div>
                                </div>

                                <div className="col form-increment">
                                  <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">M</span>
                                    <input
                                      type="number"
                                      placeholder='M'
                                      className="form-control-sm"
                                      {...register('M', { value: 0 })}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row g-2 row-increment mb-2">
                                <div className="col form-increment">
                                  <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">L</span>
                                    <input
                                      type="number"
                                      placeholder='L'
                                      className="form-control-sm"
                                      {...register('L', { value: 0 })}
                                    />
                                  </div>
                                </div>

                                <div className="col form-increment">
                                  <div className="input-group">
                                    <span className="input-group-text group-2" id="basic-addon1">XL</span>
                                    <input
                                      type="number"
                                      placeholder='XL'
                                      className="form-control-sm"
                                      {...register('XL', { value: 0 })}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="d-grid gap-2 row-increment mb-2">
                                <div className="form-increment-2">
                                  <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">XXL</span>
                                    <input
                                      type="number"
                                      placeholder='XXL'
                                      className="form-control-sm"
                                      {...register('XXL', { value: 0 })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                        }
                        <div className='d-grid gap-2'>
                          <button
                            type="submit"
                            className='btn btn-primary'
                            onClick={() => {
                              setValue('id', id)
                              setValue('old_S', cantidad.S)
                              setValue('old_M', cantidad.M)
                              setValue('old_L', cantidad.L)
                              setValue('old_XL', cantidad.XL)
                              setValue('old_XXL', cantidad.XXL)
                            }}>
                            Agregar cantidad
                          </button>
                          <button type="button" className='btn btn-info' onClick={ close }>
                            <AiOutlineClose />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Popup>
              )
            })
          }
        </div>

      </div>
      <Return href="/" />

      <style jsx>{`
        .card-container
        {
          height: 70vh;
          overflow: auto;
        }

        .card-container::-webkit-scrollbar
        {
          display: none;
        }

        .card-content
        {
          width: 100%;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 8%;
          overflow: hidden;
        }

        .w-107
        {
          width: 107%
        }

        .card-container img
        {
          width: 25vh;
          height: 25vh;
          object-fit: cover;
        }

        .form-increment input
        {
          width: 60px;
        }

        .group-2
        {
          padding: 0.375rem 0.8rem;
        }

        .form-increment-2 input
        {
          width:70%;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps () {
  const products = await getCollection(docProducts)
  return { props: { products } }
}

export default index
