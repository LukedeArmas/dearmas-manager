import Back from '../components/Back.js'
import CommentItem from '../components/CommentItem.js'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getTask, closeTask } from '../features/tasks/taskSlice.js'
import { getComments, reset as commentsReset } from '../features/comments/commentSlice.js'
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

    const { comments, isLoading: commentsIsLoading } = useSelector(state => state.comments)


    const dispatch = useDispatch()
    const { taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTask(taskId))
        dispatch(getComments(taskId))
    // eslint-disable-next-line
    }, [taskId, isError, message])

    const onTicketClose = () => {
        dispatch(closeTask(taskId))
        toast.success('Task successfully closed')
        navigate('/tasks')
    }


    if (isLoading || commentsIsLoading) {
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
                    <h2>Comments</h2>
                </header>

                {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                ))}

                {task.status !== 'closed' && (
                    <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
                )}
            </div>
        </>
    )
}
export default Task