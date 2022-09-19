import { useRouter } from 'next/router'
import Link from 'next/link'
import { deleteProduct } from '../../../utils/firebase'

const eliminar = () => {
  const router = useRouter()
  const { id } = router.query
  const { url } = router.query

  console.log(id, '=>', url)
  return (

    <div className="container container-2">
      <h3>Eliminar producto</h3>
      <div className="card">
        <img src={url} className="card-img-top"/>
        <div className="card-body">
          <p className="card-text text-center">Estas seguro de que quieres eliminar este producto</p>
          <div>
            <button className="btn btn-danger container-2" onClick={() => { deleteProduct(id, url); router.push('/') }}>
              Elimininar
            </button>
            <Link href={'/'}>
              <a className='btn btn-dark m-2'>
                Cancelar
              </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        div>div
        {
          max-width: 50vh;
        }  

        div>div>div>div
        {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container-2
        {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }  
      `}</style>
    </div>

  )
}

export default eliminar
