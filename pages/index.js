import Link from 'next/link'

const index = () => {
  return (
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
    </div>
  )
}

export default index
