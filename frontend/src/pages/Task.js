import Back from '../components/Back.js'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getTask, closeTask } from '../features/tasks/taskSlice.js'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
`;

const Task = () => {
    const { task, isSuccess, isLoading, isError, message} = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const { taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTask(taskId))
    // eslint-disable-next-line
    }, [taskId, isError, message])

    const onTicketClose = () => {
        dispatch(closeTask(taskId))
        toast.success('Task successfully closed')
        navigate('/tasks')
    }


    if (isLoading) {
        return <ClipLoader css={override} size={150} />
    }

    if (isError) {
        <h3>Something went wrong</h3>
    }

    return (
        <>
            <div className="ticket-page">
                <header className="ticket-head">
                    <Back url={'/tasks'} />
                    <h2>
                        Task ID: {task._id}
                        <span className={`status status-${task.status}`}>
                            {task.status}
                        </span>
                    </h2>
                    <h3>Date Submitted: {new Date(task.createdAt).toLocaleString('en-US')}</h3>
                    <h3>Product: {task.product}</h3>
                    <hr />
                    <div className="ticket-desc">
                        <h3>Description of Issue</h3>
                        <p>{task.description}</p>
                    </div>
                </header>
                {task.status !== 'closed' && (
                    <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
                )}
            </div>
        </>
    )
}
export default Task