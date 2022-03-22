import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {toast} from 'react-toastify'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    console.log(formData)
    
  }

  return (
    <>
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Please sign in</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password" value={password} onChange={onChange} placeholder="Enter password" required />
            </div>
            <div className="form-group">
              <button type='submit' className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
    </>
  )
}
export default Login