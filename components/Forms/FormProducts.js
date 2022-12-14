import { useForm } from 'react-hook-form'
import { useEffect, useState, useRef } from 'react'

const Form = ({ functionHandleChange, functionHandleSubmit, data, data2, change, update }) => {
  const { register, handleSubmit, setValue } = useForm()
  const [categoria, setCategoria] = useState('')
  const [subcategoria, setSubcategoria] = useState('')
  const width = useRef(null)
  const [divWidth, setDivWidth] = useState(0)

  useEffect(() => {
    setDivWidth(width.current.clientWidth)
    console.log(divWidth)
  })

  useEffect(() => {
    if (update) {
      if (change) {
        setValue('categoria', data2.categoria)
      } else {
        setValue('categoria', data.categoria)
      }
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
  }, [categoria])

  useEffect(() => {
    if (!update) {
      setValue('ref', `${categoria}${subcategoria}`)
    } else {
      if (change) {
        setValue('ref', `${categoria}${subcategoria}`)
      }
    }
  }, [categoria, subcategoria])

  const onSubmit = (data) => {
    functionHandleSubmit(data)
  }

  const switchSubcategory = (e) => {
    switch (e.categoria) {
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
            <option value="otros">Otros</option>
          </>
        )

      case 'ropa':
        return (
          <>
            <option value="camiseta">Camiseta</option>
            <option value="polo">Polo</option>
            <option value="boxer">Boxer</option>
            <option value="medias">Medias</option>
            <option value="otros">otro</option>
          </>
        )

      case 'fragancia':
        return (
          <>
            <option value="perfume">Perfume</option>
            <option value="splash">splash</option>
            <option value="otros">otros</option>
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

  const handleChange = (e) => {
    const { name, value } = e.target
    functionHandleChange(e)
    if (name === 'categoria') {
      switch (value) {
        case 'accesorio':
          setCategoria('ac')
          setSubcategoria('')
          break
        case 'belleza':
          setCategoria('be')
          setSubcategoria('')
          break
        case 'ropa':
          setCategoria('ro')
          setSubcategoria('')
          break
        case 'fragancia':
          setCategoria('fr')
          setSubcategoria('')
          break
        default:
          setCategoria('')
          setSubcategoria('')
          break
      }
    } else if (name === 'subcategoria') {
      if (categoria === 'ac') {
        switch (value) {
          case 'pulsera':
            setSubcategoria('pu')
            break

          case 'llavero':
            setSubcategoria('la')
            break

          case 'otros':
            setSubcategoria('ot')
            break

          default:
            setSubcategoria('')
            break
        }
      } else if (categoria === 'be') {
        switch (value) {
          case 'cuidado facial':
            setSubcategoria('cf')
            break
          case 'otros':
            setSubcategoria('ot')
            break

          default:
            setSubcategoria('')
            break
        }
      } else if (categoria === 'ro') {
        switch (value) {
          case 'camiseta':
            setSubcategoria('ca')
            break
          case 'polo':
            setSubcategoria('po')
            break
          case 'boxer':
            setSubcategoria('bo')
            break
          case 'medias':
            setSubcategoria('me')
            break
          case 'otros':
            setSubcategoria('ot')
            break
          default:
            setSubcategoria('')
            break
        }
      } else if (categoria === 'fr') {
        switch (value) {
          case 'perfume':
            setSubcategoria('pe')
            break
          case 'splash':
            setSubcategoria('sp')
            break
          case 'otros':
            setSubcategoria('ot')
            break
          default:
            setSubcategoria('')
            break
        }
      }
    }
    setValue('ref', `${categoria}${subcategoria}`)
  }

  return (
    <div ref={width} className={divWidth >= 400 ? 'container-2' : 'container-2 fs-5'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          className="form-select mt-2"
          {...register('categoria')}
          onChange={handleChange}
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
          onChange={handleChange}
        >
          <option defaultValue>-- selecione la subcategoria --</option>
          {switchSubcategory(change ? data2 : data)}
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
