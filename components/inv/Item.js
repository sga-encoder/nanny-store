import Link from 'next/link'
const Item = ({ array }) => {
  return (
    <>
      {
        array.map(({ id, ref, nombre, images, cantidad, categoria, subcategoria, precio }) => {
          const cantidadTotal = () => {
            if (typeof cantidad === 'object') {
              return (parseInt(cantidad.S) + parseInt(cantidad.M) + parseInt(cantidad.L) + parseInt(cantidad.XL) + parseInt(cantidad.XXL))
            } else {
              return (cantidad)
            }
          }

          return (
            <Link key={id} href={`/inv/ver/${ref}`}>
              <a className='a'>
                <div className="col">
                  <div className="card card-content">
                    <img src={images} className="card-img-top" alt={nombre} />
                    <div className="card-body">
                      <div className="card-text">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">{nombre}</div>
                          </div>
                          <div className="row">
                            <div className="col text-start fw-bold">Subcategoria:</div>
                            <div className="col">{subcategoria}</div>
                          </div>
                          <div className="row">
                            <div className="col text-start fw-bold">Precio:</div>
                            <div className="col">{precio}</div>
                          </div>
                          <div className="row">
                            <div className="col text-start fw-bold">Cantidad:</div>
                            <div className="col">{cantidadTotal()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )
        })
      }
      <style jsx>{`
        .a
        {
          color: #fff;
          text-decoration: none
        }
        .card-container
        {
          height: 70vh;
          overflow: auto;
        }

        .card-container::-webkit-scrollbar
        {
          display: none;
        }

        .card-content
        {
          width: 100%;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 8%;
          overflow: hidden;
        }

        .w-107
        {
          width: 107%
        }

        .card img
        {
          width: 25vh;
          height: 25vh;
          object-fit: cover;
        }

        .form-increment input
        {
          width: 60px;
        }

        .group-2
        {
          padding: 0.375rem 0.8rem;
        }

        .form-increment-2 input
        {
          width:70%;
        }
      `}</style>
    </>
  )
}

export default Item
