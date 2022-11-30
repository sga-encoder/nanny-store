import { getBill } from '../../../utils/firebase'
import Return from '../../../components/Return'
import { zeroAdd } from '../../../utils/zeroAdd'

const NumberFac = ({ billData }) => {
  const { nombre, numeroDeFacturacion, direccion, telefono, productosVendidos } = billData
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
                    productosVendidos.map((product) => (
                      <tr key={product.id}>
                        <th>{product.ref}</th>
                        {
                            product.categoria === 'ropa'
                              ? <td>{product.nombre} {`(${product.talla})`}</td>
                              : <td>{product.nombre}</td>
                        }
                        <td>{product.cantidadVendida}</td>
                        <td>{product.precio}</td>
                        <td>{product.precio * product.cantidadVendida}</td>
                      </tr>
                    ))
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
  const bill = await getBill(parseInt(numberFac))
  console.log(bill[0].productosVendidos)

  return {
    props: {
      billData: {
        nombre: bill[0].nombre,
        numeroDeFacturacion: bill[0].numeroDeFacturacion,
        direccion: bill[0].direccion,
        telefono: bill[0].telefono,
        productosVendidos: bill[0].productosVendidos
      }
    }
  }
}

export default NumberFac
