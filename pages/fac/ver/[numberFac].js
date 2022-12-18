import { getBill } from '../../../utils/firebase'
import Return from '../../../components/Return'
import { zeroAdd } from '../../../utils/zeroAdd'

const NumberFac = ({ billData }) => {
  const { nombre, numeroDeFacturacion, direccion, telefono, productosVendidos } = billData[0]
  // const [totalPrice, setTotalPrice] = useState()
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
                          value={nombre}
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
                          value={zeroAdd(numeroDeFacturacion)}
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
                          value={direccion}
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
                          value={telefono}
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
                    <th>precio</th>
                    <th>total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productosVendidos.map(({ id, ref, categoria, nombre, talla, cantidadVendida, precio }) => {
                      const price = cantidadVendida * precio
                      console.log(talla)
                      return (
                        <tr key={id}>
                          <th>{ref}</th>
                          {
                            categoria === 'ropa'
                              ? <td><span>{nombre}</span> (<span>{talla}</span>)</td>
                              : <td>{nombre}</td>
                          }
                          <td>{cantidadVendida}</td>
                          <td>{precio}</td>
                          <td>{price}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container"></div>
      </div>
      <Return href={'/fac'} />
    </>

  )
}

export async function getServerSideProps (context) {
  const { numberFac } = context.query
  const billData = await getBill(parseInt(numberFac))

  return { props: { billData } }
}

export default NumberFac
