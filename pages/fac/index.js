import Return from '../../components/Return'
import { useEffect, useState } from 'react'
import { getCollection, docBills } from '../../utils/firebase'
import { BsEye, BsFillCloudArrowDownFill } from 'react-icons/bs'
import Link from 'next/link'
import { zeroAdd } from '../../utils/zeroAdd'

const index = () => {
  const [bills, setBills] = useState([])

  useEffect(() => {
    readBills()
    console.log(bills)
  }, [])

  const readBills = async () => {
    const data = await getCollection(docBills)
    setBills(data)
  }

  return (
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
              bills.map(({ id, numeroDeFacturacion, fechaDeFacturacion, nombre, telefono, productosVendidos }) => (
                <tr key={id}>
                  <th scope="row">
                    <div className='table-content-center'>
                      {zeroAdd(numeroDeFacturacion)}
                    </div>
                  </th>
                  <td>
                    <div className='table-content-center'>
                      {new Date(fechaDeFacturacion.seconds * 1000).toLocaleDateString()}

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
                      <Link href={`/crud/actualizar/${id}`}>
                        <a className='btn btn-light m-2'>
                          <BsFillCloudArrowDownFill />
                        </a>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Link href={'/fac/crear'}>
        <div className='d-grid gap-2 w100'>
          <a className='btn btn-primary m-2'>Crear una nueva factura</a>
        </div>
      </Link>

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
    </div>
  )
}

export default index
