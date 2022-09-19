import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

const Form = ({ functionHandleChange, functionHandleSubmit, data, update }) => {
  const { register, handleSubmit, setValue } = useForm()

  const [getId, setGetId] = useState(false)

  useEffect(() => {
    if (update) {
      setValue('categoria', data.categoria)
      setValue('subcategoria', data.subcategoria)
      setValue('ref', data.ref)
      setValue('nombre', data.nombre)
      setValue('costo', data.costo)
      setValue('precio', data.precio)
      setValue('images', data.images)
      setValue('url', data.images)
      if (data.subcategoria === 'medias' || data.categoria !== 'ropa') {
        setValue('cantidad', data.cantidad)
      }
      if (data.categoria === 'ropa' && data.subcategoria !== 'medias') {
        setValue('S', data.cantidad.S)
        setValue('M', data.cantidad.M)
        setValue('L', data.cantidad.L)
        setValue('XL', data.cantidad.XL)
        setValue('XXL', data.cantidad.XXL)
      }
      setValue('genero', data.genero)
    }
  }, [getId])

  const onSubmit = (data) => {
    functionHandleSubmit(data)
  }

  const switchSubcategory = () => {
    switch (data.categoria) {
      case 'accesorio':
        return (
          <>
            <option value="pulsera">pulsera</option>
            <option value="llavero">llavero</option>
            <option value="otros">otros</option>
          </>
        )

      case 'belleza':
        return (
          <>
            <option value="cuidado facial">Cuidado Facial</option>
            <option value="otro">otro</option>
          </>
        )

      case 'ropa':
        return (
          <>
            <option value="camiseta">Camiseta</option>
            <option value="polo">Polo</option>
            <option value="boxer">Boxer</option>
            <option value="medias">Medias</option>
            <option value="otro">otro</option>
          </>
        )

      case 'fragancia':
        return (
          <>
            <option value="perfume">Perfume</option>
            <option value="splash">splash</option>
            <option value="otro">otro</option>
          </>
        )

      default:
        return (
          <>
            <option value="">-- no hay subcategorias --</option>
          </>
        )
    }
  }

  return (
    <div className='container-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          className="form-select mt-2"
          {...register('categoria')}
          onChange={functionHandleChange}
        >
          <option defaultValue>-- selecione la categoria --</option>
          <option value="accesorio">Accesorio</option>
          <option value="belleza">belleza</option>
          <option value="ropa">Ropa</option>
          <option value="fragancia">fragancia</option>
        </select>

        <select
          className="form-select mt-3 mb-3"
          {...register('subcategoria')}
          onChange={functionHandleChange}
        >
          <option defaultValue>-- selecione la subcategoria --</option>
          {switchSubcategory()}
        </select>

        <div className="input-group mb-3">
          <span className="input-group-text">Ref:</span>
          <input
            type="text"
            className="form-control"
            {...register('ref')}

          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Nombre:</span>
          <input
            type="text"
            className="form-control"
            {...register('nombre')}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Costo $</span>
              <input
                type="number"
                className="form-control"
                {...register('costo')}
              />
            </div>
          </div>

          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Precio $</span>
              <input
                type="number"
                className="form-control"
                {...register('precio')}
              />
            </div>
          </div>
        </div>

        {
          update &&
            <div className="input-group mb-3">
              <div className='form-control input-container'>
                <p className='text-button'>Actualizar Imagen</p>
                <input
                  type="file"
                  id="formFile"
                  className='input'
                  {...register('images')}
                />
              </div>
              <input
                type="text"
                className="form-control"
                {...register('url')}
              />

              <span className="input-group-text">
                <img className='img-form' src={data.images} alt={data.name} />
              </span>
            </div>
        }

        {
          !update &&
            <div className='input-group mb-3'>
              <input
                className=" form-control"
                type="file"
                id="formFile"
                {...register('images')}
              />
            </div>

        }

        {
          data.subcategoria === 'medias'
            ? <div className="col">
                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad</span>
                  <input
                    type="number"
                    className="form-control"
                    {...register('cantidad')}
                  />
                </div>
              </div>
            : data.categoria !== 'ropa' &&
              <div className="col">
                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad</span>
                  <input
                    type="number"
                    className="form-control"
                    {...register('cantidad')}
                  />
                </div>
              </div>

        }

        {
          data.categoria === 'ropa'
            ? data.subcategoria === 'medias'
              ? null
              : <div className="row">
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">S</span>
                      <input
                        type="number"
                        className="form-control"
                        {...register('S')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">M</span>

                      <input
                        type="number"
                        className="form-control"
                        {...register('M')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">L</span>

                      <input
                        type="number"
                        className="form-control"
                        {...register('L')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">XL</span>

                      <input
                        type="number"
                        className="form-control"
                        {...register('XL')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">XXL</span>

                      <input
                        type="number"
                        className="form-control"
                        {...register('XXL')}
                      />
                    </div>
                  </div>
                </div>
            : null
        }

        {
          data.subcategoria === 'splash' || data.categoria === 'belleza'
            ? null
            : <select
                className="form-select mt-1"
                {...register('genero')}
              >
                <option defaultValue>Unisex</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
        }

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary mt-3">{update ? 'Actualizar' : 'Agregar'} producto</button>

        </div>

      </form>
      {
        update &&
          <div className="d-grid gap-2">
            <button
                className='btn btn-secondary mt-3'
                onClick={() => setGetId(!getId)}
              >
                Cargar datos
              </button>
          </div>
      }
      <style jsx>{`
        .img-form
        {
          width: 10vh;
          height: 10vh;
          object-fit: cover;
        }

        .text-button
        {
          color: #fff;
          margin: 0;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center
        }

        .input-container
        {
          position: relative;
          padding: 1.5%;
          max-width: 200px;
          background-color: #262626;
          display: flex;
          justify-content: center;
          align-items: center
        }

        .input
        {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .vh-10
        {
          height: 10vh;
        }
        
        .container-2
        {
          max-width: 65vw;
        }
      `}</style>
    </div>
  )
}

export default Form
