import Link from 'next/link'
import Navbar from '../components/Navbar'

const index = () => {
  return (
    <>
      <Navbar active={'/'}/>
      <div className='container'>
        <Link href='/inv'>
          <div className='d-grid gap-2 w100'>
            <a className='btn btn-primary m-2'>INVENTARIO</a>
          </div>
        </Link>
        <Link href='/fac'>
          <div className='d-grid gap-2 w100'>
            <a className='btn btn-primary m-2'>FACTURACION</a>
          </div>
        </Link>
        <Link href='/cot'>
          <div className='d-grid gap-2 w100'>
            <a className='btn btn-primary m-2'>COTIZACIONES</a>
          </div>
        </Link>
      </div>
    </>
  )
}

export default index
