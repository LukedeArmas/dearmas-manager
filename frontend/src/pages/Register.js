import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaEyeSlash } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch  } from 'react-redux'
import { register, reset } from '../features/auth/authSlice.js'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const {name, email, password, confirmPassword} = formData

  // Allows us to dispatch actions to reducer
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Allows us to get state from redux
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
  }, [isError, isSuccess, user, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords must match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <ClipLoader color='#3730a3' css={override} size={250} />
  }

  return (
    <>
        <section className="heading mt-6">
          <h1>Register</h1>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control shadow-group" id="name" value={name} onChange={onChange} placeholder="Enter name" autoFocus required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control shadow-group" id="email" value={email} onChange={onChange} placeholder="Enter email" required />
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
            <div className="form-group relative">
              <input type={ !showConfirmPassword ? 'password' : 'text' } className="form-control shadow-group" id="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm password" required />
              <span className='icon' onClick={() => setShowConfirmPassword((prevState) => !prevState)}>
                { !showConfirmPassword ? (
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
export default Register