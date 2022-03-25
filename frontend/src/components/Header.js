import { FaSignInAlt, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa'
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
    <header className="header">
        <div className="logo">
            <ul>
                <li>
                    <Link to='/'>
                        <FaHome /> Home
                    </Link>
                </li>
            </ul>
        </div>
        <ul>
            {!user ? (
                <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </>
            ) : (
                <li>
                    <button className='btn' onClick={signOut}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            )}
            
        </ul>
    </header>
  )
}

export default Header