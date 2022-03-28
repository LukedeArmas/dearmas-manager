import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch  } from 'react-redux'
import { login, reset } from '../features/auth/authSlice.js'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
`;


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    } else {
      dispatch(reset())
    }
  }, [dispatch, isError, isSuccess, message, navigate, user ])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <ClipLoader css={override} size={150} />
  }

  return (
    <>
        <section className="heading mt-10">
          <h1>
            Login
          </h1>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control shadow-group" id="email" name='email' value={email} onChange={onChange} placeholder="Enter email" required />
            </div>
            <div className="form-group relative">
              <input type={ !showPassword ? 'password' : 'text' } className="form-control shadow-group" id="password" value={password} onChange={onChange} placeholder="Enter password" required />
              <span className='icon' onClick={() => setShowPassword((prevState) => !prevState)}>
                { !showPassword ? (
                  <FaRegEye size={22} />
                ) : (
                  <FaEyeSlash size={22} />
                ) }  
              </span>
            </div>
            <div className="form-group">
              <button type='submit' className="btn-submit">Submit</button>
            </div>
          </form>
        </section>
    </>
  )
}
export default Login