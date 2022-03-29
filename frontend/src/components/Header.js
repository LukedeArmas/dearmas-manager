import { FaPlus, FaTicketAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice.js'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    const signOut = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }


  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex flex-row justify-start lg:w-0 lg:flex-1">
            <Link to='/' className='menu-link inline text-gray-500 hover:text-gray-900 mt-2'>
              <FaTicketAlt size={50} className='inline text-indigo-800 mb-[3px]' /> <span className='whitespace-nowrap font-bold'>Manager Home</span>
            </Link>
          </div>
            {!user ? (
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link to='/login' className="btn whitespace-nowrap text-base text-gray-500 hover:text-gray-900 font-bold">
                        Log in
                    </Link>
                    <Link
                    to='/register'
                    className="btn btn-register whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-800 hover:bg-indigo-900"
                    >
                        <span className='font-medium'>Register</span>
                    </Link>
          </div>
            ) : (
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link
                    to='/new-task'
                    className="btn ml-5 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-white bg-indigo-800 hover:bg-indigo-900"
                    >
                        <FaPlus className='inline mr-2 text-white' /> <span className='whitespace-nowrap font-medium'>Create Ticket</span>
                    </Link>
                    <button
                    onClick={signOut}
                    className="menu-link whitespace-nowrap text-base ml-6 text-gray-500 hover:text-gray-900 mt-2 sm:mt-0 font-bold"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  )
}

export default Header