import { Link } from 'next/link'
const index = () => {
  return (
    <div className='container'>
      <Link href={'/crud/crear'}>
        <div className='d-grid gap-2 w100'>
          <a className='btn btn-primary m-2'>CRUD</a>
        </div>
      </Link>
    </div>
  )
}

export default index
