import Image from 'next/image'
import Link from 'next/link'

const Navbar = ({ active }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          <a className="navbar-brand">
            <Image src='/icono.png' width="50" height="24" className="d-inline-block align-text-top"/>
            Nanny Store
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className={active === '/' ? 'nav-link active' : 'nav-link'}>Hogar</a>
              </Link>
            </li>
            <li className="nav-item">
              <a className={active === 'inv' ? 'nav-link active' : 'nav-link'} href="/inv" target="_blank">Invetario</a>
            </li>
            <li className="nav-item">
              <a className={active === 'fac' ? 'nav-link active' : 'nav-link'} href="/fac" target="_blank">Facturacion</a>
            </li>
            <li className="nav-item">
              <a className={active === 'cot' ? 'nav-link active' : 'nav-link'} href="/cot" target="_blank">Cotizacion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
