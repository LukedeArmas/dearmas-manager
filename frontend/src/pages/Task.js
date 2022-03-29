import CommentItem from '../components/CommentItem.js'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, closeTask } from '../features/tasks/taskSlice.js'
import { createComment, getComments} from '../features/comments/commentSlice.js'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
content: {
    width: '60vw',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
},
}

Modal.setAppElement('#root')

const override = css`
display: block;
margin: 0 auto;
margin-top: 5rem;
`

const Task = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [commentText, setCommentText] = useState('')
    const { task, isLoading, isError, message } =
        useSelector((state) => state.tasks)

    const { comments, isLoading: commentsIsLoading } =
        useSelector((state) => state.comments)

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

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const onCommentSubmit = (e) => {
        e.preventDefault()
        dispatch(createComment({commentText, taskId}))
        setCommentText('')
        closeModal()
        
    }

    if (isLoading || commentsIsLoading) {
        return <ClipLoader color='#3730a3' css={override} size={250} />
    }

    if (isError) {
        ;<h3>Something went wrong</h3>
    }

    return (
        <>
        <div className='ticket-page max-w-[900px] mx-auto mt-10'>
            <header className='ticket-head'>
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
            <h3>Product Type: <span className='font-normal'>{task.product}</span></h3>
            <hr />
            <div className='ticket-desc shadow-md rounded-lg'>
                <h3>Issue Description</h3>
                <p>{task.description}</p>
            </div>
            </header>

            <div className="flex justify-between items-center mb-5 mt-8">
                <h2 className='text-xl'>Comments</h2>
                {task.status !== 'closed' && (
                <button onClick={openModal} className='btn whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-white bg-indigo-800 hover:bg-indigo-900 align-middle'>
                    <FaPlus /> Add Comment
                </button>
                )}
            </div>
            
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Add Comment'>
            <h2>Add Comment</h2>
            <button
                className='btn-close'
                onClick={closeModal}>
                x
            </button>
            <form onSubmit={onCommentSubmit}>
                <div className='form-group'>
                <textarea
                    name='commentText'
                    id='commentText'
                    className='form-control'
                    placeholder='Comment text'
                    value={commentText}
                    onChange={(e) =>
                    setCommentText(e.target.value)
                    }></textarea>
                </div>
                <div className='form-group'>
                <button className='btn-submit' type='submit'>
                    Submit
                </button>
                </div>
            </form>
            </Modal>

            {comments.map((comment) => (
            <CommentItem
                key={comment._id}
                comment={comment}
            />
            ))}

            {task.status !== 'closed' && (
            <button
                className='btn-submit btn-red'
                onClick={onTicketClose}>
                Close Ticket
            </button>
            )}
        </div>
        </>
    )
}
export default Task
