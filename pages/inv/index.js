import { FiSearch } from 'react-icons/fi'
import Return from '../../components/Return'
import { getCollection, docProducts } from '../../utils/firebase'
import Popup from 'reactjs-popup'
import Crear from '../../components/inv/Crear'
import { useState } from 'react'
import Item from './../../components/inv/Item'
import Navbar from '../../components/Navbar'

const index = ({ products }) => {
  const [resultSearch, setResultSearch] = useState([])
  const [search, setSearch] = useState('')

  const filter = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    const resultadosBusqueda = products.filter((product) => {
      if (
        product.ref.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.nombre.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.categoria.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        product.subcategoria.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase())
      ) {
        return product
      }
    })
    setResultSearch(resultadosBusqueda)
  }

  const handleChange = (e) => {
    filter(e.target.value)
    setSearch(e.target.value)
  }

  return (
    <>
      <Navbar active='inv'/>
      <div className="container">
        <h1>Inventario</h1>
        <div className="container">
          <div className="input-group md-3">
            <div className="form-floating">
              <input type="text" className="form-control" id="search" placeholder="buscar" onChange={handleChange} value={search}/>
              <label htmlFor="search">Busca aqui el producto</label>
            </div>
            <span className="input-group-text"><FiSearch /></span>
          </div>
        </div>
        <div className='container text-center'>
          <div className="row row-cols-4 card-container">
            {
              search === ''
                ? <Item array={products} />
                : <Item array={resultSearch} />
            }
          </div>

        </div>
        <Return href="/" />
        <div className='d-grid gap-2 w100'>
          <Popup
            arrow={false}
            position="center center"
            trigger={<button className='btn btn-primary m-2'>Agregar Producto</button>}
          >
            {
              close => (<Crear close={close}/>)
            }
          </Popup>
          </div>
      </div>
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

        .card-container img
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

export async function getServerSideProps () {
  const products = await getCollection(docProducts)
  return { props: { products } }
}

export default index
