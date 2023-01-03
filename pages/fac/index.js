import Return from '../../components/Return'
import { getCollection, docBills } from '../../utils/firebase'
import { BsEye, BsFillCloudArrowDownFill } from 'react-icons/bs'
import Link from 'next/link'
import { zeroAdd } from '../../utils/zeroAdd'
import PDF from '../../components/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState, useEffect } from 'react'
import Navbar from './../../components/Navbar'

const FacVer = ({ bills }) => {
  const [render, setRender] = useState(false)
  useEffect(() => { setRender(!render) }, [])

  return (
    <>
      <Navbar active={'fac'}/>
      <div className='container container-center'>
        <h2>Lista de Facturas</h2>
        <div className='container-content'>
          <table className="table table-light table-striped-columns m-3">
            <thead>
              <tr>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    N°
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Fecha de Facturacion
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Cliente
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Telefono
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Productos
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {
                bills.map((bill) => {
                  const { id, numeroDeFacturacion, fechaDeFacturacion, nombre, telefono, productosVendidos } = bill
                  return (
                    <tr key={id}>
                      <th scope="row">
                        <div className='table-content-center'>
                          {zeroAdd(numeroDeFacturacion)}
                        </div>
                      </th>
                      <td>
                        <div className='table-content-center'>
                          {fechaDeFacturacion}
                        </div>
                      </td>
                      <td>
                        <div className='table-content-center'>
                          {nombre}
                        </div>
                      </td>
                      <td>
                        <div className='table-content-center'>
                          {telefono}
                        </div>
                      </td>
                      <td>
                        {
                          productosVendidos.map((productos) => (
                            <img
                              key={productos.id}
                              className="img-table"
                              src={productos.images}
                              alt={productos.nombre}
                            />
                          ))
                        }
                      </td>
                      <td>
                        <div className='table-content-center'>
                          <Link href={`/fac/ver/${zeroAdd(numeroDeFacturacion)}`}>
                            <a className='btn btn-dark m-2'>
                              <BsEye />
                            </a>
                          </Link>
                          <button className='btn btn-light m-2'>
                            {
                              render
                                ? <PDFDownloadLink document={<PDF billData={bill} />} filename={`factura N ${zeroAdd(numeroDeFacturacion)}`}>
                                    <button >
                                      <BsFillCloudArrowDownFill />
                                    </button>
                                  </PDFDownloadLink>
                                : null
                            }

                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <Link href={'/fac/crear'}>
          <div className='d-grid gap-2 w100'>
            <a className='btn btn-primary m-2'>Crear una nueva factura</a>
          </div>
        </Link>
      </div>
      <Return href='/'/>

      <style jsx>{`
        .container-center,
        .table-content-center
        {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex-direction: column;
        }
        
        .table-content-center
        {
          height: 10vh;
          flex-direction: row;
        }

        .content-center
        {
          height: 5vh;
        }
        
        .img-table
        {
          width: 10vh;
          height: 10vh;
          object-fit: cover;
        }

        .container-content
        {
          padding-top: 50vh;
          width: 100%;
          max-height: 70vh;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container-content::-webkit-scrollbar
        {
          display: none;
        }

        .w100
        {
          width: 100%
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps () {
  const billsPrev = await getCollection(docBills)
  const bills = billsPrev.sort((a, b) => {
    if (a.numeroDeFacturacion < b.numeroDeFacturacion) {
      return 1
    }
    if (a.numeroDeFacturacion > b.numeroDeFacturacion) {
      return -1
    }
    return 0
  })

  return {
    props: {
      bills
    }
  }
}

export default FacVer
