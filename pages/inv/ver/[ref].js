import { getProduct } from '../../../utils/firebase'
import Return from '../../../components/Return'
import { zeroAdd } from '../../../utils/zeroAdd'
import { BsPencil } from 'react-icons/bs'
import { BiTrashAlt } from 'react-icons/bi'
import Actualizar from '../../../components/Actualizar'
import Popup from 'reactjs-popup'
import Eliminar from '../../../components/Eliminar'
import Agregar from '../../../components/Agregar'
import { useRef, useState, useEffect } from 'react'
import Navbar from './../../../components/Navbar'

const Ref = ({ product }) => {
  const { nombre, images, ref, precio, costo, ultimaModificacion, categoria, subcategoria, fechaDeCreacion, historialDeVentas, cantidad } = product[0]
  const width = useRef(null)
  const [divWidth, setDivWidth] = useState(0)

  useEffect(() => {
    setDivWidth(width.current.clientWidth)
    console.log(divWidth)
  })

  return (
    <>
      <Navbar />
      <h2 className='auto'>{nombre}</h2>
      <div ref={width} className={divWidth >= 720 ? 'container row auto' : 'container col auto'}>
        <div className={divWidth >= 720 ? 'col img-container' : 'col img-container img-container-col'}>
          <img src={images} alt={nombre} />
        </div>
        <div className="col">
          <table className="table table-striped-columns mini  m-3">
            <thead>
              <tr>
                <th colSpan="2" scope="col">
                  <div className='content-center table-content-center'>Tabla de Datos</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Ref:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {ref}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Costo:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {costo}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Precio:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {precio}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Categoria:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {categoria}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Subcategoria:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {subcategoria}
                  </div>
                </td>
              </tr>

              {
                categoria === 'ropa'
                  ? <tr>
                    <th scope="row">
                      <div className='table-content-center'>
                        cantidad:
                      </div>
                    </th>
                    <td style={{ padding: 0 }}>
                      <div className='table-content-center'>
                        <table className="table minimini">
                          <thead>
                            <tr className="table-active">
                              <th scope='col'>
                                <div className='table-content-center'>talla</div>
                              </th>
                              <th scope='col'>
                                <div className='table-content-center'>#</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-active">
                              <th scope="row">
                                <div className='table-content-center'>
                                  S:
                                </div>
                              </th>
                              <td>
                                <div className='table-content-center'>
                                  {cantidad.S}
                                </div>
                              </td>
                            </tr>
                            <tr className="table-active">
                              <th scope="row">
                                <div className='table-content-center'>
                                  M:
                                </div>
                              </th>
                              <td>
                                <div className='table-content-center'>
                                  {cantidad.M}
                                </div>
                              </td>
                            </tr>
                            <tr className="table-active">
                              <th scope="row">
                                <div className='table-content-center'>
                                  L:
                                </div>
                              </th>
                              <td>
                                <div className='table-content-center'>
                                  {cantidad.L}
                                </div>
                              </td>
                            </tr>
                            <tr className="table-active">
                              <th scope="row">
                                <div className='table-content-center'>
                                  XL:
                                </div>
                              </th>
                              <td>
                                <div className='table-content-center'>
                                  {cantidad.XL}
                                </div>
                              </td>
                            </tr>
                            <tr className="table-active">
                              <th scope="row">
                                <div className='table-content-center'>
                                  XXL:
                                </div>
                              </th>
                              <td>
                                <div className='table-content-center'>
                                  {cantidad.XXL}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                    </tr>
                  : <tr>
                      <th scope="row">
                        <div className='table-content-center'>
                          Cantidad:
                        </div>
                      </th>
                      <td>
                        <div className='table-content-center'>
                          {cantidad}
                        </div>
                      </td>
                    </tr>
              }
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Ultima Modificacion:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {ultimaModificacion}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Creacion:
                  </div>
                </th>
                <td>
                  <div className='table-content-center'>
                    {fechaDeCreacion}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className='table-content-center'>
                    Accion:
                  </div>
                </th>
                <td>
                  <div className='table-content-center d-flex justify-content-around'>
                    <Popup
                      arrow={false}
                      position="center center"
                      trigger={<button className="btn btn-success"><BsPencil /></button>}
                    >
                      {
                        close => (<Actualizar productData={product[0]} close={close}/>)
                      }
                    </Popup>
                    <Popup
                      arrow={false}
                      position="center center"
                      trigger={<button className="btn btn-danger"><BiTrashAlt /></button>}
                    >
                      {
                        close => (<Eliminar productData={product[0]} close={close}/>)
                      }
                  </Popup>
                  <Popup
                    arrow={false}
                    position="center center"
                    trigger={<button className="btn btn-info">+</button>}
                  >
                    {
                      close => (<Agregar productData={product[0]} close={close}/>)
                    }
                  </Popup>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="auto">historial de Ventas</h2>
      <div className="container auto row">
        <table className="table table-light table-striped-columns m-3">
          <thead>
            <tr>
              <th scope="col">
                <div className='content-center table-content-center'>
                  N°Fac
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Fecha de Venta
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Cantidad Vendida
                </div>
              </th>
              {
                categoria === 'ropa' &&
                  <th scope="col">
                    <div className='content-center table-content-center'>
                      Talla
                    </div>
                  </th>
              }
            </tr>
          </thead>

          <tbody>
            {
              historialDeVentas.map(({ numeroDeFacturacion, fechaDeVenta, cantidadVendida, talla }) => (
                <tr key={numeroDeFacturacion}>
                  <th scope="row">
                    <div className='table-content-center'>
                      {zeroAdd(numeroDeFacturacion)}
                    </div>
                  </th>
                  <td>
                    <div className='table-content-center'>
                      {fechaDeVenta}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {cantidadVendida}
                    </div>
                  </td>
                  {
                    categoria === 'ropa' &&
                      <td>
                        <div className='table-content-center'>
                          {talla}
                        </div>
                      </td>
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Return href='/inv'/>

      <style jsx>{`
        .auto
        {
          margin: 1% auto;
          text-align: center;
          text-transform: capitalize;
        }
        .img-container
        {
          width: 40vw;
          height: 40vw;
          padding: 5%;
        }

        .img-container-col
        {
          width: 100%
        }
        
        .img-container img    
        {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .img-container-col img
        {
          margin: 0 auto;
        }
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

        .table.mini .table-content-center
        {
          height: auto;
        }

        .table.minimini
        {
          margin: 0;
        }
        .table.minimini div
        {
          font-size: .6em;
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

export async function getServerSideProps (context) {
  const { ref } = context.query
  const product = await getProduct(ref)

  return { props: { product } }
}

export default Ref
