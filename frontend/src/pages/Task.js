import CommentItem from '../components/CommentItem.js'
import CommentModal from '../components/CommentModal.js'
import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, closeTask } from '../features/tasks/taskSlice.js'
import { createComment, getComments} from '../features/comments/commentSlice.js'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegCommentAlt, FaRegTrashAlt } from 'react-icons/fa'
import Back from '../components/Back.js'


const override = css`
display: block;
margin: 0 auto;
margin-top: 5rem;
`

const Task = () => {
    const [commentText, setCommentText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const { task, isLoading, isError, message } =
        useSelector((state) => state.tasks)

    const { comments, isLoading: commentsIsLoading } =
        useSelector((state) => state.comments)

    const dispatch = useDispatch()
    const { taskId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { prevUrl } = location.state

    useEffect(() => {
        if (isError) {
        toast.error(message)
        }

        dispatch(getTask(taskId))
        dispatch(getComments(taskId))
        // eslint-disable-next-line
    }, [taskId, isError, message])

    const onTicketClose = () => {
        if (window.confirm("Are you sure you want to close this ticket?")) {
            dispatch(closeTask(taskId))
            toast.success('Ticket successfully closed')
            navigate('/tasks')
        }
    }

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const updateCommentText = (e) => setCommentText(e.target.value)

    const onCommentSubmit = (e) => {
        e.preventDefault()
        dispatch(createComment({commentText, taskId}))
        setCommentText('')
        setShowModal(false)
        
    }

    if (isLoading || commentsIsLoading) {
        return <ClipLoader color='#3730a3' css={override} size={250} />
    }

    if (isError) {
        return <h3>Something went wrong</h3>
    }

    return (
        <>
        <div className='ticket-page max-w-[900px] mx-auto mt-3'>
            <Back url={prevUrl} />
            <header className='ticket-head mt-3'>
            <h2>
                <span>Ticket ID Number: <span className='font-normal'>{task._id}</span></span>
                <div className="flex justify-center items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 mt-0.5 rounded-full bg-black status-${task.status}`}></div> <span>{ task.status && task.status.charAt(0).toUpperCase() + task.status.substring(1,task.status.length)}</span>
                </div>
            </h2>
            <h3>
                Date/Time Recorded:{' '}
                <span className='font-normal whitespace-nowrap'>{new Date(task.createdAt).toLocaleString('en-US')}</span>
            </h3>
            {task.status !== 'closed' ? (
                <div className="flex justify-between mb-4 gap-4">
                <h3>Product Type: <span className='font-normal'>{task.product}</span></h3>
                <button onClick={onTicketClose} className='btn whitespace-nowrap flex justify-center items-center font-semibold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white status-closed h-[44px] self-center'>
                    <FaRegTrashAlt size={19} /> Close Ticket
                </button>
            </div>
            ) : (
                <h3>Product Type: <span className='font-normal'>{task.product}</span></h3>
            )}
            
            <hr />
            <div className='ticket-desc shadow-md rounded-lg'>
                <h3>Issue Description</h3>
                <p>{task.description}</p>
            </div>
            </header>

            <div className="flex justify-between items-center mb-5 mt-8">
                <h2 className='text-xl'>Comments</h2>
                {task.status !== 'closed' && (
                <>
                    <button
                    className="flex justify-center btn status-open text-white font-semibold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal}
                    >
                        <FaRegCommentAlt className='mt-0.5' size={19} /> Add Comment
                    </button>
                    <CommentModal showModal={showModal} closeModal={closeModal} onCommentSubmit={onCommentSubmit} commentText={commentText} updateCommentText={updateCommentText} />
                    </>
                )}
            </div>

            {comments.map((comment) => (
            <CommentItem
                key={comment._id}
                comment={comment}
            />
            ))}
            <br />
            <br />
        </div>
        </>
    )
}
export default Task
