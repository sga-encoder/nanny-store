import { useEffect, useState } from 'react'
import { getCollection, docProducts, addBill, getNumberBill } from '../../../utils/firebase'
import { FiSearch } from 'react-icons/fi'
import Popup from 'reactjs-popup'
import Return from './../../../components/Return'

const index = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [selectSearch, setSelectSearch] = useState({ nombre: '' })
  const [resultSearch, setResultSearch] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [dataBill, setDataBill] = useState({})
  const [cantidad, setCantidad] = useState('')
  const [size, setSize] = useState('U')
  const [numberBill, setNumberBill] = useState('0000')

  useEffect(() => {
    readData()
  }, [])

  const readData = async () => {
    const dataProducts = await getCollection(docProducts)
    setProducts(dataProducts)
    const numberBillData = await getNumberBill()
    setNumberBill(zeroAdd(numberBillData.numero_de_facturacion + 1))
  }

  const zeroAdd = (number) => {
    if (number <= 9) {
      return '000' + number
    } else if (number <= 99) {
      return '00' + number
    } else if (number <= 999) {
      return '0' + number
    } else if (number <= 9999) {
      return number
    }
  }

  const filter = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    const resultadosBusqueda = products.filter((product) => {
      if (
        product.ref.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.nombre.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.categoria.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.subcategoria.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase())
      ) {
        return product
      }
    })
    setResultSearch(resultadosBusqueda)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    filter(e.target.value)
  }

  const handleClick = (data, size) => {
    setSelectSearch(data)
    setResultSearch([])
    setSearch('')
    setSize(size)
  }

  return (
    <div className="container">
      <h1 className='text-center'>Factura de Venta</h1>
      <div className="row overflow-auto h-80vh">
        <div className="col">
          <div className='container'>
            <div className="d-grid gap-2">
              <div className="row">
                <div className="col-9">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="nombre"
                      placeholder="nombre"
                      onChange={(e) => { setDataBill({ ...dataBill, nombre: e.target.value }) }}
                    />
                    <label htmlFor="nombre">Nombre:</label>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="N"
                      placeholder="N"
                      value={numberBill}
                      readOnly
                    />
                    <label htmlFor="N">N:</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="direccion"
                      placeholder="direccion"
                      onChange={(e) => { setDataBill({ ...dataBill, direccion: e.target.value }) }}
                    />
                    <label htmlFor="direccion">Direccion:</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="telefono"
                      placeholder="telefono"
                      onChange={(e) => { setDataBill({ ...dataBill, telefono: e.target.value }) }}
                    />
                    <label htmlFor="telefono">Telefono:</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>ref</th>
                <th>nombre</th>
                <th>cantidad</th>
                <th>costo</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {
                listProducts.map((product) => (
                  <tr key={product[0].id}>
                    <th>{product[0].ref}</th>
                    {
                        product[0].categoria === 'ropa'
                          ? <td>{product[0].nombre} {`(${product[2]})`}</td>
                          : <td>{product[0].nombre}</td>
                    }
                    <td>{product[1]}</td>
                    <td>{product[0].precio}</td>
                    <td>{product[0].precio * product[1]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="col">
          <div className="container">
            <div className="input-group md-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="buscar"
                  onChange={handleChange}
                  value={search} />
                <label htmlFor="search">Buscar aqui el producto</label>
              </div>
              <span className="input-group-text"><FiSearch /></span>
            </div>
          </div>

          <div className="container mt-2">
            <p className="form-control nombre" >
              {selectSearch.nombre}
            </p>
          </div>

          <div className="container mt-2">
            <div className="d-grid gap-2">
              {
                resultSearch.map((product) => (
                  product.categoria === 'ropa'
                    ? <Popup
                      key={product.id}
                      arrow={false}
                      position="center center"
                      trigger={
                        <div
                          className="col"
                        >
                          <div className="card card-content">
                            <div className="card-body">
                              <div className="card-text">
                                <div className="container">
                                  <div className="row">
                                    <div className="col text-start fw-bold">Nombre:</div>
                                    <div className="col">{product.nombre}</div>
                                  </div>
                                  <div className="row">
                                    <div className="col text-start fw-bold">Ref:</div>
                                    <div className="col">{product.ref}</div>
                                  </div>
                                  <div className="row">
                                    <div className="col text-start fw-bold">Categoria:</div>
                                    <div className="col">{product.categoria}</div>
                                  </div>
                                  <div className="row">
                                    <div className="col text-start fw-bold">Subcategoria:</div>
                                    <div className="col">{product.subcategoria}</div>
                                  </div>
                                  {
                                    product.subcategoria === 'medias'
                                      ? <div className="row">
                                        <div className="col text-start fw-bold">Cantidad:</div>
                                        <div className="col">{product.cantidad}</div>
                                      </div>

                                      : <div className="row">
                                        <div className="col text-start fw-bold">Cantidad:</div>
                                        <div className="col">
                                          <div className="row">
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">S:</div>
                                                <div className="col">{product.cantidad.S}</div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">M:</div>
                                                <div className="col">{product.cantidad.M}</div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">L:</div>
                                                <div className="col">{product.cantidad.L}</div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">XL:</div>
                                                <div className="col">{product.cantidad.XL}</div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">XXL:</div>
                                                <div className="col">{product.cantidad.XXL}</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      {
                        close => (
                          <div className="col">
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => { handleClick(product, 'S') }}
                                  >
                                    S
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => { handleClick(product, 'M') }}
                                  >
                                    M
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => { handleClick(product, 'L') }}
                                  >
                                    L
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => { handleClick(product, 'XL') }}
                                  >
                                    XL
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => { handleClick(product, 'XXL') }}
                                  >
                                    XXL
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>
                        )
                      }
                    </Popup>
                    : <div
                        className="col"
                        onClick={() => { handleClick(product, 'U') }}
                      >
                        <div className="card card-content">
                          <div className="card-body">
                            <div className="card-text">
                              <div className="container">
                                <div className="row">
                                  <div className="col text-start fw-bold">Nombre:</div>
                                  <div className="col">{product.nombre}</div>
                                </div>
                                <div className="row">
                                  <div className="col text-start fw-bold">Ref:</div>
                                  <div className="col">{product.ref}</div>
                                </div>
                                <div className="row">
                                  <div className="col text-start fw-bold">Categoria:</div>
                                  <div className="col">{product.categoria}</div>
                                </div>
                                <div className="row">
                                  <div className="col text-start fw-bold">Cantidad:</div>
                                  <div className="col">{product.cantidad}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                ))
              }
            </div>
          </div>

          <div className="container">
            <div className="input-group md-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="cantidad"
                  placeholder="cantidad"
                  value={cantidad}
                  onChange={(e) => { setCantidad(e.target.value) }}
                />
                <label htmlFor="cantidadh">Cantidad</label>
              </div>
              <span className="input-group-text">{size}</span>
            </div>
          </div>

          <div className="d-grid gap-2 mt-2 px-2">
            <button
              className='btn btn-secondary btn-lg'
              onClick={() => {
                setListProducts([...listProducts, [selectSearch, cantidad, size]])
                setSelectSearch({ nombre: '' })
                setCantidad('')
              }}
            >
              Agregar Producto
            </button>
        </div>
      </div>
      </div>

      <div className="d-grid gap-2 mt-2">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            addBill(listProducts, { ...dataBill, numero_de_facturacion: parseInt(numberBill) })
          }}
        >
          Crear Factura
        </button>
      </div>

      <Return href={'/fac'} />

      <style jsx>
        {`
        .h-80vh
        {
          height:75vh;
        }

        .nombre
        {
          height:56px;
          margin-bottom: 0px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default index
