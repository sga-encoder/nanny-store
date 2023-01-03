import { useState, useEffect } from 'react'

const ProductSearch = ({ product, functionTotal, total, index, listProducts, functionListProduct }) => {
  const [count, setCount] = useState(0)
  // const [total2, setTotal2] = useState(product[0].precio * count)

  useEffect(() => {
    setCount(parseInt(product[1]))
    functionTotal(total)
    console.log(index)
  }, [])

  const removeItem = (index) => {
    functionListProduct(prevItems => {
      const newItems = [...prevItems]
      newItems.splice(index, 1)
      return newItems
    })
  }
  return (
    <tr>
      <th>{product[0].ref}</th>
      {
        product[0].categoria === 'ropa'
          ? <td>{product[0].nombre} {`(${product[2]})`}</td>
          : <td>{product[0].nombre}</td>
      }
      <td>
        <span className='p-2'>{count}</span>
        <button
          className='btn btn-info p-1 ml-1'
          onClick={() => {
            setCount(count + 1)
            product[1] = count + 1
            functionTotal(parseInt(total) + parseInt(product[0].precio))
          }}
        >+</button>
        <button
          className='btn btn-warning p-1 mr-1'
          onClick={() => {
            setCount(count - 1)
            product[1] = count - 1
            functionTotal(parseInt(total) - parseInt(product[0].precio))
          }}
        >--</button>
      </td>
      <td>{product[0].precio}</td>
      <td>{product[0].precio * count}</td>
      <td><button className="btn btn-danger" onClick={() => removeItem(index)}>X</button> </td>

    </tr>
  )
}

export default ProductSearch
