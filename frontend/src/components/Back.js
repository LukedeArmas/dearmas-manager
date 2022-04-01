import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Back = ({ url }) => {
  return (
    <Link to={url}
    className="menu-btn inline-flex justify-center items-center btn status-open text-white uppercase text-sm px-3 py-1.5 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-1"
    type="button"
    >
      <FaArrowLeft className='inline mr-2 text-white' /> <span className='whitespace-nowrap'>Back to Tickets</span>
    </Link>
  )
}
export default Back