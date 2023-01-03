import { getQuote, payQuote, quoteToBill } from '../../../utils/firebase'
import Return from '../../../components/Return'
import { zeroAdd } from '../../../utils/zeroAdd'
import Navbar from './../../../components/Navbar'
import { useState } from 'react'
import { toastify } from '../../../utils/toastify'
import { useRouter } from 'next/router'

const NumberCot = ({ quoteData }) => {
  const { nombre, numeroDeCotizacion, direccion, telefono, productosCotizados, fechaDeCotizacion, vigencia, total, abono, id } = quoteData[0]
  const [change, setChange] = useState(false)
  const [pay, setPay] = useState(0)
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container">
          <h1 className='text-center'>Cotizacion</h1>
          <div className="row overflow-auto h-80vh">
            <div className="col">
              <div className='container'>
                <div className="d-grid gap-2">
                  <div className="row">
                    <div className="col-5">
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
                          id="fechaDeCotizacion"
                          placeholder="fechaDeCotizacion"
                          value={fechaDeCotizacion}
                          readOnly
                        />
                        <label htmlFor="telefono">Fecha De Cotizacion:</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="vigencia"
                          placeholder="vigencia"
                          value={vigencia}
                          readOnly
                        />
                        <label htmlFor="telefono">Vigencia:</label>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="N"
                          placeholder="N"
                          value={zeroAdd(numeroDeCotizacion)}
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
                    productosCotizados.map(({ id, ref, categoria, nombre, talla, cantidadVendida, precio }) => {
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
                  <tr>
                    {
                      parseInt(abono) === parseInt(total)
                        ? <>
                          <th>Estado:</th>
                          <td>Pagado</td>
                          <td></td>
                          <td>Total:</td>
                          <td>{total}</td>
                        </>
                        : <>
                        <th>Abonado:</th>
                        <td>
                          {abono} +
                          <div className='w-60'>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              id="abono"
                              placeholder="abono"
                              value={pay}
                              onChange={(e) => {
                                setChange(true)
                                setPay(parseInt(e.target.value))
                              }}
                            />
                          </div>
                        </td>
                        <td>Restante:</td>
                        <td>{total - abono - pay}</td>
                        <td>Total: {total}</td>
                      </>
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container">
          {
            parseInt(abono) === parseInt(total)
              ? null
              : <div className="d-grid gap-2 mt-2">
              {
                change &&
                  parseInt(total) === parseInt(pay) + parseInt(abono)
                  ? <button
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          toastify('Se Creo La Factura Correctamente', 'success')
                          quoteToBill(quoteData[0])
                          router.push('/')
                        }}
                      >
                        Crear Factura
                      </button>

                  : <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      toastify('Se Abono Correctamente', 'success')
                      payQuote(pay, abono, id)
                      router.push('/')
                    }}
                  >
                    Abonar
                  </button>
              }
            </div>
          }
        </div>
      </div>
      <Return href={'/cot'} />
      <style jsx>
        {`
        .h-80vh
        {
          height:68vh;
        }

        .w-60
        {
          margin-left: 15px;
          width: 50%;
          display: inline-block
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
    </>

  )
}

export async function getServerSideProps (context) {
  const { numberCot } = context.query
  const quoteData = await getQuote(parseInt(numberCot))

  return { props: { quoteData } }
}

export default NumberCot
