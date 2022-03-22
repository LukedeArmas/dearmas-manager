import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import {toast} from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {name, email, password, confirmPassword} = formData

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
    }
    console.log(formData)
    
  }

  return (
    <>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id="name" value={name} onChange={onChange} placeholder="Enter name" required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" value={email} onChange={onChange} placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password" value={password} onChange={onChange} placeholder="Enter password" required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm password" required />
            </div>
            <div className="form-group">
              <button type='submit' className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
    </>
  )
}
export default Register