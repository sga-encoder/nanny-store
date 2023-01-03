import { useRouter } from 'next/router'
import { deleteProduct } from '../../utils/firebase'
import { toastify } from '../../utils/toastify'
import { TiTimes } from 'react-icons/ti'

const Eliminar = ({ productData, close }) => {
  const router = useRouter()
  return (
    <>
      <div className="container container-2 bg-light">
        <h3>Eliminar producto</h3>
        <div className="card">
          <img src={productData.images} className="card-img-top img"/>
          <div className="card-body">
            <p className="card-text text-center">
              Estas seguro de que quieres eliminar este producto
            </p>
            <div>
              <button
                className="btn btn-danger container-2"
                onClick={() => {
                  deleteProduct(productData.id, productData.images)
                  toastify('El procucto se a eliminado correctamente', 'success')
                  router.push('/inv')
                }}>
                Elimininar
              </button>
              <button className="btn btn-dark m-2" onClick={() => { close() }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn btn-danger" onClick={() => { close() }}><TiTimes/></button>
        </div>
      </div>
      <div className="glass"></div>
      <style jsx>{`
        .container
        {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          padding: 2%;
          z-index: 300;
        }

        .glass
        {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index:200;
          backdrop-filter: blur(5px);
        }

        .btn-container
        {
          position: absolute;
          top: 6%;
          left: 2%;
        }

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

        .img
        {
          width: 30vh;
          height: 30vh;
          object-fit: cover;
          margin: 0 auto;
        }
      `}</style>
    </>

  )
}

export default Eliminar
