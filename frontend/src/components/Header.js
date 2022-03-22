import { FaSignInAlt, FaHome, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
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
        </ul>
    </header>
  )
}

export default Header