import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'

const Return = ({ href }) => {
  return (
    <>
      <Link href={href}>
        <a className='btn btn-dark m-2 esquina'><AiOutlineArrowLeft /></a>
      </Link>
      <style jsx>{`
          .esquina
          {
            position: fixed;
            top: 1%;
            left: 1%;
          }
        `}</style>
    </>
  )
}

export default Return
