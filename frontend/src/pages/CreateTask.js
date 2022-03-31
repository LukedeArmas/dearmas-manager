import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, createTask } from '../features/tasks/taskSlice.js'
import { toast } from 'react-toastify'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
`;

const CreateTask = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('Phone')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()
    const { isCreateTicketSuccess, isError, isLoading, message } = useSelector(state => state.tasks)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isCreateTicketSuccess) {
            dispatch(reset())
            navigate('/tasks')
        } else {
            dispatch(reset())
        }
    }, [dispatch, navigate, isError, isCreateTicketSuccess, message])


    const onSubmit = (e) => {
        e.preventDefault()
        const task = {
            product,
            description
        }
        dispatch(createTask(task))
    }

    if (isLoading) {
        return <ClipLoader color='#3730a3' css={override} size={150} />
    }

  return (
    <>
        <section className="heading mt-8">
            <h1>Please describe your issue</h1>
        </section>
        <section className="form">
            <div className="form-group">
                <label htmlFor="name">Customer Name</label>
                <input type="text" className="form-control shadow-group" value={name} disabled />
            </div>
            <div className="form-group">
                <label htmlFor="email">Customer Email</label>
                <input type="text" className="form-control shadow-group" value={email} disabled />
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select name="product" id="product" className='shadow-group' value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Ipad">Ipad</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Ticket Description</label>
                    <textarea name="description" id="description" className='form-control shadow-group' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <button className="btn-submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}
export default CreateTask