import { useRouter } from 'next/router'

const NumberFac = () => {
  const router = useRouter()
  const { numberFac } = router.query

  const numberBill = numberFac
  return (
    <>
      <div className="container">
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
                      value={numberBill}
                      readOnly
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
                      value={numberBill}
                      readOnly
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
                      value={numberBill}
                      readOnly
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
              {/* {
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
              } */}
            </tbody>
          </table>
            </div>
            </div>
        </div>
        <div className="container"></div>
      </div>
    </>
  )
}

export default NumberFac
