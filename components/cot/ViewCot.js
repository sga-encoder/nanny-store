import { zeroAdd } from '../../utils/zeroAdd'
import { BsEye } from 'react-icons/bs'
import Link from 'next/link'

const ViewCot = ({ array }) => {
  return (
    array.map((quote) => {
      const { id, numeroDeCotizacion, fechaDeCotizacion, nombre, telefono, abono, total } = quote
      return (
        <tr key={id}>
          <th scope="row">
            <div className='table-content-center'>
              {zeroAdd(numeroDeCotizacion)}
            </div>
          </th>
          <td>
            <div className='table-content-center'>
              {fechaDeCotizacion}
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
            <div className='table-content-center'>
              {abono}
            </div>
          </td>
          <td>
            <div className='table-content-center'>
              {total}
            </div>
          </td>
          <td>
            <div className='table-content-center'>
              <Link href={`/cot/ver/${zeroAdd(numeroDeCotizacion)}`}>
                <a className='btn btn-dark m-2'>
                  <BsEye />
                </a>
              </Link>
            </div>
          </td>
        </tr>
      )
    })
  )
}

export default ViewCot
