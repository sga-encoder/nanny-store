import { useForm } from 'react-hook-form'

const Form = ({ functionHandleChange, functionHandleSubmit, data }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    functionHandleSubmit(data)
  }

  const switchSubcategory = () => {
    switch (data.category) {
      case 'accessory':
        return (
          <>
            <option value="bracelet">pulsera</option>
            <option value="keyRing">llavero</option>
            <option value="other">otros</option>
          </>
        )

      case 'beauty':
        return (
          <>
            <option value="facialCare">Cuidado Facial</option>
            <option value="other">otro</option>
          </>
        )

      case 'clothes':
        return (
          <>
            <option value="tShirt">Camiseta</option>
            <option value="poloShirt">Polos</option>
            <option value="underpants">Boxers</option>
            <option value="stockings">Medias</option>
            <option value="other">otro</option>
          </>
        )

      case 'fragrance':
        return (
          <>
            <option value="fragrance">Perfumes</option>
            <option value="splash">splash</option>
            <option value="other">otro</option>
          </>
        )

      default:
        return (
          <>
            <option value="fragrance">-- no hay subcategorias --</option>
          </>
        )
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          className="form-select form-select-lg mt-2"
          {...register('category')}
          onChange={functionHandleChange}
        >
          <option defaultValue>-- selecione la categoria --</option>
          <option value="accessory">Accesorio</option>
          <option value="beauty">belleza</option>
          <option value="clothes">Ropa</option>
          <option value="fragrance">fragancia</option>
        </select>

        <select
          className="form-select form-select-lg mt-3 mb-3"
          {...register('subcategory')}
          onChange={functionHandleChange}
        >
          <option defaultValue>-- selecione la subcategoria --</option>
          {switchSubcategory()}
        </select>

        <div className="form-floating mb-3">
          <input
            type="tex"
            className="form-control"
            placeholder="ref"
            {...register('ref')}
          />
          <label htmlFor="floatingInput">Ref</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="nombre"
            {...register('name')}
          />
          <label htmlFor="floatingInput">Nombre</label>
        </div>

        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="costo"
                  {...register('cost')}
                />
                <label htmlFor="cost">Costo</label>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="precio"
                  {...register('price')}
                />
                <label htmlFor="price">Precio</label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            className="form-control form-control-lg"
            type="file"
            id="formFile"
            {...register('images')}
          />
        </div>
        {
          data.category !== 'clothes' &&
            data.subcategory === 'stockings' &&
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="cantidad"
                {...register('amount')}
              />
              <label htmlFor="floatingInput">Cantidad</label>
            </div>
        }

        {
          data.category === 'clothes'
            ? data.subcategory === 'stockings'
              ? null
              : <div className="row">
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">S</span>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register('S')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">M</span>

                      <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register('M')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">L</span>

                      <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register('L')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">XL</span>

                      <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register('XL')}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">XXL</span>

                      <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register('XXL')}
                      />
                    </div>
                  </div>
                </div>
            : null
        }

        {
          data.subcategory === 'splash' || data.category === 'beauty'
            ? null
            : <select
                className="form-select form-select-lg mt-3"
                {...register('gender')}
              >
                <option defaultValue>-- selecione un genero --</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
        }

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary mt-3 btn-lg">Agregar producto</button>
        </div>

      </form>
    </div>
  )
}

export default Form
