import Return from '../../components/Return'
import { useEffect, useState } from 'react'
import { getCollection, docProducts } from '../../utils/firebase'

const index = () => {
  const [bills, setBills] = useState({})

  useEffect(() => {
    readData()
  }, [])

  const readData = async () => {
    const dataProducts = await getCollection(docProducts)
    setBills(dataProducts)
  }

  return (
    <div className='container'>
      <h1>Facturacion</h1>
      <Return href="/" />
    </div>
  )
}

export default index
