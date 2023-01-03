import Return from '../../components/Return'
import { getCollection, docQuote } from '../../utils/firebase'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from './../../components/Navbar'
import { FiSearch } from 'react-icons/fi'
import ViewCot from '../../components/cot/ViewCot'

const FacVer = ({ quotes }) => {
  const [search, setSearch] = useState('')
  const [render, setRender] = useState(false)
  const [resultSearch, setResultSearch] = useState([])
  useEffect(() => { setRender(!render) }, [])

  const filter = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    const resultadosBusqueda = quotes.filter((quote) => {
      if (
        quote.numeroDeCotizacion.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase()) ||
        quote.nombre.toString().toLowerCase().includes(terminoBusqueda.toString().toLowerCase())
      ) {
        return quote
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
      <Navbar />
      <div className='container container-center'>
          <h2>Lista de Cotizaciones</h2>
              <div className="container">
            <div className="input-group md-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="search" placeholder="buscar" onChange={handleChange} value={search}/>
                <label htmlFor="search">Busca aqui la cotizacion</label>
              </div>
              <span className="input-group-text"><FiSearch /></span>
            </div>
          </div>
        <div className='container-content'>
          <table className="table table-light table-striped-columns m-3">
            <thead>
              <tr>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    N°
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Fecha de Cotizacion
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Cliente
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Telefono
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Abono
                  </div>
                </th>
                <th scope="col">
                  <div className='content-center table-content-center'>
                    Total
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
                quotes === undefined
                  ? null
                  : search === ''
                    ? <ViewCot array={quotes} />
                    : <ViewCot array={resultSearch}/>
              }
            </tbody>
          </table>
        </div>

        <Link href={'/cot/crear'}>
          <div className='d-grid gap-2 w100'>
            <a className='btn btn-primary m-2'>Crear una nueva cotizacion</a>
          </div>
        </Link>

      </div>
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

export async function getServerSideProps () {
  const quotesPrev = await getCollection(docQuote)
  const quotes = quotesPrev.sort((a, b) => {
    if (a.numeroDeCotizacion < b.numeroDeCotizacion) {
      return 1
    }
    if (a.numeroDeCotizacion > b.numeroDeCotizacion) {
      return -1
    }
    return 0
  })

  return {
    props: {
      quotes
    }
  }
}

export default FacVer
