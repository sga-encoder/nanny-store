import Return from '../../../components/Return'
import Navbar from './../../../components/Navbar'
import FormBills from './../../../components/Forms/FormBills'

const index = () => {
  return (
    <>
      <Navbar />
      <FormBills type={'cot'}/>
      <Return href={'/cot'} />
    </>
  )
}

export default index
