import { getCollection, docProducts } from '../../utils/firebase'
import { BsPencil } from 'react-icons/bs'
import { BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import Return from '../../components/Return'

const Crud = ({ products }) => {
  return (
    <div className='container container-center'>
      <h2>Lista de Productos</h2>
      <div className='container-content'>
        <table className="table table-light table-striped-columns m-3">
          <thead>
            <tr>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Ref
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Imagen
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Nombre
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Categoria
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Subcategoria
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Costo
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Precio
                </div>
              </th>
              <th scope="col">
                <div className='content-center table-content-center'>
                  Genero
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
              products.map(({ id, nombre, ref, images, categoria, subcategoria, precio, costo, genero }) => (
                <tr key={id}>
                  <th scope="row">
                    <div className='table-content-center'>
                      {ref}
                    </div>
                  </th>
                  <td>
                    <div className='table-content-center'>
                      <img
                        className="img-table"
                        src={images}
                        alt={nombre}
                      />
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {nombre}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {categoria}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {subcategoria}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {costo}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {precio}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      {genero}
                    </div>
                  </td>
                  <td>
                    <div className='table-content-center'>
                      <Link href={`/crud/actualizar/${id}`}>
                        <a className='btn btn-success m-2'>
                          <BsPencil />
                        </a>
                      </Link>
                      <Link href={`/crud/eliminar/${id}?url=${images}`}>
                        <a className='btn btn-danger m-2'>
                          <BiTrashAlt />
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

      <Link href={'/crud/crear'}>
        <div className='d-grid gap-2 w100'>
          <a className='btn btn-primary m-2'>Agregar Producto</a>
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

export async function getServerSideProps () {
  const products = await getCollection(docProducts)
  return { props: { products } }
}

export default Crud
