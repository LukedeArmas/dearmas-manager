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
          <div className="lg:w-0 lg:flex-1 uppercase text-sm sm:px-6 py-3  mr-1">
            <Link to='/' className='flex flex-col sm:flex-row justify-start items-center menu-link text-gray-500'>
              <FaTicketAlt size={50} className='inline text-indigo-800 mr-1.5' /> <span className='whitespace-nowrap font-bold sm:text-lg'>Manager Home</span>
            </Link>
          </div>
            {!user ? (
                <div className="login-container sm:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link to='/login' className="menu-link btn whitespace-nowrap text-base text-gray-500 font-bold sm:mr-4">
                        Log in
                    </Link>
                    <Link
                    to='/register'
                    className="flex justify-center items-center btn status-open text-white uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-1"
                    >
                        <span className='font-bold'>Register</span>
                    </Link>
          </div>
            ) : (
                <div className="sm:flex items-center justify-end md:flex-1 lg:w-0">
                  <Link to='/new-task'
                  className="menu-btn flex justify-center items-center btn status-open text-white uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-1"
                  type="button"
                  >
                      <FaPlus className='inline mr-2 text-white' /> <span className='whitespace-nowrap font-semibold'>Create Ticket</span>
                  </Link>
                    <button
                    onClick={signOut}
                    className="menu-link whitespace-nowrap text-base sm:ml-4 text-gray-500 mt-2 sm:mt-0 font-bold"
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