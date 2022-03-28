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
            <Link to='/' className='inline text-gray-500 hover:text-gray-900'>
              <FaTicketAlt className='inline text-indigo-800' /> <span className='whitespace-nowrap'>Manager Home</span>
            </Link>
          </div>
            {!user ? (
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link to='/login' className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                        Log in
                    </Link>
                    <Link
                    to='/register'
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-800 hover:bg-indigo-900"
                    >
                        Register
                    </Link>
          </div>
            ) : (
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link
                    to='/new-task'
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-800 hover:bg-indigo-900"
                    >
                        <FaPlus className='inline mr-2 text-white' /> <span className='whitespace-nowrap'>Create Ticket</span>
                    </Link>
                    <button
                    onClick={signOut}
                    className="whitespace-nowrap text-base ml-6 font-medium text-gray-500 hover:text-gray-900"
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