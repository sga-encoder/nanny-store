import { useForm } from 'react-hook-form'
import { increaseQuantity } from '../utils/firebase'
import { AiOutlineClose } from 'react-icons/ai'
import { toastify } from '../utils/toastify'
import { TiTimes } from 'react-icons/ti'

const Agregar = ({ productData, close }) => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const { cantidad, categoria, id } = productData

  const onSubmit = (e) => {
    increaseQuantity(e, productData.categoria)
    reset()
    toastify('sé actualizo correctamennte los productos', 'success')
  }

  return (
    <>
      <div className='container card w-107 card-content bg-light'>
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
              <div className="input-group mb-3">
                <span className="input-group-text">S:</span>
                <input
                  type="text"
                  className="form-control"
                  {...register('S', { value: 0 })}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">M:</span>
                <input
                  type="text"
                  className="form-control"
                  {...register('M', { value: 0 })}
                />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">L:</span>
                <input
                  type="text"
                  className="form-control"
                  {...register('L', { value: 0 })}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">XL:</span>
                <input
                  type="text"
                  className="form-control"
                  {...register('XL', { value: 0 })}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">XXL:</span>
                <input
                  type="text"
                  className="form-control"
                  {...register('XXL', { value: 0 })}
                />
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
              }}
            >
              Agregar cantidad
            </button>
            <button type="button" className='btn btn-outline-danger' onClick={ close }>
              <AiOutlineClose />
            </button>
          </div>
        </form>
        <div className="btn-container">
          <button className="btn btn-danger" onClick={() => { close() }}><TiTimes/></button>
        </div>
      </div>
      <div className="glass"></div>
      <style jsx>{`
        .container
        {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          padding: 2%;
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
          top: 6%;
          left: 2%;
        }

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
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
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
    </>
  )
}

export default Agregar
